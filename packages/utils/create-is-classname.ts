export function createIsClassName(name: string, state: boolean = true) {
  return state ? "is-" + name : "";
}
