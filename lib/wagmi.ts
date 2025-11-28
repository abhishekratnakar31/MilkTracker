import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { flareTestnetCoston2, sepolia } from './config'
import { cookieStorage, createStorage } from 'wagmi'

export const config = getDefaultConfig({
  appName: "miltracker",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_WALLETCONNECT_PROJECT_ID", // You'll need to get this from WalletConnect
  chains: [flareTestnetCoston2, sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}