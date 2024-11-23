import { createWeb3Modal } from "@web3modal/wagmi/react";
import { http, createConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";

export const contractMainAddr = "0x3d5df6e5102eaf028124b84fedd05338b839eddb";
export const contractUsdAddr = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";

// walletconnect
const projectId = "b8479a23d56f952664cd377ed894ed16"; // main
const metadata = {
  name: "Rifex",
  description: "Rifex",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// wagmi
export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(
      "https://polygon-mainnet.g.alchemy.com/v2/gOdtC9qkQfB5fq8LsaEiXDJyCWnEXXzd"
    ),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
  themeVariables: {
    "--w3m-accent": "#1976d2",
  },
});
