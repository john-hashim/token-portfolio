import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectWatchlistLoading,
  selectWatchlistTokens,
} from "../store/watchlistSelector";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { removeToken, updateHoldings } from "../store/watchlistSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SparklineCell from "./SparklineCell";

export default function WatchlistTable() {
  const tokens = useSelector(selectWatchlistTokens);
  const isLoading = useSelector(selectWatchlistLoading);
  const [editingTokenId, setEditingTokenId] = useState('');
  const [holdingValue, setHoldingValue] = useState(0);
  const dispatch = useAppDispatch();

  const updateHolding = (price: number, id: string) => {
    const value = parseFloat((price * holdingValue).toFixed(2));
    dispatch(
      updateHoldings({
        tokenId: id,
        holding: holdingValue,
        value,
      })
    );
    setHoldingValue(0);
    setEditingTokenId("");
  };

  const removeCrypto = (id: string) => {
    dispatch(
      removeToken({
        tokenId: id,
      })
    );
  };

  return (
    <div className="rounded-xl border border-zinc-700 overflow-hidden">
      <div className="overflow-x-auto">
        {isLoading && (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin"></div>
            <p className="text-text-secondary text-sm">
              {tokens.length > 0
                ? "Updating watchlist..."
                : "Loading watchlist..."}
            </p>
          </div>
        )}
        {!isLoading && tokens.length === 0 && (
          <div className="py-24 flex items-center justify-center">
            <p className="text-text-secondary text-sm">
              No tokens selected, please add tokens
            </p>
          </div>
        )}
        {!isLoading && tokens.length > 0 && (
          <div>
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-zinc-700 border-b bg-bg-secondary text-text-secondary text-left">
                  <th className="py-3 px-4 font-light text-sm">Token</th>
                  <th className="py-3 px-4 font-light text-sm">Price</th>
                  <th className="py-3 px-4 font-light text-sm">24h %</th>
                  <th className="py-3 px-4 font-light text-sm">
                    Sparkline (7d)
                  </th>
                  <th className="py-3 px-4 font-light text-sm  w-[20%]">
                    Holdings
                  </th>
                  <th className="py-3 px-4 font-light text-sm w-[10%]">Value</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((crypto, index) => (
                  <tr
                    key={index}
                    className=" border-zinc-700 border-b hover:bg-bg-secondary transition-colors"
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl">
                          <img
                            src={crypto.image}
                            alt={`${crypto.name} logo`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="font-light text-sm text-text-primary">
                            {crypto.name} <span> ({crypto.symbol}) </span>{" "}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 font-light text-xs text-text-secondary">
                      ${crypto.current_price.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-xs text-text-secondary">
                      <span>
                        {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                        {crypto.price_change_percentage_24h.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="w-24 h-10 flex items-center">
                        <SparklineCell  data={crypto.sparkline_in_7d.price}/>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-xs text-text-secondary">
                      <div className="flex items-center gap-2">
                        {editingTokenId !== "" &&
                        editingTokenId === crypto.id ? (
                          <div>
                            <input
                              type="text"
                              onChange={(e) =>
                                setHoldingValue(Number(e.target.value))
                              }
                              className="rounded-md outline-0 bg-transparent mr-2 px-3 py-1 text-sm focus:border-1 border-lime-400 shadow-[0_0_0_4px_rgba(163,230,53,0.15)]"
                            />
                            <button
                              type="button"
                              className="bg-accent text-bg-primary rounded-md text-sm shadow px-3 py-1"
                              onClick={() =>
                                updateHolding(crypto.current_price, crypto.id)
                              }
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div>{crypto.holdings}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 text-xs text-text-secondary">
                      ${crypto.value}
                    </td>
                    <td className="py-2 px-4 text-text-secondary hover:text-text-primary">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="hover:text-text-primary text-text-secondary rounded p-1 transition-colors">
                            <Ellipsis className="w-4 h-4 cursor-pointer" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 bg-bg-secondary border-0"
                          align="end"
                        >
                          <DropdownMenuItem
                            onClick={() => setEditingTokenId(crypto.id)}
                            className="hover:bg-bg-secondary hover:text-text-primary focus:bg-transparent text-text-secondary cursor-pointer"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            <span>Edit Holdings</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => removeCrypto(crypto.id)}
                            className="hover:bg-bg-secondary hover:text-red-400 focus:bg-transparent text-red-300 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            <span>Remove</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-2 text-xs text-text-secondary">
              <div>1 — 10 of 100 results</div>
              <div className="flex items-center gap-2">
                <span>1 of 10 pages</span>
                <button className="px-3 py-1 rounded hover:bg-zinc-800 transition-colors">
                  Prev
                </button>
                <button className="px-3 py-1 rounded hover:bg-zinc-800 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
