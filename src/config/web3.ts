// src/config/web3.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Token Portfolio App',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, polygon, arbitrum, sepolia],
  ssr: false,
})