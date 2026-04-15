"use client";

import { useContact } from "@/hooks/useContact";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

function SearchBar() {
  const { getcontacts } = useContact();

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      getcontacts({ search: value });
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-full bg-[#F9FAFB]  dark:bg-[#101828] flex items-center  gap-2 justify-between transition-colors border-b border-gray-200 dark:border-gray-600 mb-6 px-2 py-2 shadow-sm">
      <h1 className="text-xl font-bold hidden lg:block">Contact</h1>

      <input
        type="text"
        placeholder="Search contacts..."
        className="text-xl text-black dark:text-white outline-none border-none px-5 py-3  rounded-4xl  bg-gray-400 dark:bg-gray-600 placeholder-gray-600 dark:placeholder-gray-300 lg:w-[40%] w-full transition-colors"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ThemeToggle />
    </div>
  );
}

export default SearchBar;
