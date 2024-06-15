// src/components/SearchSong.js
"use client";
import React, { useState } from "react";
import Inputbox from "@/src/components/Inputbox";
import axios from "axios";

const SearchSong = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/pages/api/youtube", { query });
      onSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 translate-y-3 flex flex-shrink-0 items-center justify-center w-1/4">
      <form className="w-full" onSubmit={handleSearch}>
        <Inputbox
          type="text"
          classes="h-8 w-full rounded ps-2 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchSong;
