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
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name='application-name' content='Daemo Discover' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Daemo Discover' />
          <meta name='description' content="The best music you've never heard." />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#00ffd1' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#00ffd1' />

          <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />
          <link rel="canonical" href="https://example.com" />

          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://daemo.io' />
          <meta name='twitter:title' content='Daemo Discover' />
          <meta name='twitter:description' content="The best music you've never heard." />
          <meta name='twitter:image' content='https://daemo.io/icons/android-chrome-192x192.png' />
          {/* <meta name='twitter:creator' content='@DavidWShadow' /> */}
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Daemo Discover' />
          <meta property='og:description' content="The best music you've never heard." />
          <meta property='og:site_name' content='PWA App' />
          <meta property='og:url' content='https://daemo.io' />
          <meta property='og:image' content='https://daemo.io/icons/apple-touch-icon.png' />
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
