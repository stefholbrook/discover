import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import GlobalStyles from '../styles/global-styles.js'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
