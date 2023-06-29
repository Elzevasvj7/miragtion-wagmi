import { configureChains, createConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains(
  [bsc, bscTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "9fef2ca94f9bf86b19bbea475ae3e550",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
