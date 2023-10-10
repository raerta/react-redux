import React from "react";
import { useAppDispatch } from "../store";
import { ISelectItem } from "../types/selectTypes";
import { selectItemAction } from "../store/slices/selectItemSlice";

const SelectItem = ({ item }: { item: ISelectItem}) => {
  const dispatch = useAppDispatch();
  const handleSelectItem = () => {
    dispatch(selectItemAction(item.id));
  };
  return (
    <div className="flex items-center gap-x-4">
      <div className="border border-borderPrimary w-5 h-5 flex items-center justify-center p-[3px]">
        <input
          onChange={handleSelectItem}
          type="checkbox"
          checked={item.isSelected}
          className="appearance-none checked:bg-buttonPrimary w-full h-full cursor-pointer"
        />
      </div>
      <span
        className={`${
          item.isSelected ? "text-buttonPrimary " : "text-black/80"
        } antialiased font-medium`}
        dangerouslySetInnerHTML={{ __html: item.name }}
      />
    </div>
  );
};

export default SelectItem;
