const DEFAULTS = {
  placement: 'bottom',
  gpuAcceleration: true,
  offset: 0,
  boundariesElement: 'viewport',
  boundariesPadding: 5,
  preventOverflowOrder: ['left', 'right', 'top', 'bottom'],
  flipBehavior: 'flip',
  arrowElement: '[x-arrow]',
  arrowOffset: 0,
  // 在将偏移应用于popper之前用于修改偏移的函数列表
  modifiers: ['shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle'],
  modifiersIgnored: [],
  forceAbsolute: false,
  removeOnDestroy: true
}
// 修饰符
type Modifiers = string | Record<string, any>
// Popper 配置项
type Options = {
  // popper的位置
  placement?: string
  // 是否使用gpu加速渲染
  gpuAcceleration?: boolean
  // 将popper从其原点偏移给定数量的像素（可以是负数）
  offset?: number
  // 将充当popper边界的元素
  boundariesElement?: string
  // 用于定义边界和popper之间的最小距离的像素量
  boundariesPadding?: number
  // popper将按照此顺序尝试防止溢出，
  //默认情况下，它可以在边界元素的左侧和顶部溢出
  preventOverflowOrder?: string[]
  // 用于更改popper位置的行为
  flipBehavior?: string
  arrowElement?: string
  arrowOffset?: number
  // 在将偏移应用于popper之前用于修改偏移的函数列表
  modifiers?: Modifiers[]
  modifiersIgnored?: string[]
  // 强制absolute定位
  forceAbsolute?: boolean
  removeOnDestroy?: boolean // 触发元素移除时候销毁
}
type PositionAttributes = 'fixed' | 'absolute'
type StylesObject = Record<string, any>
// 元素偏移属性
interface ElementRect {
  width?: number
  height?: number
  left?: number
  top?: number
  right?: number
  bottom?: number
  position?: PositionAttributes
}
type RectSize = {
  width: number
  height: number
}
type RectOffsets = {
  popper: ElementRect
  reference: ElementRect
  arrow?: StylesObject
}
// 需要操作的数据
interface ModifiersData {
  instance: Popper
  styles: Partial<CSSStyleDeclaration>
  placement?: string
  _originalPlacement?: string
  offsets?: RectOffsets
  boundaries?: ElementRect
  arrowElement?: HTMLElement
  flipped?: boolean
}

