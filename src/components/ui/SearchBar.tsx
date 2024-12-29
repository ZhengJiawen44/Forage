import React from "react";
import { TbSearch } from "react-icons/tb";

const SearchBar = () => {
  return (
    <div
      className="flex items-center justify-between bg-item
 rounded-[1rem] shadow-inset
 w-full h-10 sm:h-12  pr-3 sm:pr-5"
    >
      <input
        aria-label="Search blogs"
        type="text"
        className=" w-full h-[100%] bg-transparent pl-3 sm:pl-4 text-medium
  outline-none "
      ></input>

      <TbSearch
        className=" w-[1.5rem] h-[1.5rem] sm:w-[2rem] sm:h-[2rem] 
       transition-all duration-300 ease-in-out text-item-foreground
        hover:text-foreground hover:cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
