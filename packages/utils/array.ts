import { castArray as _ensureArray } from "lodash";

export const ensureArray = _ensureArray;
export const unique = <T>(arr: T[]) => [...new Set(arr)];

type Many<T> = T | ReadonlyArray<T>;

export const castArray = <T>(arr: Many<T>): Many<T>[] => {
  if (!arr && (arr as any) !== 0) return [];
  return Array.isArray(arr) ? arr : [arr];
};
