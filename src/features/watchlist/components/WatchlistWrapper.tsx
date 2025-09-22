import { Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import WatchlistTable from "./WatchlistTable";
import TokenSearchDialog from "./TokenSearchDialog";
import { useSelector } from "react-redux";
import { selectWatchlistTokens } from "../store/watchlistSelector";
import { useAppDispatch } from "@/store/hooks";
import {
  clearTokens,
  setError,
  setLoading,
  setTokens,
} from "../store/watchlistSlice";
import { getMarketData } from "../api/tokenApi";

export default function WatchlistWrapper() {
  const tokens = useSelector(selectWatchlistTokens);
  const dispatch = useAppDispatch();

  const refreshPrices = async () => {
    const coinIds = tokens.map((token) => token.id).join(",");
    dispatch(clearTokens());
    dispatch(setLoading(true));
    try {
      const result = await getMarketData(coinIds);

      const updatedTokens = result.map((newToken) => {
        const existingToken = tokens.find((t) => t.id === newToken.id);
        return {
          ...newToken,
          holdings: existingToken?.holdings || 0,
          value: parseFloat(((existingToken?.holdings || 0) * newToken.current_price).toFixed(2))
        };
      });

      dispatch(setTokens({ tokens: updatedTokens }));
    } catch (error) {
      console.error(error);
      dispatch(setError("Unable to fetch token details. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

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
            onClick={() => refreshPrices()}
            disabled={tokens.length === 0}
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
