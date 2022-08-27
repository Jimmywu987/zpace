import "@/../styles/global.css";
import type { AppProps } from "next/app";
import Layout from "@/features/common/layout";
import { Provider } from "react-redux";
import { AppContextType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/configureStore";

const MyApp = ({ Component, session, pageProps, data }: AppProps & any) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout initData={data}>
          <Component {...pageProps} initData={data} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContextType) => {
  const data: [] = [];
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, data };
};

export default MyApp;
