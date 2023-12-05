import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from 'react-query'
import { chains, wagmiClient } from 'src/lib/wagmi'
import { WagmiConfig } from 'wagmi'

import { ChakraProvider } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css'
import '~/styles/index.css'

const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
)

const queryClient = new QueryClient()

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider>
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default App
