import React from "react";
import { TbSearch } from "react-icons/tb";

const SearchBar = () => {
  return (
    <>
      <div
        className="flex items-center justify-between bg-background
      rounded-[5px] w-full h-10 border"
      >
        <input
          aria-label="Search blogs"
          type="text"
          className=" w-full h-[100%] bg-transparent pl-3 sm:pl-4 text-medium
        outline-none "
        ></input>

        <button className=" flex items-center justify-center   hover:cursor-pointer">
          <TbSearch
            className="w-[1.5rem] h-[1.5rem] mx-4 transition-all duration-300 ease-in-out text-item-foreground
        hover:text-foreground"
          />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
