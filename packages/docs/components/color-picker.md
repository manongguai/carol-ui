---
ColorPicker
---

## ColorPicker 颜色选择器

### 演示

<preview path="./demos/color-picker/color-picker-demo1.vue" title="使用方式：" description="使用v-model绑定色值，目前只支持HEX格式颜色"></preview>

### 参数说明

| 参数            |                         说明                         |     类型 |           可选值 |  默认值 |
| --------------- | :--------------------------------------------------: | -------: | ---------------: | ------: |
| modelValue      |                        默认值                        |   string |                - |         |
| disabled        |                       是否禁用                       |     bool |                - |   false |
| size            |                         尺寸                         |   string | default \| small | default |
| popperClass     |                      弹出泡类名                      |   string |                - |       - |
| predefine       |                       预置色置                       | string[] |                - |      [] |
| showResetButton |                   是否展示重置按钮                   |     bool |                - |    true |
| showColorInput  |                    是否展示输入框                    |     bool |                - |    true |
| showColorIcon   |                     是否展示icon                     |     bool |                - |    true |
| resetColor      | 重置色，点击重置按钮设为的颜色，默认是初始绑定的颜色 |     bool |                - |    true |

### 事件

| 参数   |     说明     |
| ------ | :----------: |
| change |   色值变化   |
| reset  | 点击重置按钮 |
