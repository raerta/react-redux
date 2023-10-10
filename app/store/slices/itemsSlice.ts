import { fetchData } from "@/app/services/clientServices/fetchData";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ISelectItem } from "../../types/selectTypes";
import { compareString } from "../../utils/compare";

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

export const getData = createAsyncThunk("getData", async () => {
  try {
    const data = localStorage.getItem("data");
    if (data) {
      return JSON.parse(data);
    } else {
      const response = await fetchData();
      const data: ISelectItem[] = response.items.map((item: ISelectItem) => {
        const newItem = {
          name: item,
          isSelected: false,
          id: crypto.randomUUID(),
        };
        return newItem;
      });
      const sortedItems = data.sort(
        (a: { name: string }, b: { name: string }) =>
          compareString(a.name, b.name)
      );
      localStorage.setItem("data", JSON.stringify(sortedItems));
      return sortedItems;
    }
  } catch (error: any) {
    return error.response.data;
  }
});

const getDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getData.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getData.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    })
    .addCase(getData.rejected, (state, action) => {
      state.status = "failed";
      state.message = "Failed fetch data";
    });
});

export default getDataReducer;
