import * as React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import styled from 'styled-components'

const SiteContainer = styled.div`
  overflow-x: hidden;
  position: relative;
`

const cssString = '@import url("https://fonts.googleapis.com/css?family=Quicksand:400,500,700|Work+Sans:ital,wght@0,300,400,500&display=swap");'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await NextDocument.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* Stitches CSS for SSR */}
            <style
              id="stitches"
              dangerouslySetInnerHTML={{ __html: cssString }}
            />
          </>
        ),
      }
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>
        <body>
          <SiteContainer>
            <Main />
            <NextScript />
          </SiteContainer>
        </body>
      </Html>
    )
  }
}