export class Popper {
  _reference: HTMLElement
  _popper: HTMLElement
  state: Record<string, any>
  root: Window
  _options: Options
  modifiers: Record<string, any> = {
    applyStyle(data: ModifiersData) {
      const styles: Record<string, any> = {
        position: data.offsets!.popper.position
      }
      // round top and left to avoid blurry text
      const left = Math.round(data.offsets!.popper.left!)
      const top = Math.round(data.offsets!.popper.top!)
      // if gpuAcceleration is set to true and transform is supported, we use `translate3d` to apply the position to the popper
      // we automatically use the supported prefixed version if needed
      let prefixedProperty
      if (
        this._options.gpuAcceleration &&
        (prefixedProperty = getSupportedPropertyName('transform'))
      ) {
        styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)'
        styles.top = 0
        styles.left = 0
      }
      // othwerise, we use the standard `left` and `top` properties
      else {
        styles.left = left
        styles.top = top
      }
      // any property present in `data.styles` will be applied to the popper,
      // in this way we can make the 3rd party modifiers add custom styles to it
      // Be aware, modifiers could override the properties defined in the previous
      // lines of this modifier!
      Object.assign(styles, data.styles)
      setStyle(this._popper, styles)
      // set an attribute which will be useful to style the tooltip (use it to properly position its arrow)
      // NOTE: 1 DOM access here
      this._popper.setAttribute('x-placement', data.placement)
      // if the arrow modifier is required and the arrow style has been computed, apply the arrow style
      if (
        this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) &&
        data.offsets!.arrow
      ) {
        setStyle(data.arrowElement!, data.offsets!.arrow)
      }
      return data
    },
    shift(data: ModifiersData) {
      const placement = data.placement!
      const basePlacement = placement.split('-')[0]
      const shiftVariation = placement.split('-')[1]
      // if shift shiftVariation is specified, run the modifier
      if (shiftVariation) {
        const reference = data.offsets!.reference
        const popper = getPopperClientRect(data.offsets!.popper)
        const shiftOffsets = {
          y: {
            start: { top: reference.top },
            end: { top: reference.top! + reference.height! - popper.height! }
          },
          x: {
            start: { left: reference.left },
            end: { left: reference.left! + reference.width! - popper.width! }
          }
        }
        const axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y'
        data.offsets!.popper = Object.assign(
          popper,
          shiftOffsets[axis as keyof typeof shiftOffsets][shiftVariation as 'start' | 'end'] as any
        )
      }
      return data
    },
    preventOverflow(data: ModifiersData) {
      const order = this._options.preventOverflowOrder
      const popper = getPopperClientRect(data.offsets!.popper)
      const check = {
        left: function () {
          let left = popper.left
          if (popper.left! < data.boundaries!.left!) {
            left = Math.max(popper.left!, data.boundaries!.left!)
          }
          return { left: left }
        },
        right: function () {
          let left = popper.left
          if (popper.right! > data.boundaries!.right!) {
            left = Math.min(popper.left!, data.boundaries!.right! - popper.width!)
          }
          return { left: left }
        },
        top: function () {
          let top = popper.top
          if (popper.top! < data.boundaries!.top!) {
            top = Math.max(popper.top!, data.boundaries!.top!)
          }
          return { top: top }
        },
        bottom: function () {
          let top = popper.top
          if (popper.bottom! > data.boundaries!.bottom!) {
            top = Math.min(popper.top!, data.boundaries!.bottom! - popper.height!)
          }
          return { top: top }
        }
      }
      order.forEach(function (direction: string) {
        data.offsets!.popper = Object.assign(
          popper,
          check[direction as keyof typeof check]() as ElementRect
        )
      })
      return data
    },
    keepTogether(data: ModifiersData) {
      const popper = getPopperClientRect(data.offsets!.popper)
      const reference = data.offsets!.reference
      const f = Math.floor

      if (popper.right! < f(reference.left!)) {
        data.offsets!.popper.left = f(reference.left!) - popper.width!
      }
      if (popper.left! > f(reference.right!)) {
        data.offsets!.popper.left = f(reference.right!)
      }
      if (popper.bottom! < f(reference.top!)) {
        data.offsets!.popper.top = f(reference.top!) - popper.height!
      }
      if (popper.top! > f(reference.bottom!)) {
        data.offsets!.popper.top = f(reference.bottom!)
      }
      return data
    },
    flip(data: ModifiersData) {
      if (!this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)) {
        console.warn(
          'WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!'
        )
        return data
      }

      if (data.flipped && data.placement === data._originalPlacement) {
        // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
        return data
      }
      let placement = data.placement!.split('-')[0]
      let placementOpposite = getOppositePlacement(placement)
      const variation = data.placement!.split('-')[1] || ''
      let flipOrder: string[] = []
      if (this._options.flipBehavior === 'flip') {
        flipOrder = [placement, placementOpposite]
      } else {
        flipOrder = this._options.flipBehavior
      }
      const that = this
      flipOrder.forEach(
        function (step: string, index: number) {
          if (placement !== step || flipOrder.length === index + 1) {
            return
          }
          placement = data.placement!.split('-')[0]
          placementOpposite = getOppositePlacement(placement)
          const popperOffsets = getPopperClientRect(data.offsets!.popper)
          // this boolean is used to distinguish right and bottom from top and left
          // they need different computations to get flipped
          const a = ['right', 'bottom'].indexOf(placement) !== -1
          // using Math.floor because the reference offsets may contain decimals we are not going to consider here
          if (
            (a &&
              Math.floor(data.offsets!.reference[placement as keyof ElementRect] as number) >
                Math.floor(popperOffsets[placementOpposite as keyof ElementRect] as number)) ||
            (!a &&
              Math.floor(data.offsets!.reference[placement as keyof ElementRect] as number) <
                Math.floor(popperOffsets[placementOpposite as keyof ElementRect] as number))
          ) {
            // we'll use this boolean to detect any flip loop
            data.flipped = true
            data.placement = flipOrder[index + 1]
            if (variation) {
              data.placement += '-' + variation
            }
            data.offsets!.popper = that._getOffsets(
              that._popper,
              that._reference,
              data.placement
            ).popper
            data = that.runModifiers(data, that._options.modifiers, that._flip)
          }
        }.bind(that)
      )
      return data
    },

    offset(data: ModifiersData) {
      const offset = this._options.offset
      const popper = data.offsets!.popper
      if (data.placement!.indexOf('left') !== -1) {
        popper.top! -= offset
      } else if (data.placement!.indexOf('right') !== -1) {
        popper.top += offset
      } else if (data.placement!.indexOf('top') !== -1) {
        popper.left! -= offset
      } else if (data.placement!.indexOf('bottom') !== -1) {
        popper.left += offset
      }
      return data
    },
    arrow(data: ModifiersData) {
      let arrow: string | HTMLElement = this._options.arrowElement
      const arrowOffset = this._options.arrowOffset

      // if the arrowElement is a string, suppose it's a CSS selector
      if (typeof arrow === 'string') {
        arrow = this._popper.querySelector(arrow)
      }

      // if arrow element is not found, don't run the modifier
      if (!arrow) {
        return data
      }

      // the arrow element must be child of its popper
      if (!this._popper.contains(arrow)) {
        console.warn('WARNING: `arrowElement` must be child of its popper element!')
        return data
      }

      // arrow depends on keepTogether in order to work
      if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
        console.warn(
          'WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!'
        )
        return data
      }
      const arrowStyle: StylesObject = {}
      const placement = data.placement!.split('-')[0]
      const popper = getPopperClientRect(data.offsets!.popper)
      const reference = data.offsets!.reference
      const isVertical = ['left', 'right'].indexOf(placement) !== -1

      const len = isVertical ? 'height' : 'width'
      const side = isVertical ? 'top' : 'left'
      // const translate = isVertical ? 'translateY' : 'translateX'
      const altSide = isVertical ? 'left' : 'top'
      const opSide = isVertical ? 'bottom' : 'right'
      const arrowSize: number = getOuterSizes(arrow as HTMLElement)[len as 'height' | 'width']!
      //
      // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
      //

      // top/left side
      if (reference[opSide]! - arrowSize < popper[side]!) {
        data.offsets!.popper[side]! -= popper[side]! - (reference[opSide]! - arrowSize)
      }
      // bottom/right side
      if (reference[side]! + arrowSize > popper[opSide]!) {
        data.offsets!.popper[side]! += reference[side]! + arrowSize - popper[opSide]!
      }

      // compute center of the popper
      const center = reference[side] + (arrowOffset || reference[len]! / 2 - arrowSize / 2)

      let sideValue = center - popper[side]!

      // prevent arrow from being placed not contiguously to its popper
      sideValue = Math.max(Math.min(popper[len]! - arrowSize - 8, sideValue), 8)
      arrowStyle[side] = sideValue
      arrowStyle[altSide] = '' // make sure to remove any old style from the arrow

      data.offsets!.arrow = arrowStyle
      data.arrowElement = arrow as HTMLElement
      return data
    }
  }
  constructor(reference: HTMLElement, popper: HTMLElement, options: Options) {
    this.root = window
    this._reference = reference
    this.state = {}
    this._popper = popper

    this._options = Object.assign({}, DEFAULTS, options)
    this._options.modifiers = this._options.modifiers!.map((modifier) => {
      // remove ignored modifiers
      if (this._options.modifiersIgnored!.indexOf(modifier as string) !== -1) return
      //将x-placement属性设置在所有其他属性之前，因为它可以用于向popper添加边距
      //需要计算边距以获得正确的popper偏移
      if (modifier === 'applyStyle') {
        this._popper.setAttribute('x-placement', this._options.placement!)
      }
      //返回由字符串标识的预定义修饰符或保留自定义修饰符
      return this.modifiers[modifier as string] || modifier
    })
    //在进行任何计算之前，请确保应用popper位置
    this.state.position = this._getPosition(this._popper, this._reference)
    setStyle(this._popper, { position: this.state.position, top: 0 })
    //启动第一次更新以将popper定位在正确的位置
    this.update()
    //设置事件侦听器，他们将负责在特定情况下更新位置
    this._setupEventListeners()
  }
  isModifierRequired(requesting: string, requested: string): boolean {
    const index = getArrayKeyIndex(this._options.modifiers!, requesting)
    return !!this._options.modifiers!.slice(0, index!).filter(function (modifier) {
      return modifier === requested
    }).length
  }
  destroy() {
    this._popper.removeAttribute('x-placement')
    this._popper.style.left = ''
    this._popper.style.position = ''
    this._popper.style.top = ''
    // @ts-expect-error
    this._popper.style[getSupportedPropertyName('transform')] = ''
    this._removeEventListeners()
    // remove the popper if user explicity asked for the deletion on destroy
    if (this._options.removeOnDestroy) {
      this._popper.remove()
    }
    return this
  }
  onCreate(callback: (arg: Popper) => void) {
    callback(this)
    return this
  }
  _removeEventListeners() {
    this.root.removeEventListener('resize', this.state.updateBound)
    if (this._options.boundariesElement !== 'window' && this.state.scrollTarget) {
      this.state.scrollTarget.removeEventListener('scroll', this.state.updateBound)
      this.state.scrollTarget = null
    }
    this.state.updateBound = null
  }
  _setupEventListeners() {
    // NOTE: 1 DOM access here
    this.state.updateBound = this.update.bind(this)
    this.root.addEventListener('resize', this.state.updateBound)
    // if the boundariesElement is window we don't need to listen for the scroll event
    if (this._options.boundariesElement !== 'window') {
      let target: HTMLElement | Window = getScrollParent(this._reference)
      // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
      if (target === this.root.document.body || target === this.root.document.documentElement) {
        target = this.root
      }
      target.addEventListener('scroll', this.state.updateBound)
      this.state.scrollTarget = target
    }
  }
  update() {
    let data: ModifiersData = { instance: this, styles: {} }
    data.placement = this._options.placement
    data._originalPlacement = this._options.placement
    // compute the popper and reference offsets and put them inside data.offsets
    data.offsets = this._getOffsets(this._popper, this._reference, data.placement!)
    // get boundaries
    data.boundaries = this._getBoundaries(
      data,
      this._options.boundariesPadding!,
      this._options.boundariesElement!
    )
    data = this.runModifiers(data, this._options.modifiers!)

    if (typeof this.state.updateCallback === 'function') {
      this.state.updateCallback(data)
    }
  }
  /**
   * 用于获取将应用于popper的位置
   * @method
   * @memberof Popper
   * @param config {HTMLElement} popper element
   * @param reference {HTMLElement} reference element
   * @returns {String} position
   */
  _getPosition(popper: HTMLElement, reference: HTMLElement): PositionAttributes {
    if (this._options.forceAbsolute) {
      return 'absolute'
    }
    const isParentFixed = isFixed(reference)
    return isParentFixed ? 'fixed' : 'absolute'
  }
  _getOffsets(popper: HTMLElement, reference: HTMLElement, placement: string): RectOffsets {
    placement = placement.split('-')[0]
    const popperOffsets: ElementRect = {}
    popperOffsets.position! = this.state.position
    const isParentFixed = popperOffsets.position! === 'fixed'
    //
    // Get reference element position
    //
    const referenceOffsets: ElementRect = getOffsetRectRelativeToCustomParent(
      reference,
      getOffsetParent(popper),
      isParentFixed
    )
    const popperRect = getOuterSizes(popper)
    //
    //计算popper的偏移
    //
    //根据popper的位置，我们必须稍微不同地计算其偏移
    if (['right', 'left'].indexOf(placement) !== -1) {
      popperOffsets.top =
        referenceOffsets.top! + referenceOffsets.height! / 2 - popperRect.height / 2
      if (placement === 'left') {
        popperOffsets.left = referenceOffsets.left! - popperRect.width!
      } else {
        popperOffsets.left = referenceOffsets.right
      }
    } else {
      popperOffsets.left =
        referenceOffsets.left! + referenceOffsets.width! / 2 - popperRect.width / 2
      if (placement === 'top') {
        popperOffsets.top = referenceOffsets.top! - popperRect.height
      } else {
        popperOffsets.top = referenceOffsets.bottom
      }
    }

    // Add width and height to our offsets object
    popperOffsets.width = popperRect.width
    popperOffsets.height = popperRect.height

    return {
      popper: popperOffsets,
      reference: referenceOffsets
    }
  }
  _getBoundaries(
    data: Record<string, any>,
    padding: number,
    boundariesElement: string | HTMLElement
  ): ElementRect {
    // NOTE: 1 DOM access here
    let boundaries: ElementRect = {}
    let width, height
    if (boundariesElement === 'window') {
      const body = window.document.body,
        html = window.document.documentElement

      height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
      width = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      )

      boundaries = {
        top: 0,
        right: width,
        bottom: height,
        left: 0
      }
    } else if (boundariesElement === 'viewport') {
      const offsetParent = getOffsetParent(this._popper)
      const scrollParent = getScrollParent(this._popper)
      const offsetParentRect = getOffsetRect(offsetParent)

      // Thanks the fucking native API, `document.body.scrollTop` & `document.documentElement.scrollTop`
      const getScrollTopValue = function (element: HTMLElement) {
        return element == document.body
          ? Math.max(document.documentElement.scrollTop, document.body.scrollTop)
          : element.scrollTop
      }
      const getScrollLeftValue = function (element: HTMLElement) {
        return element == document.body
          ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
          : element.scrollLeft
      }

      // if the popper is fixed we don't have to substract scrolling from the boundaries
      const scrollTop =
        data.offsets.popper.position === 'fixed' ? 0 : getScrollTopValue(scrollParent)
      const scrollLeft =
        data.offsets.popper.position === 'fixed' ? 0 : getScrollLeftValue(scrollParent)

      boundaries = {
        top: 0 - (offsetParentRect.top! - scrollTop),
        right: window.document.documentElement.clientWidth - (offsetParentRect.left! - scrollLeft),
        bottom: window.document.documentElement.clientHeight - (offsetParentRect.top! - scrollTop),
        left: 0 - (offsetParentRect.left! - scrollLeft)
      }
    } else {
      if (getOffsetParent(this._popper) === boundariesElement) {
        boundaries = {
          top: 0,
          left: 0,
          right: boundariesElement.clientWidth,
          bottom: boundariesElement.clientHeight
        }
      } else {
        boundaries = getOffsetRect(boundariesElement as HTMLElement)
      }
    }
    boundaries.left! += padding
    boundaries.right! -= padding
    boundaries.top = boundaries.top! + padding
    boundaries.bottom = boundaries.bottom! - padding
    return boundaries
  }
  runModifiers(data: ModifiersData, modifiers: Modifiers[], ends?: Function): ModifiersData {
    let modifiersToRun = modifiers.slice()
    if (ends !== undefined) {
      modifiersToRun = this._options.modifiers!.slice(
        0,
        getArrayKeyIndex(this._options.modifiers!, ends)!
      )
    }
    const that = this
    modifiersToRun.forEach(
      function (modifier: Modifiers) {
        if (isFunction(modifier)) {
          data = (modifier as Function).call(that, data)
        }
      }.bind(that)
    )
    return data
  }
}
/**
 * 返回给定元素的偏移父级
 * @function
 * @ignore
 * @argument {HTMLElement} element
 * @returns {HTMLElement} offset parent
 */
