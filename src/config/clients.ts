import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-public.nodies.app"),
});

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(),
});
