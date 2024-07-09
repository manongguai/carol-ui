const HIDDEN_STYLE = `
  height:0 !important;
  width:0 !important;
  visibility:hidden !important;
  position:absolute !important;
  top:0 !important;
  right:0 !important;
  z-index:-1000 !important;
  overflow-wrap: normal;
  white-space: nowrap;
  overflow-y: auto;
`

const CONTEXT_STYLE: string[] = [
  'letter-spacing',
  'line-height',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'text-indent',
  'padding'
]

interface NodeStyling {
  width: number
  lineHeight: number
  boxSizing: string
}

interface NodeStyle {
  width: number
  lineHeight: number
  boxSizing: string
  paddingSize: number
  borderSize: number
  contextStyle: string
}

function calculateNodeStyling(targetElement: HTMLElement): NodeStyle {
  const style = window.getComputedStyle(targetElement)
  const width = parseFloat(style.getPropertyValue('width'))
  const lineHeight = parseFloat(style.getPropertyValue('line-height'))
  const boxSizing = style.getPropertyValue('box-sizing')
  const paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  const borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))

  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(
    ';'
  )

  return { width, lineHeight, boxSizing, paddingSize, borderSize, contextStyle }
}
let hiddenTextarea: HTMLTextAreaElement | null

export function calcTextareaHeight(targetElement: HTMLTextAreaElement): string {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  const { contextStyle, width, lineHeight } = calculateNodeStyling(targetElement)
  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)

  hiddenTextarea.value = targetElement.value || targetElement.placeholder || ''

  let lines = Math.ceil(hiddenTextarea.scrollWidth / width)

  const siblingWidth = Math.ceil(
    parseFloat(
      window
        .getComputedStyle(targetElement.nextElementSibling as HTMLElement)
        .getPropertyValue('width')
    )
  )

  if (siblingWidth) {
    if (hiddenTextarea.scrollWidth + siblingWidth + lines * 4 >= lines * width) {
      lines = lines + 1
    }
  }

  const wrapLine = (hiddenTextarea.value.match(/[\n]/g) || []).length
  if (wrapLine) {
    lines = lines + wrapLine
  }

  const height = `${lines * lineHeight}px`

  if (hiddenTextarea.parentNode) {
    hiddenTextarea.parentNode.removeChild(hiddenTextarea)
  }
  hiddenTextarea = null

  return height
}
interface BoxHeightResult {
  height?: string
  minHeight?: string
  maxHeight?: string
}

export function calcBoxHeight(
  boxEle: HTMLElement,
  innerEle: HTMLElement,
  rows: number,
  minRows: number,
  maxRows: number,
  autoSize: boolean
): BoxHeightResult {
  const lineHeight = parseFloat(window.getComputedStyle(innerEle).getPropertyValue('line-height'))
  const { paddingSize, borderSize, boxSizing } = calculateNodeStyling(boxEle)
  const result: BoxHeightResult = {}

  if (!autoSize) {
    let height = lineHeight * rows
    if (boxSizing === 'border-box') {
      height = height + paddingSize + borderSize
    }
    result.height = `${height}px`
  }

  if (minRows) {
    let minHeight = lineHeight * minRows
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    result.minHeight = `${minHeight}px`
  }

  if (maxRows) {
    let maxHeight = lineHeight * maxRows
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    result.maxHeight = `${maxHeight}px`
  }

  return result
}
