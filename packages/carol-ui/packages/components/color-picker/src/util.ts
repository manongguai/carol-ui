const hexShortReg = /^#([0-9a-fA-f]{3})$/
const hexLongReg = /^#([0-9a-fA-f]{6})$/
const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/

const isOnePointZero = function (n: string) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}
const isPercentage = function (n: string) {
  return typeof n === 'string' && n.indexOf('%') !== -1
}
const bound01 = function (value: number | string, max: number): number {
  if (isOnePointZero(value.toString())) value = '100%'
  const processPercent = isPercentage(value.toString())
  let numValue = Math.min(max, Math.max(0, parseFloat(value.toString())))

  // Automatically convert percentage into number
  if (processPercent) {
    numValue = parseInt((numValue * max).toString(), 10) / 100
  }

  // Handle floating point rounding errors
  if (Math.abs(numValue - max) < 0.000001) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return (numValue % max) / parseFloat(max.toString())
}
export function rgb2hex(rgb: string, isRemoveUnit = false): string {
  // rgby颜色值的正则
  const reg = /^(rgb|RGB)/
  // 判断是否为rgb格式
  if (reg.test(rgb)) {
    // 将rgb的三个数值切割成数组 rgb(255,0,0) ——> ["255","0","0"]
    const colorArr = rgb.replace(/(?:rgb|RGB|\(|\))*/g, '').split(',')
    const hexValue = (
      (1 << 24) +
      (parseInt(colorArr[0]) << 16) +
      (parseInt(colorArr[1]) << 8) +
      parseInt(colorArr[2])
    )
      .toString(16)
      .slice(1)
    const hex = isRemoveUnit ? hexValue : '#' + hexValue
    return hex.toUpperCase()
  } else {
    return rgb
  }
}
export function hex2rgb(hex: string): string {
  // 16进制颜色值的正则
  // 把颜色值变成小写
  let color = hex.toUpperCase()
  // 判断是否为hex格式
  if (hexReg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < color.length; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    const colorChange: number[] = []
    for (let i = 1; i < color.length; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return 'rgb(' + colorChange.join(',') + ')'
  } else {
    return color
  }
}

export function hsv2rgb(h: number, s: number, v: number): string {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)
  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]
  const colorChange = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  return 'rgb(' + colorChange.join(',') + ')'
}

export function rgb2hsv(rgb: string): number[] {
  const colorArr = rgb.replace(/(?:rgb|RGB|\(|\))*/g, '').split(',')
  let [r, g, b] = colorArr.map((t) => Number(t))
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  const v = max
  const d = max - min
  const s = max === 0 ? 0 : d / max
  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [h * 360, s * 100, v * 100]
}

// hex 3位转6位
export function extendHex(shortHex: string): string {
  return shortHex
    .split('')
    .map((x) => x + x)
    .join('')
}

// 校验hex值是否合法
export function validHexString(value: string, oldValue = '') {
  value = value.startsWith('#') ? value.substring(1) : value
  const hexValue = '#' + value
  if (hexLongReg.test(hexValue)) {
    return value.toUpperCase()
  } else if (hexShortReg.test(hexValue)) {
    return extendHex(value).toUpperCase()
  } else {
    return (oldValue + '').toUpperCase()
  }
}

export function normalizeHue(hue: number): number {
  hue = Math.round(hue)
  return hue >= 360 ? 359 : hue < 0 ? 0 : hue
}

export function toHexString(h: number, s: number, v: number) {
  return rgb2hex(hsv2rgb(h, s, v), true)
}

export function toHsv(value: string) {
  return rgb2hsv(hex2rgb('#' + value))
}

// 根据字符串获取hexValue
export function getHexValueFromString(v: string) {
  return validHexString(v.startsWith('#') ? v.substring(1) : v)
}
