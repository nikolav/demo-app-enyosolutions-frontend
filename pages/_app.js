import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "../app/store/redux";
import { QueryProvider } from "../app/providers";
import ArticlesProvider from "../app/store/resource";
//
import "../styles/reset.css";
import "../styles/build.css";
import "../styles/globals.css";
//
const pageVariantsMotion = {
  in: {
    opacity: 1,
    // position: "absolute",
    transition: {
      duration: 0.24,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

////
////
function MyApp({
  Component,
  pageProps: { session, ...restPageProps },
  router: { route },
}) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>app0</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1"
        />
        <meta
          name="description"
          content="Nikola Vuković is a web developer from Mladenovac, Serbia. He has 5+ years of experience with fullstack web development with a focus on user interfaces, ineraction and data modeling. In his spare time, Nikola Vuković does languages, modern technologies, gymnastics, wine&amp;spirits, bookkeeping, accounting, history, arts, positive life habits, astrology&amp;tarot, dating, travel, time management, resource planing, logistics, design, and more. Никола Вуковић је веб програмер из Младеновца у Србији. Има 5+ година искуства са фуллстак веб развојем са фокусом на кориснички интерфејс и моделирање података. У слободно време Никола Вуковић бави се језицима, савременим технологијама, гимнастиком, вином и жестоким пићима, пословном анализом, вођењем књига, креирањем пословних планова, рачуноводством, астрологијом и таротом, историјом, уметношћу, позитивним животним навикама, забављањем, путовањима, управљањем временом, планирањем ресурса, логистиком, дизајном. admin@nikolav.rs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryProvider>
        <ArticlesProvider>
          <SessionProvider
            session={session}
            refetchInterval={0}
            refetchOnWindowFocus={true}
          >
            <ReduxStoreProvider store={store}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={route}
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageVariantsMotion}
                  className="absolute w-full"
                >
                  <Component {...restPageProps} />
                </motion.div>
              </AnimatePresence>
            </ReduxStoreProvider>
          </SessionProvider>
        </ArticlesProvider>
      </QueryProvider>
    </>
  );
}

export default MyApp;
