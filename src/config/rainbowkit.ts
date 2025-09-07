import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "A Simple Proposal Dapp",
  projectId: import.meta.env.VITE_APP_ID,
  chains: [sepolia],
});
