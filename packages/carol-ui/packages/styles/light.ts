import { rgba, composite, scaleColor } from 'seemly'
import commonVariables from './common'

const base = {
  neutralBase: '#FFF',
  neutralInvertBase: '#000',
  neutralTextBase: '#000',
  neutralInvertTextBase: '#fff',
  neutralPopover: '#fff',
  neutralCard: '#fff',
  neutralModal: '#fff',
  neutralBody: '#fff',

  alpha1: '0.82',
  alpha2: '0.72',
  alpha3: '0.38',
  alpha4: '0.24', // disabled text, placeholder, icon
  alpha5: '0.18', // disabled placeholder

  alphaClose: '0.6',

  alphaDisabled: '0.5',
  alphaDisabledInput: '0.02',
  alphaPending: '0.05',
  alphaTablePending: '0.02',
  alphaPressed: '0.07',

  alphaAvatar: '0.2',
  alphaRail: '0.14',
  alphaProgressRail: '.08',
  alphaBorder: '0.12',
  alphaDivider: '0.06',
  alphaInput: '0',
  alphaAction: '0.02',
  alphaTab: '0.04',
  alphaScrollbar: '0.25',
  alphaScrollbarHover: '0.4',
  alphaCode: '0.05',
  alphaTag: '0.02',

  // primary
  primaryDefault: '#138aff',
  primaryHover: '#4d96ff',

  //secondary
  secondaryDefault: '#f2f9ff',
  secondaryHover: '#f7fBff',

  // minor
  minorDefault: '#007aff',

  // info
  infoHover: '#4098fc',
  infoDefault: '#2080f0',
  infoActive: '#1060c9',
  infoSuppl: '#4098fc',

  // error
  errorHover: '#de576d',
  errorDefault: '#d03050',
  errorActive: '#ab1f3f',
  errorSuppl: '#de576d',

  // Scence: warning / info
  // warning
  warningColor: '#f74949',
  warningColorHover: '#f96D6D',
  warningColor2: '#fee4e4',
  warningColorHover2: '#feecec',

  // info
  infoColor: '#54607c',
  infoColorHover: '#4d96ff',

  // success
  successHover: '#36ad6a',
  successDefault: '#18a058',
  successActive: '#0c7a43',
  successSuppl: '#36ad6a'
}

