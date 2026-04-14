"use client";

import { useContact } from "@/hooks/useContact";
import { useEffect, useState } from "react";

function SearchBar() {
  const { getcontacts } = useContact();

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!value) return;
    const timer = setTimeout(() => {
      getcontacts({ search: value });
    }, 500);

    return () => clearTimeout(timer);
  }, [value, getcontacts]);

  return (
    <div className="w-full bg-gray-300 flex items-center justify-center mb-6  rounded-4xl p-2">
      <input
        type="text"
        placeholder="Search contacts..."
        className="text-xl text-black outline-none border-none px-5 py-3  rounded-4xl  bg-gray-400 lg:w-[40%] w-full "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
