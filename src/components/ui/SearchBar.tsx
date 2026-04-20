"use client";

import { useContact } from "@/hooks/useContact";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import PopupCreateContactPage from "./PopupCreateContactPage";

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

      <div className="flex gap-2">
        <button
          onClick={() => setopen(true)}
          className=" cursor-pointer active:scale-95 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Create A New Contact
        </button>
        <ThemeToggle />
      </div>
      {open && <PopupCreateContactPage open={open} setOpen={setopen} />}
    </div>
  );
}

export default SearchBar;
