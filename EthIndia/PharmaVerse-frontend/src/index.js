import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  sepolia,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AuthContextProvider from './Context/AuthContext';
import ContractContextProvider from './Context/ContractContext';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli, sepolia],
  [
    alchemyProvider({ apiKey: "cDHRWnoZ0vyO7_L_60Czyl2Lse94RsMP" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "PharmaVerse",
  projectId: "a4e4df9af82623bb241eebe5f9391fd7",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ContractContextProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
      </ContractContextProvider >
    </AuthContextProvider>
  </BrowserRouter>
);
