import items from "../../assets/items.json";

export const getItems = () => {
  if (items) {
    return items.data;
  } else {
    throw new Error("No Posts Found");
  }
};
