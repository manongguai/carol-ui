// 全局模块变量管理
let zIndex: number = 2000;

export function nextZIndex(): number {
  return zIndex++;
}

export function setZIndex(index: number) {
  zIndex = index;
}
