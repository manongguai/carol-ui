---
Button
---

<script setup>
import { ref } from 'vue'
</script>

### Button 按钮

按钮用来触发一些操作

#### 演示

<preview path="./demos/button/button-demo1.vue" title="基础" description="按钮的 type 分为 default, primary, secondary, minor, dashed, link, text, underlined。"></preview>

<preview path="./demos/button/button-demo2.vue" title="尺寸" description="按钮的 size 分为 small, medium(default), large。"></preview>

<preview path="./demos/button/button-demo3.vue" title="按钮组" description="水平按钮组"></preview>

<preview path="./demos/button/button-demo4.vue" title="场景" description="按钮的scene分为 default, info, warning"></preview>

<preview path="./demos/button/button-demo5.vue" title="加载" description="Loading"></preview>

<preview path="./demos/button/button-demo6.vue" title="自定义颜色, 块级按钮, 圆形按钮" description="Color, TextColor, block, round"></preview>

### API

Button Props
| 名称 | 类型 | 默认值 | 说明 |
| ------------- | :----------- | :---- | ---- |
| type | 'default'｜'primary'｜ 'secondary'｜ 'minor'｜ 'dashed'｜ 'link'｜ 'text'｜ 'underlined' | 'default'， 按钮默认的属性 | 按钮类型 |
| size | 'small'｜ 'medium'｜ 'large' | 'medium' | 按钮高度变化 |
| scene | 'normal'｜ 'info'｜ 'warning' | 'normal' | 按钮使用场景, 改变按钮颜色,红色. warning 影响到secondary, minor, text, link, underline; info 仅影响到text, link, underline |
| color | string | | 指定按钮颜色（支持形如 #FFF， #FFFFFF， yellow，rgb(0, 0, 0) 的颜色） |
| textColor | string | | 按钮文字颜色（支持形如 #FFF， #FFFFFF， yellow，rgb(0, 0, 0) 的颜色）|
| loading | boolean | false | 按钮是否显示加载状态 |
| disabled | boolean | false | 按钮是否禁用 |
| round | boolean | false | 按钮是否显示圆角 |
| icon | string | | 按钮上的icon名称, iconfont |
| iconColor | string | | 按钮上的icon的填充颜色 |

ButtonGroup Props
| 名称 | 类型 | 默认值 | 说明 |
| ------------- | :----------- | :---- | ---- |
| size | 'small'｜ 'medium'｜ 'large' | 'medium' | 按钮高度变化 |

Button Slots
| 名称 | 参数 | 说明 |
| ------------- | :----------- | ---- |
| default | () | 按钮内容 |

Button Group Slots
| 名称 | 参数 | 说明 |
| ------------- | :----------- | ---- |
| default | () | 按钮组内容 |

Button Event
| 名称 | 参数 | 说明 |
| ------------- | :----------- | ---- |
| click | | 按钮点击事件 |