function getOffsetParent(element: HTMLElement): HTMLElement {
  // NOTE: 1 DOM access here
  const offsetParent = element.offsetParent
  return offsetParent === window.document.body || !offsetParent
    ? (window.document.documentElement as HTMLElement)
    : (offsetParent as HTMLElement)
}
/**
 * 返回给定元素的滚动父级
 * @function
 * @ignore
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getScrollParent(element: HTMLElement): HTMLElement {
  const parent = element.parentNode
  if (!parent) {
    return element
  }
  if (parent === window.document) {
    // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
    // greater than 0 and return the proper element
    if (window.document.body.scrollTop || window.document.body.scrollLeft) {
      return window.document.body
    } else {
      return window.document.documentElement
    }
  }
  // Firefox want us to check `-x` and `-y` variations as well
  if (
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent as HTMLElement, 'overflow')) !==
      -1 ||
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent as HTMLElement, 'overflow-x')) !==
      -1 ||
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent as HTMLElement, 'overflow-y')) !== -1
  ) {
    //如果检测到的scrollParent是body，我们将对其parentNode执行额外检查
    //这样，如果浏览器是Chrome风格的，我们就会得到body，否则就是documentElement
    //修复问题#65
    return parent as HTMLElement
  }
  return getScrollParent(element.parentNode as HTMLElement)
}
/**
 * Get CSS computed property of the given element
 * @function
 * @ignore
 * @argument {Element} element
 * @argument {String} property
 */
