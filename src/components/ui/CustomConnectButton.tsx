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
                      minWidth: "140px",
                    }}
                  >
                    <Wallet size={16} />
                    <span>Connect Wallet</span>
                  </button>
                );
              }

              return (
                <div className="h-full flex gap-2">
                  {chain.unsupported ? (
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="h-full px-4"
                      style={{
                        backgroundColor: "#EF4444",
                        color: "#FFFFFF",
                        fontSize: "11px",
                        borderRadius: "20px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "500",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "7px",
                        paddingBottom: "7px",
                        minWidth: "140px",
                      }}
                    >
                      Wrong Network
                    </button>
                  ) : (
                    <button
                      onClick={openAccountModal}
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
                        minWidth: "140px",
                      }}
                    >
                      <Wallet size={16} />
                      <span>{account.displayName}</span>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}