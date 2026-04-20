"use client";

import { useContact } from "@/hooks/useContact";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import PopupCreateContactPage from "./PopupCreateContactPage";
import { Search, Plus, Sparkles } from "lucide-react";

function SearchBar() {
  const { getContacts } = useContact();
  const [open, setopen] = useState(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (value.trim() === "") {
      return;
    }
    const timer = setTimeout(() => {
      getContacts({ search: value });
    }, 1000);

    return () => clearTimeout(timer);
  }, [value, getContacts]);

  return (
    <div className="w-full flex items-center gap-4 py-2">
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search for a contact..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setopen(true)}
          className="group flex items-center gap-2 px-5 py-3.5 bg-primary text-primary-foreground rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 hover:shadow-primary/30"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="hidden sm:inline">Add New</span>
        </button>
        <div className="p-1 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-md">
          <ThemeToggle />
        </div>
      </div>

      {open && <PopupCreateContactPage open={open} setOpen={setopen} />}
    </div>
  );
}

export default SearchBar;
