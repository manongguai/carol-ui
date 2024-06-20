export function onMove(moveCallback: (e: MouseEvent) => void, removeCallback: () => void) {
  const moveHandler = (event: Event) => {
    if ((event as MouseEvent).buttons !== 1) {
      onStopMove()
      return
    }
    moveCallback && moveCallback(event as MouseEvent)
  }

  const onStopMove = () => {
    window.removeEventListener('mousemove', moveHandler)
    window.removeEventListener('contextmenu', onStopMove)
    window.removeEventListener('mouseup', onStopMove)

    removeCallback && removeCallback()
  }
  window.addEventListener('mousemove', moveHandler)
  window.addEventListener('contextmenu', onStopMove)
  window.addEventListener('mouseup', onStopMove)
}

export function getDom(val: string | HTMLElement) {
  if (val) {
    if (typeof val === 'string') {
      return document.querySelectorAll(val)[0] as HTMLElement
    }
    if (typeof val === 'object' && val instanceof window.HTMLElement) {
      return val
    }
  }
}
