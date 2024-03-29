import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (token) {
        return true;
      } 
    },

  },
  pages: {
    signIn: '/dangnhap',
    error: '/api/auth/error',
  }
})