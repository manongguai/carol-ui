## InputNumber

input-number用来做金额/比例的增长输入框

### 演示

<preview path="./demos/input-number/input-number-demo1.vue" title="" description=""></preview>
<preview path="./demos/input-number/input-number-demo2.vue" title="" description=""></preview>
<preview path="./demos/input-number/input-number-demo3.vue" title="" description=""></preview>

### input props

| 名称        |  类型   |                       默认值 |               可选值 |                   描述 |
| ----------- | :-----: | ---------------------------: | -------------------: | ---------------------: |
| v-model     | string  |                            - |                    - |
| min         | number  |                     Infinity |                    - | 设置计数器允许的最小值 |
| max         | number  |                     Infinity |                    - | 设置计数器允许的最大值 |
| step        | number  |                            - |                      |             计数器步长 |
| placeholder | string  |                       请输入 |                    - |         输入框占位文本 |
| clearable   | boolean |                         true |                    - |             是否可清空 |
| disabled    | boolean |                        false |                    - |                   禁用 |
| readonly    | boolean |                        false |                    - |                   只读 |
| precision   | number  |                            - |                    - |               数值精度 |
| layout      | string  |                         true | between, right, none |           控制按钮位置 |
| inputWidth  | number  |                          240 |                    - |            input的宽度 |
| size        | string  | 'small'｜ 'medium'｜ 'large' |             'medium' |         输入框尺寸变化 |

### Events 参数描述

| 事件   |                    描述                     | 回调参数       |
| ------ | :-----------------------------------------: | -------------- |
| blur   |           在 Input 失去焦点时触发           | (event: Event) |
| focus  |           在 Input 获得焦点时触发           | (event: Event) |
| change |   仅在输入框失去焦点或用户按下回车时触发    | (value: string | number) |
| input  |            在 Input 值改变时触发            | (value: string | number) |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发 | -              |

### Methods 参数描述

| 事件  |       描述        | 回调参数 |
| ----- | :---------------: | -------: |
| focus | 使 input 获取焦点 |        - |
| blur  | 使 input 失去焦点 |        - |
