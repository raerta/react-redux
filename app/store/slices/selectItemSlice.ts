import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ISelectItem } from "../../types/selectTypes";
import { compareBoolean, compareString } from "../../utils/compare";

export interface IDataState {
  data: ISelectItem[];
  status: "idle" | "loading" | "failed" | "success";
  message: any;
}

const initialState: IDataState = {
  data: [],
  status: "loading",
  message: "",
};

export const selectItemAction = createAsyncThunk(
  "selectItem",
  async (selectedId: string) => {
    try {
      const data: ISelectItem[] = JSON.parse(localStorage.getItem("data")!);
      const updatedData = data
        .map((x) =>
          x.id === selectedId ? { ...x, isSelected: !x.isSelected } : x
        )
        .sort((a, b) => compareString(a.name, b.name));

      const sortedData = updatedData.sort((a, b) =>
        compareBoolean(a.isSelected, b.isSelected)
      );

      localStorage.setItem("data", JSON.stringify(sortedData));
      return sortedData;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

const selectItemReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectItemAction.pending, (state) => {
      state.status = "loading";
    })
    .addCase(selectItemAction.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    })
    .addCase(selectItemAction.rejected, (state, action) => {
      state.status = "failed";
      state.message = "Failed change data";
    });
});

export default selectItemReducer;
