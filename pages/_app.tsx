import '@/styles/globals.css'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import { chainSelected } from '@/utils/functions/chain'
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, optimism, bsc, bscTestnet } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/dist/connectors/walletConnect';

const { chains, publicClient } = configureChains(
  [bsc, bscTestnet],
  [
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'wagmi',
  projectId: '9fef2ca94f9bf86b19bbea475ae3e550',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize='compact' initialChain={bscTestnet}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
