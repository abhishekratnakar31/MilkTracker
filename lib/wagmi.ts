import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { flareTestnetCoston2, sepolia } from './config'
import { createStorage } from 'wagmi'

const noopStorage = {
  getItem: (_key: string) => null,
  setItem: (_key: string, _value: string) => { },
  removeItem: (_key: string) => { },
}

export const config = getDefaultConfig({
  appName: "miltracker",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [flareTestnetCoston2, sepolia],
  ssr: true,
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : noopStorage,
  }),
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}