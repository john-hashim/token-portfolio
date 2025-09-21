import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Star,
  Check,
  Plus,
  Loader2,
  SearchX,
  TrendingUp,
  Search,
} from "lucide-react";
import type { TokenSearchInterface } from "../types";
import {
  getMarketData,
  getTrendingTokens,
  searchTokens,
} from "../api/tokenApi";
import { useDebouncedCallback } from "use-debounce";
import { useAppDispatch } from "@/store/hooks";
import { setError, setLoading, setTokens } from "../store/watchlistSlice";

export default function TokenSearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenList, setTokenList] = useState<TokenSearchInterface[]>([]);
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trendingTokens, setTrendingTokens] = useState<TokenSearchInterface[]>(
    []
  );
  const [initialLoading, setInitialLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initTrendingTokens = async () => {
      setInitialLoading(true);
      try {
        const result = await getTrendingTokens();
        setTrendingTokens(result); // Cache trending tokens
        setTokenList(result);
      } catch (error) {
        console.error("Failed to load trending tokens:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    if (open) {
      initTrendingTokens();
    } else {
      setTokenList([]);
      setTrendingTokens([]);
      setSelectedTokenIds([]);
    }
  }, [open]);

  const toggleSelect = (id: string) => {
    setSelectedTokenIds((prev) =>
      prev.includes(id)
        ? prev.filter((tokenId) => tokenId !== id)
        : [...prev, id]
    );
  };

  const onTokenSearch = useDebouncedCallback(async (query: string) => {
    setSearchQuery(query);

    // If query is empty, show trending tokens immediately (no API call needed)
    if (!query.trim()) {
      setTokenList(trendingTokens);
      return;
    }

    setIsSearching(true);
    try {
      const result = await searchTokens(query);
      setTokenList(result);
    } catch (error) {
      console.error("Search failed:", error);
      setTokenList([]);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onTokenSearch(value);
  };

  const addTokenList = async () => {
    const coinIds = selectedTokenIds.join(",");
    dispatch(setLoading(true));
    setOpen(false);
    try {
      let tokens = await getMarketData(coinIds);
      tokens = tokens.map((token) => ({
        ...token,
        holdings: 0,
        value: 0,
      }));
      dispatch(
        setTokens({
          tokens,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(setError("Unable to fetch token details. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-accent hover:bg-red-400 text-accent-foreground"
        >
          <Plus className="w-4 h-4" />
          Add Tokens
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[70vh] max-h-[600px] min-h-[500px] border-zinc-700 bg-bg-primary text-white p-0 flex flex-col [&>button]:hidden">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-zinc-400" />
            </div>
            <Input
              placeholder="Search tokens (e.g., ETH, SOL)..."
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-10 pr-10 border-0 border-b border-b-zinc-700 rounded-bl-none rounded-br-none text-white placeholder:text-zinc-500 focus-visible:ring-0"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {!searchQuery && !isSearching && !initialLoading && (
            <div className="flex-shrink-0 px-4 pt-3 pb-2">
              <h3 className="text-sm font-medium text-text-secondary flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </h3>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {initialLoading || isSearching ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-zinc-400 mx-auto mb-3" />
                  <p className="text-sm text-zinc-400">
                    {initialLoading ? "Loading tokens..." : "Searching..."}
                  </p>
                </div>
              </div>
            ) : tokenList.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  {searchQuery ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-3">
                        <SearchX className="w-8 h-8 text-zinc-500" />
                      </div>
                      <p className="text-sm text-zinc-400 mb-1">
                        No tokens found
                      </p>
                      <p className="text-xs text-zinc-500">
                        Try searching with different keywords
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-8 h-8 text-zinc-500" />
                      </div>
                      <p className="text-sm text-zinc-400">
                        No trending tokens available
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {tokenList.map((token) => (
                  <div
                    onClick={() => toggleSelect(token.id)}
                    key={token.id}
                    className="flex items-center justify-between px-3 py-2.5 hover:bg-bg-secondary rounded-lg cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-zinc-800 flex-shrink-0">
                        <img
                          src={token.thumb}
                          alt={`${token.name} logo`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-text-primary truncate">
                          <span className="font-medium">{token.symbol}</span>
                          <span className="text-zinc-400 ml-2">
                            {token.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {selectedTokenIds.includes(token.id) && (
                        <Star
                          className="w-3 h-3 fill-accent text-accent"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      )}
                      {selectedTokenIds.includes(token.id) ? (
                        <div
                          className="w-5 h-5 rounded-full bg-accent flex items-center justify-center transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(token.id);
                          }}
                        >
                          <Check className="w-3 h-3 text-bg-primary" />
                        </div>
                      ) : (
                        <div
                          className="w-5 h-5 rounded-full border border-zinc-600 hover:border-zinc-400 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(token.id);
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 p-3 border-t border-zinc-700 bg-bg-secondary flex justify-between items-center">
          <span className="text-xs text-zinc-400 pl-1">
            {selectedTokenIds.length > 0 &&
              `${selectedTokenIds.length} token${
                selectedTokenIds.length > 1 ? "s" : ""
              } selected`}
          </span>
          <Button
            className="bg-accent hover:bg-red-400 text-black text-sm font-medium px-4 py-2 h-auto"
            disabled={selectedTokenIds.length === 0}
            onClick={() => addTokenList()}
          >
            Add to Wishlist{" "}
            {selectedTokenIds.length > 0 && `(${selectedTokenIds.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
