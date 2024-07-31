---
PopConfirm
---

<script setup>
import { ref } from 'vue'
</script>

## PopConfirm 问答泡

### 演示

<preview path="./demos/pop-confirm/pop-confirm-demo1.vue" title="使用方式：" description="popConfirm的使用可以用传统插槽方式和虚拟元素触发"></preview>

<preview path="./demos/pop-confirm/pop-confirm-demo2.vue" title="自定义内容：" description="传入content插槽，自定义内容,title:自定义标题"></preview>

### popConfirm 参数描述

| 参数        |       描述       |    类型 | 可选值 |          默认值 |
| ----------- | :--------------: | ------: | -----: | --------------: |
| title       |       标题       |  string |      - |               - |
| content     |       内容       |  string |      - |               - |
| confirmText |   确定按钮文案   |  String |      - |               - |
| cancelText  |   取消按钮文案   |  String |      - |               - |
| icon        |   自定义 icon    |  String |      - | cl-icon-warning |
| iconColor   | 自定义 icon 颜色 |  String |      - |         #FE352D |
| hideIcon    |    隐藏 icon     | Boolean |      - |           false |
| hideClose   |   隐藏关闭按钮   | Boolean |      - |           false |
| hideConfirm |   隐藏确定按钮   | Boolean |      - |           false |
| hideCancel  |   隐藏取消按钮   | Boolean |      - |           false |

如下参数：参考 popup

| 参数                       |                  描述                  |                                                    类型 |             可选值 |     默认值 |
| -------------------------- | :------------------------------------: | ------------------------------------------------------: | -----------------: | ---------: |
| v-model / modelValue       |            默认状态是否可见            |                                                 Boolean |                  - |      false |
| disabled                   |              pop 是否可用              |                                                 Boolean |                  - |      false |
| trigger                    |                触发方式                |                                                  String | click hover manual |      click |
| placement                  |                出现位置                |                                                  String |                  - | top-center |
| preRender                  |             是否需要预渲染             |                                                 Boolean |                  - |      false |
| enterable                  |          鼠标是否可进入到泡中          |                                                 Boolean |                  - |       true |
| popupClass                 |            自定义 pop 样式             |                                                  String |                  - |          - |
| offset                     |             泡偏移量（px）             |                                                  Number |                  - |          0 |
| visibleArrow               |              是否显示箭头              |                                                 Boolean |                  - |       true |
| arrowOffset                |                箭头偏移                |                                                  Number |                  - |          0 |
| openDelay                  |         延迟出现（hover 触发)          |                                                  Number |                  - |     100 ms |
| closeDelay                 |         延迟隐藏（hover 触发)          |                                                  Number |                  - |     100 ms |
| virtualRef                 |             虚拟触发的元素             | ComponentPublicInstance\<HTMLElement\>\|\<HTMLElement\> |                  - |          - |
| outsideAutoCloseWithManual | 手动触发模式下，是否点击内容外自动关闭 |                                                 boolean |                  - |      false |

### popConfirm 插槽

| 参数      |            描述             |
| --------- | :-------------------------: |
| title     |            标题             |
| content   |            内容             |
| footer    |           操作区            |
| reference | 触发 popConfirm 显示的 元素 |

### popConfirm 事件

| 事件名称 |        描述        | 回调参数 |
| -------- | :----------------: | -------: |
| confirm  | 点击确认按钮时触发 |        - |
| cancel   | 点击取消按钮时触发 |        - |
