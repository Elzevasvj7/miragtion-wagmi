import { configureChains, createConfig } from "wagmi";
import { chainSelected } from "./chain";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

export const { chains, publicClient } = configureChains(chainSelected, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Wagmi Migration",
  projectId: "",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
