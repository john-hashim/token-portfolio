import { WalletIcon } from "../icons/Logo";

export default function Navbar() {
  return (
    <nav className="p-3 flex justify-between">
        <div className="bg-accent p-2 rounded">
            <WalletIcon></WalletIcon>
        </div>
        <div>loge</div>
    </nav>
  );
}
