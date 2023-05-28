import axios from "axios";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../database/dbConnect";
var randomstring = require("randomstring");
var jwt = require("jsonwebtoken");
async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(`${process.env.NEXTAUTH_URL}/api/refresh-token`, {
      refreshToken: tokenObject.refreshToken,
    });
    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      refreshToken: tokenResponse.data.refreshToken,
      expireAccessToken: tokenResponse.data.expireAccessToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",

      async authorize(credentials, req) {
        await dbConnect();
        const { taiKhoan, matKhau } = credentials;
        const user = await NguoiDung.findOne({
          taiKhoan,
        });
        if (!user) {
          throw new Error("Không tìm thấy người dùng");
        }
        const authPassword = await bcrypt.compare(matKhau, user.matKhau);
        if (!authPassword) {
          throw new Error("Mật khẩu không chính xác");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      try {
        if (user) {
          // Create an access token and a refresh token
          const generateAccessToken = jwt.sign(
            { taiKhoan: user.taiKhoan, role: user.role, id: user._id },
            process.env.NEXTAUTH_SECRET,
            {
              expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRED,
            }
          );
          const generateRefreshToken = jwt.sign(
            { taiKhoan: user.taiKhoan, role: user.role, id: user._id },
            process.env.NEXTAUTH_SECRET,
            {
              expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRED,
            }
          );
          const expireAccessToken = Math.round(Date.now() + parseInt(process.env.JWT_ACCESSTOKEN_EXPIRED));

          // Update the refreshToken to the database
          await dbConnect();
          const updateRefreshTokenUser = await NguoiDung.findOneAndUpdate(
            {
              taiKhoan: user.taiKhoan,
            },
            {
              refreshToken: generateRefreshToken,
            }
          );
          token.taiKhoan = user.taiKhoan;
          token.role = user.role;
          token.id = user._id;
          token.accessToken = generateAccessToken;
          token.expireAccessToken = expireAccessToken;
          token.refreshToken = generateRefreshToken;
        }

        const shouldRefreshTime = Math.floor((token.expireAccessToken - Date.now()) / 1000);
        console.log("remain time", shouldRefreshTime);
        // If the token is still valid, just return it.
        if (shouldRefreshTime > 60) {
          return Promise.resolve(token);
        }
        token = refreshAccessToken(token);
        return Promise.resolve(token);
      } catch (err) {
        console.log(err);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, user, token }) {
      session.user.taiKhoan = token.taiKhoan;
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.expireAccessToken = token.expireAccessToken;
      session.error = token.error;
      console.log(session);

      return session;
    },
  },
});
