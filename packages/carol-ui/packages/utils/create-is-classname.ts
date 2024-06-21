export function createIsClassName(name: string, state: boolean = false) {
  return state ? 'is-' + name : ''
}
