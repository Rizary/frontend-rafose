import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createClient, mainnet } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

const rpcNetwork =
  process.env.NEXT_PUBLIC_CHAIN === 'sepolia' ? 'eth_sepolia' : 'eth'
const urlRpc = `https://rpc.ankr.com/${rpcNetwork}/4ba24b09df4ca43b1fa9407c8ba68db14edc79f4d4bf73c98d30393a8cdb05f7`

const { chains, provider } = configureChains(
  process.env.NEXT_PUBLIC_CHAIN === 'sepolia' ? [sepolia] : [mainnet],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: urlRpc,
      }),
    }),
  ]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      rainbowWallet({ chains }),
      coinbaseWallet({ chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: 'More',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      omniWallet({ chains }),
      imTokenWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { chains, provider, connectors, wagmiClient }
