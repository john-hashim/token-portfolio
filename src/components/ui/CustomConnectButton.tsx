// Reference: https://rainbowkit.com/docs/custom-connect-button

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="h-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="h-full px-4 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#A9E851",
                      color: "#18181B",
                      fontSize: "11px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "500",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                    }}
                  >
                    <Wallet size={16} />
                    <span>Connect Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="h-full px-4"
                    style={{
                      backgroundColor: "#A9E851",
                      color: "#18181B",
                      fontSize: "11px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "500",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                    }}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="h-full flex gap-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="h-full px-3 flex items-center gap-2"
                    style={{
                      backgroundColor: "#A9E851",
                      color: "#18181B",
                      fontSize: "11px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "500",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                    }}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="h-full px-4"
                    style={{
                      backgroundColor: "#A9E851",
                      color: "#18181B",
                      fontSize: "11px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "500",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "7px",
                      paddingBottom: "7px",
                    }}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