function getStyleComputedProperty(element: HTMLElement, property: string): string {
  // NOTE: 1 DOM access here
  const css = window.getComputedStyle(element, null) as Record<string, any>
  return css[property] as string
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @function
 * @ignore
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element: HTMLElement): boolean {
  if (element === window.document.body) {
    return false
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true
  }
  return element.parentNode ? isFixed(element.parentNode as HTMLElement) : !!element
}

/**
 * 给popper设置样式
 * @function
 * @ignore
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
 */
function setStyle(element: HTMLElement, styles: StylesObject) {
  function is_numeric(n: number | string): boolean {
    return n !== '' && !isNaN(parseFloat(n as string)) && isFinite(n as number)
  }
  const oldStyles: string = element.getAttribute('style') || ''
  let newStyles = ''
  Object.keys(styles).forEach(function (prop) {
    let unit = ''
    // add unit if the value is numeric and is one of the following
    if (
      ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 &&
      is_numeric(styles[prop])
    ) {
      unit = 'px'
    }
    // element.setAttribute('style', styles == null ? '' : styles + `${prop}:${styles[prop] + unit}`)
    // element.style[prop] = styles[prop] + unit;
    newStyles += `${prop}:${styles[prop] + unit};`
    element.setAttribute('style', oldStyles + ';' + newStyles)
  })
}

