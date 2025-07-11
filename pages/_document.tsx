import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* AOS Animation CSS */}
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        {/* AOS Animation JS */}
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
        <script dangerouslySetInnerHTML={{__html: `AOS.init({ once: true });`}} />
      </body>
    </Html>
  );
}