const baseBackgroundRgb = rgba(base.neutralBase)
const baseInvertBackgroundRgb = rgba(base.neutralInvertBase)
const overlayPrefix = 'rgba(' + baseInvertBackgroundRgb.slice(0, 3).join(', ') + ', '
function overlay(alpha: string | number) {
  return overlayPrefix + String(alpha) + ')'
}
function neutral(alpha: string | number) {
  const overlayRgba = Array.from(baseInvertBackgroundRgb)
  overlayRgba[3] = Number(alpha)
  return composite(baseBackgroundRgb, overlayRgba as [number, number, number, number])
}
const derived = {
  name: 'common' as const,

  ...commonVariables,

  baseColor: base.neutralBase,

  // primary color
  primaryColor: base.primaryDefault,
  primaryColorHover: base.primaryHover,

  //secondary hover
  secondaryColor: base.secondaryDefault,
  secondaryColorHover: base.secondaryHover,

  // Minor color
  minorColor: base.minorDefault,

  // info color
  infoColor: base.infoDefault,
  infoColorHover: base.infoHover,
  infoColorPressed: base.infoActive,
  infoColorSuppl: base.infoSuppl,
  // success color
  successColor: base.successDefault,
  successColorHover: base.successHover,
  successColorPressed: base.successActive,
  successColorSuppl: base.successSuppl,

  // scene
  // warning color
  warningColor: base.warningColor,
  warningColorHover: base.warningColorHover,
  warningColor2: base.warningColor2,
  warningColorHover2: base.warningColorHover2,

  // error color
  errorColor: base.errorDefault,
  errorColorHover: base.errorHover,
  errorColorPressed: base.errorActive,
  errorColorSuppl: base.errorSuppl,

  // text color
  textColorBase: base.neutralTextBase,
  textColorInvert: base.neutralInvertTextBase,
  textColor1: 'rgb(34, 43, 60)', //Text T1: #222B3C
  textColor2: 'rgb(81, 86, 101)', //Title T3: #515665
  textColor3: 'rgb(84, 96, 124)', //Tips T4: #54607C
  textColor4: 'rgb(151, 153, 156)', //Input tips T5: #97999C

  //   textColorDisabled: neutral(base.alpha4),
  textColorDisabled: 'rgb(181, 184, 191)', //Text disabled T6: #B5B8BF
  borderColorDisabled: 'rgb(181, 184, 191)', //Text disabled T6: #B5B8BF
  backgroundColorDisabled: 'rgb(181, 184, 191)', //Text disabled T6: #B5B8BF

  //   placeholderColor: neutral(base.alpha4),
  //   placeholderColorDisabled: neutral(base.alpha5),
  //   iconColor: neutral(base.alpha4),
  //   iconColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
  //   iconColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),
  //   iconColorDisabled: neutral(base.alpha5),

  //   opacity1: base.alpha1,
  //   opacity2: base.alpha2,
  //   opacity3: base.alpha3,
  //   opacity4: base.alpha4,
  //   opacity5: base.alpha5,

  dividerColor1: 'rgb(171, 183, 194)', //L1: #ABB7C2
  dividerColor2: 'rgb(212, 215, 220)', //L2: #D4D7DC
  dividerColor3: 'rgb(238, 238, 238)', //L3: #EEEEEE
  borderColor: 'rgb(212, 215, 220)', //L2: #D4D7DC

  // secondary button color
  // buttonColor2: 'rgba(46, 51, 56, .05)',
  // buttonColor2Hover: 'rgba(46, 51, 56, .09)',
  // buttonColor2Pressed: 'rgba(46, 51, 56, .13)',

  //bg
  bgColor1: 'rgb(247, 248, 250)', //BG1: #F7F8FA
  bgColor2: 'rgb(240, 242, 245)', //BG2: #F0F2F5
  bgColor3: 'rgb(240, 243, 250)', //BG3: #F0F3FA
  bgColor4: 'rgb(232, 238, 244)', //BG4: #E8EEF4
  bmColor1: 'rgb(244, 248, 255)', //BM1: #F4F8FF
  bmColor2: 'rgb(250, 251, 253)', //BM2: #FAFBFD

  // close
  //   closeIconColor: neutral(Number(base.alphaClose)),
  //   closeIconColorHover: neutral(Number(base.alphaClose)),
  //   closeIconColorPressed: neutral(Number(base.alphaClose)),
  //   closeColorHover: 'rgba(0, 0, 0, .09)',
  //   closeColorPressed: 'rgba(0, 0, 0, .13)',

  //   // clear
  //   clearColor: neutral(base.alpha4),
  //   clearColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
  //   clearColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),

  //   scrollbarColor: overlay(base.alphaScrollbar),
  //   scrollbarColorHover: overlay(base.alphaScrollbarHover),
  //   scrollbarWidth: '5px',
  //   scrollbarHeight: '5px',
  //   scrollbarBorderRadius: '5px',

  //   progressRailColor: neutral(base.alphaProgressRail),
  //   railColor: 'rgb(219, 219, 223)',

  //   popoverColor: base.neutralPopover,
  //   tableColor: base.neutralCard,
  //   cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  //   bodyColor: base.neutralBody,
  //   tagColor: '#eee',
  //   avatarColor: neutral(base.alphaAvatar),
  //   invertedColor: 'rgb(0, 20, 40)',

  //   inputColor: neutral(base.alphaInput),
  //   codeColor: 'rgb(244, 244, 248)',
  //   tabColor: 'rgb(247, 247, 250)',
  //   actionColor: 'rgb(250, 250, 252)',
  //   tableHeaderColor: 'rgb(250, 250, 252)',

  //   hoverColor: 'rgb(243, 243, 245)',
  //   // use color with alpha since it can be nested with header filter & sorter effect
  //   tableColorHover: 'rgba(0, 0, 100, 0.03)',
  //   tableColorStriped: 'rgba(0, 0, 100, 0.02)',
  //   pressedColor: 'rgb(237, 237, 239)',

  //   opacityDisabled: base.alphaDisabled,
  //   inputColorDisabled: 'rgb(250, 250, 252)',

  boxShadow1:
    '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
  boxShadow2:
    '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
  boxShadow3:
    '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)'
}

export default derived
export type ThemeCommonVars = typeof derived
