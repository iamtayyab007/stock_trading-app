"use client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { Loader, Star, TrendingUp } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import Link from "next/link";

const SearchCommand = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialStocks, setInitialStocks] = useState<
    StockWithWatchlistStatus[]
  >([]);
  const [searchResult, setSearchResult] = useState<StockWithWatchlistStatus[]>(
    []
  );

  const debouncedValue = useDebounce(inputValue, 500);
  // useEffect(() => {
  //   if (!debouncedValue) {
  //     setLoading(false);
  //     //setSearchResult([]);
  //     return;
  //   }
  //   setLoading(true);
  //   const fetchStocks = async () => {
  //     console.log("Api call", debouncedValue);
  //     const stocks = await searchStocks(debouncedValue);
  //     setSearchResult(stocks);
  //     setLoading(false);
  //   };
  //   fetchStocks();
  // }, [debouncedValue]);

  useEffect(() => {
    if (!debouncedValue) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);

    const fetchStocks = async () => {
      try {
        const stocks = await searchStocks(debouncedValue);
        if (active) {
          setSearchResult(stocks);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStocks();

    return () => {
      active = false; // cancels outdated requests
    };
  }, [debouncedValue]);

  useEffect(() => {
    const searchStock = async () => {
      const initialStocks = await searchStocks();
      console.log("initialstocks", initialStocks);
      setInitialStocks(initialStocks);
    };

    searchStock();
  }, []);
  console.log("searc", searchResult);
  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <>
      <div>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by Symbol or company name..."
            onValueChange={handleValueChange}
          />

          <CommandList className="no-scrollbar">
            <CommandEmpty className="flex justify-center">
              {loading ? (
                <Loader />
              ) : debouncedValue && searchResult.length === 0 ? (
                "No results found."
              ) : null}
            </CommandEmpty>

            <CommandGroup heading="Popular stocks 10">
              {debouncedValue
                ? searchResult.map((item) => (
                    <CommandItem
                      key={item.symbol}
                      className="flex items-center gap-5"
                    >
                      <div>
                        <TrendingUp />
                      </div>

                      <div className="flex flex-col">
                        <span>
                          <Link href={`stocks/${item.symbol}`}>
                            {" "}
                            {item.name}
                          </Link>
                        </span>
                        <span className="text-gray-500">
                          {item.symbol} | {item.exchange} | {item.type}
                        </span>
                      </div>

                      <div>
                        <Star />
                      </div>
                    </CommandItem>
                  ))
                : initialStocks.map((item) => (
                    <CommandItem
                      key={item.symbol}
                      className="flex items-center gap-5"
                    >
                      <div>
                        <TrendingUp />
                      </div>

                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-gray-500">
                          {item.symbol} | {item.exchange} | {item.type}
                        </span>
                      </div>

                      <div>
                        <Star />
                      </div>
                    </CommandItem>
                  ))}
            </CommandGroup>

            <CommandSeparator />
          </CommandList>
        </Command>
      </div>
    </>
  );
};

export default SearchCommand;
