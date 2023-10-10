"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import SelectItem from "./SelectItem";
import { getData } from "../store/slices/itemsSlice";
import { useAppDispatch, useAppSelector } from "../store";

const SelectBox = () => {
  const getDataReducer = useAppSelector((state) => state.getData);
  const selectDataReducer = useAppSelector((state) => state.selectData);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [applyFilterText, setApplyFilterText] = useState("");

  const { data: items, status, message } = getDataReducer;
  const { data: selectItems } = selectDataReducer;

  useEffect(() => {
    dispatch(getData());
    return () => {};
  }, [selectItems]);

  const handleSearchInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
    if (!event.target.value.length) {
      setApplyFilterText("");
    }
  };

  const handleApplyFilter = () => {
    setApplyFilterText(searchText);
  };

  return (
    <div className="h-[763px] bg-primary w-[593px] border border-borderPrimary rounded-md px-[50px] pt-[40px] overflow-hidden">
      <div className="flex flex-col gap-y-8">
        <h1 className="text-2xl">Kategoriler</h1>
        <SearchInput
          searchText={searchText}
          handleSearchInput={handleSearchInput}
          handleApplyFilter={handleApplyFilter}
        />
        <div className="flex flex-col gap-y-4 overflow-y-scroll h-[450px]">
          {status === "loading"
            ? "loading..."
            : status === "failed"
            ? message
            : items
                .filter((elem) => {
                  if (!elem.isSelected) {
                    return elem.name
                      .toLowerCase()
                      .includes(applyFilterText.toLowerCase());
                  } else {
                    return elem;
                  }
                })
                .map((item) => <SelectItem item={item} key={item.id} />)}
        </div>
        <div>
          <button
            onClick={handleApplyFilter}
            className="bg-buttonPrimary/90 hover:bg-buttonPrimary/80 w-full h-14 text-white font-medium text-lg rounded-md transition-colors duration-300"
          >
            Ara
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
