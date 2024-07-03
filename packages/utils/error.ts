import { isString } from "./is";

class ClError extends Error {
  constructor(m: string) {
    super(m);
    this.name = "ClError";
  }
}

export function throwError(scope: string, m: string): never {
  throw new ClError(`[${scope}] ${m}`);
}

export function debugWarn(err: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (process.env.NODE_ENV !== "production") {
    const error: Error = isString(scope) ? new ClError(`[${scope}] ${message}`) : scope;
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}
