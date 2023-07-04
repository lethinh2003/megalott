import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import "nprogress/nprogress.css";
import { useState } from "react";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshTokenHandler from "../components/RefreshTokenHandler";
import ThemeLayout from "../components/ThemeLayout";
import SocketProvider from "../context";
import { store } from "../redux/reducers/store";
import "../styles/globals.css";
import "../styles/layout.scss";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [interval, setInterval] = useState(0);

  return (
    <>
      <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={interval}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" type="image/x-icon" href="https://i.imgur.com/tUCRwwB.png" />
          </Head>
          <Provider store={store}>
            <SocketProvider>
              <ThemeLayout>
                <DefaultSeo
                  title="XỔ SỐ MEGALOTT"
                  description="MEGALOTT - Hệ thống chơi xổ số trực tuyến"
                  additionalMetaTags={[
                    {
                      property: "keywords",
                      content: "megalott, MEGALOTT, xo so, xoso, keno, keno 1p, keno 3p, keno 5p, keno online",
                    },
                    {
                      property: "author",
                      content: "",
                    },
                  ]}
                  openGraph={{
                    type: "website",
                    locale: "vi_VN",
                    url: process.env.NEXTAUTH_URL,
                    siteName: "MEGALOTT",
                    images: [
                      {
                        url: "https://i.imgur.com/WxnxHqx.png",
                        width: 700,
                        height: 700,
                        alt: "MEGALOTT",
                      },
                    ],
                  }}
                  facebook={{
                    appId: process.env.FACEBOOK_APPID,
                  }}
                  twitter={{
                    handle: "",
                    site: process.env.NEXTAUTH_URL,
                    cardType: "summary_large_image",
                  }}
                />
                <Component {...pageProps} />

                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover={false}
                />
                <Analytics />
              </ThemeLayout>
            </SocketProvider>
          </Provider>
        </QueryClientProvider>
        <RefreshTokenHandler setInterval={setInterval} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
