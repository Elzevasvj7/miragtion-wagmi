import '@/styles/globals.css'
import { chains, wagmiConfig } from '@/utils/functions/provider'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import { chainSelected } from '@/utils/functions/chain'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={chainSelected[1]}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
