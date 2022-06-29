import Document, { Html, Head, Main, NextScript } from "next/document";

class Doc extends Document {
  render() {
    return (
      <Html>
        <Head>{/* // global, meta... */}</Head>
        <body className="text-base bg-slate-50 text-slate-800 scrollbar-thin">
          <div id="overlays--mdozwrwqvef" />
          <Main />
          <div id="overlays-end--mdozwrwqvef" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Doc;