/**
 * 给定一个元素及其父元素之一，返回偏移量
 * @function
 * @ignore
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @return {Object} rect
 */
function getOffsetRectRelativeToCustomParent(
  element: HTMLElement,
  parent: HTMLElement,
  fixed: boolean
): ElementRect {
  const elementRect = getBoundingClientRect(element)
  const parentRect = getBoundingClientRect(parent)
  if (fixed) {
    const scrollParent = getScrollParent(parent)
    parentRect.top! += scrollParent.scrollTop
    parentRect.bottom! += scrollParent.scrollTop
    parentRect.left! += scrollParent.scrollLeft
    parentRect.right! += scrollParent.scrollLeft
  }
  const rect = {
    top: elementRect.top! - parentRect.top!,
    left: elementRect.left! - parentRect.left!,
    bottom: elementRect.top! - parentRect.top! + elementRect.height!,
    right: elementRect.left! - parentRect.left! + elementRect.width!,
    width: elementRect.width,
    height: elementRect.height
  }
  return rect
}
/**
 * Get bounding client rect of given element
 * @function
 * @ignore
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element: HTMLElement): ElementRect {
  const rect = element.getBoundingClientRect()
  // whether the IE version is lower than 11
  const isIE = navigator.userAgent.indexOf('MSIE') != -1
  // fix ie document bounding top always 0 bug
  const rectTop = isIE && element.tagName === 'HTML' ? -element.scrollTop : rect.top

  return {
    left: rect.left,
    top: rectTop,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rectTop
  }
}

/**
 * 获取给定元素的外部大小（偏移大小+边距）
 * @function
 * @ignore
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element: HTMLElement): RectSize {
  // NOTE: 1 DOM access here
  const _display = element.style.display,
    _visibility = element.style.visibility
  element.style.display = 'block'
  element.style.visibility = 'hidden'
  // original method
  const styles = window.getComputedStyle(element)
  const x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)
  const y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight)
  const result = { width: element.offsetWidth + y, height: element.offsetHeight + x }

  // reset element styles
  element.style.display = _display
  element.style.visibility = _visibility
  return result
}

/**
 * 获取给定元素相对于其偏移父元素的位置
 * @function
 * @ignore
 * @param {Element} element
 * @return {Object} position - Coordinates of the element and its `scrollTop`
 */
