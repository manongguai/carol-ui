export function stringToNumber(value: string | number): number {
  return typeof value === "number" ? value : Number(value);
}
