"use client";

import { Search as SearchIcon } from "lucide-react";

export default function SearchBar() {
  const handleSearch = () => {
    // handle search logic
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between py-2 px-4 border border-black rounded-xl max-w-5xl w-full mx-auto"
    >
      <input
        type="text"
        className="bg-transparent outline-none placeholder:text-black p-2 w-full"
        placeholder="Search The Store"
      />
      <SearchIcon size={22} onClick={handleSearch} />
    </form>
  );
}
