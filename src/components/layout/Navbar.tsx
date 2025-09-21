import { useAppDispatch } from "@/store/hooks";
import { WalletIcon } from "../icons/Logo";
import CustomConnectButton from "@/components/ui/CustomConnectButton";
import { useEffect } from "react";
import {
  resetPortfolio,
  setWalletInfo,
} from "@/features/portfolio/store/portfolioSlice";
import { useAccount, useBalance } from "wagmi";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const { address, isConnected, chain } = useAccount();
    const { data: balanceData } = useBalance({
    address: '0x40DF6b834b33D38BFDDfD86e2222B0F7a680c736',
  });

  useEffect(() => {
    if (isConnected && address && chain) {
      console.log(balanceData)
      dispatch(
        setWalletInfo({
          address: address,
          chain: chain.name || chain.id.toString(),
          isConnected: true,
        })
      );
    } else {
      dispatch(resetPortfolio());
    }
  }, [isConnected, address, chain, balanceData, dispatch]);

  return (
    <nav className="p-3 flex justify-between items-center">
      <div className="bg-accent p-2 rounded-secondary">
        <WalletIcon></WalletIcon>
      </div>
      <div>
        <CustomConnectButton />
      </div>
    </nav>
  );
}