function getOffsetRect(element: HTMLElement): ElementRect {
  const elementRect: ElementRect = {
    width: element.offsetWidth,
    height: element.offsetHeight,
    left: element.offsetLeft,
    top: element.offsetTop
  }
  elementRect.right = elementRect.left! + elementRect.width!
  elementRect.bottom = elementRect.top! + elementRect.height!
  // position
  return elementRect
}

/**
 * 给定一个数组和要查找的键，返回其索引
 * @function
 * @ignore
 * @argument {Array} arr
 * @argument keyToFind
 * @returns index or null
 */
function getArrayKeyIndex(arr: Modifiers[], keyToFind: any) {
  let i = 0,
    key
  for (key in arr) {
    if (arr[key] === keyToFind) {
      return i
    }
    i++
  }
  return null
}

function isFunction(functionToCheck: any): boolean {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

/**
 * 获取前缀模式的的属性名称
 * @function
 * @ignore
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase)
 */
function getSupportedPropertyName(property: string) {
  const prefixes = ['', 'ms', 'webkit', 'moz', 'o']

  for (let i = 0; i < prefixes.length; i++) {
    const toCheck = prefixes[i]
      ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1)
      : property
    if (typeof window.document.body.style[toCheck as keyof CSSStyleDeclaration] !== 'undefined') {
      return toCheck
    }
  }
  return null
}

/**
 * Given the popper offsets, generate an output similar to getBoundingClientRect
 * @function
 * @ignore
 * @argument {Object} popperOffsets
 * @returns {Object} ClientRect like output
 */
function getPopperClientRect(popperOffsets: Record<string, any>): ElementRect {
  const offsets = Object.assign({}, popperOffsets)
  offsets.right = offsets.left + offsets.width
  offsets.bottom = offsets.top + offsets.height
  return offsets
}

/**
 * Get the opposite placement of the given one/
 * @function
 * @ignore
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement: string) {
  const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched as keyof typeof hash]
  })
}
