import React from "react";
import Inputbox from "./Inputbox";

const Searchbar = ({ handleSearch, searchQuery, onChange }) => {
  return (
    <div className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 translate-y-3 flex flex-shrink-0 items-center justify-center w-2/4">
      <form className="w-full" onSubmit={handleSearch}>
        <Inputbox
          type="text"
          classes="h-8 w-full rounded ps-2 text-sm"
          value={searchQuery}
          pholder="Search Videos Here..."
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Searchbar;
