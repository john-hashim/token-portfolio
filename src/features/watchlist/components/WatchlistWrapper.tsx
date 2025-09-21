import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Star, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TokenSearchInterface } from "../types";
import WatchlistCard from "./WatchlistCard";
import { searchTokens } from "../api/tokenApi";
import TokenSearchDialog from "./TokenSearchDialog";

export default function WatchlistWrapper() {
  const [tokens, setTokens] = useState<TokenSearchInterface[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebouncedCallback(async (query: string) => {
    if (!query.trim()) {
      setTokens([]);
      return;
    }
    setIsSearching(true);
    try {
      const result = await searchTokens(query);
      console.log(result);
      setTokens(result);
    } catch (error) {
      console.error("Search failed:", error);
      setTokens([]);
    } finally {
      setIsSearching(false);
    }
  }, 500);

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

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tokens..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {isSearching && (
        <p className="text-sm text-muted-foreground mb-4">Searching...</p>
      )}

      {tokens.length > 0 && (
        <div className="mb-6 space-y-2">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="p-3 border rounded-lg hover:bg-accent/10 transition-colors"
            >
              {token.name}
            </div>
          ))}
        </div>
      )}

      <WatchlistCard />
    </div>
  );
}
