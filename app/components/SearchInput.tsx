import React from "react";

interface IProps {
  searchText: string;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleApplyFilter: () => void;
}

const SearchInput = ({
  searchText,
  handleSearchInput,
  handleApplyFilter,
}: IProps) => {
  return (
    <div className="relative border border-borderPrimary rounded-md p-3 bg-white w-full flex items-center gap-x-2">
      <input
        className="outline-none w-full pl-2 placeholder-gray- placeholder:text-xl placeholder:font-medium"
        type="text"
        value={searchText}
        onChange={handleSearchInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleApplyFilter();
          }
        }}
        placeholder="kategori ara..."
      />
      <button onClick={handleApplyFilter} className="cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8 12.2l-3.9-4c.6-.8 1.1-2 1.1-3.1 0-2.8-2.3-5-5-5-2.8 0-5 2.3-5 5 0 2.8 2.2 5 5 5 .8 0 1.7-.2 2.3-.5l3.9 4.3c.2.2.6.2.8 0l.8-.8c.3-.3.3-.7 0-.9zM6 8.1c-1.7 0-3-1.4-3-3 0-1.7 1.4-3 3-3s3 1.4 3 3-1.4 3-3 3z"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;
