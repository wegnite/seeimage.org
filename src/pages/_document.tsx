import Document, { Html, Head, Main, NextScript } from 'next/document';

/**
 * Minimal stub for the Pages Router Document.
 *
 * Some build environments for Next.js attempt to resolve `/_document` even
 * when the App Router is used exclusively. Providing this no-op Document
 * prevents build-time "Cannot find module for page: /_document" errors
 * without affecting the App Router, which continues to use `src/app`.
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

