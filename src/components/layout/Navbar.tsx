import { WalletIcon } from "../icons/Logo";
import CustomConnectButton from "@/components/ui/CustomConnectButton";

export default function Navbar() {
  return (
    <nav className="p-3 flex justify-between items-center">
      <div className="bg-accent p-2 rounded">
        <WalletIcon></WalletIcon>
      </div>
      <div>
        <CustomConnectButton />
      </div>
    </nav>
  );
}
