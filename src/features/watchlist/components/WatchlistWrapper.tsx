import { Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import WatchlistTable from "./WatchlistTable";
import TokenSearchDialog from "./TokenSearchDialog";

export default function WatchlistWrapper() {

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-accent fill-accent" />
          <h2 className="text-2xl font-bold text-text-primary">Watchlist</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="text-text-primary px-2 bg-[#2d2d30] hover:bg-[#424247]"
          >
            <RefreshCw className="w-4 h-4" />
            <p className="hidden lg:block">Refresh Prices</p>
          </Button>
          <TokenSearchDialog />
        </div>
      </div>

      <WatchlistTable />
    </div>
  );
}
