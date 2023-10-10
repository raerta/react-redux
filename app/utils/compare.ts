export function compareString(a: string, b: string) {
  return a
    ?.toLocaleLowerCase("tr-TR")
    .localeCompare(b, "tr", { sensitivity: "base" });
}
export function compareBoolean(a: boolean, b: boolean) {
  const data = a === b ? 0 : a ? -1 : 1;
  return data;
}
