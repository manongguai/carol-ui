---
Popup
---

<script setup>
import { ref } from 'vue'
</script>

## Popup 弹出泡

用于包裹页面内容

- 请注意：popup 的 reference 插槽只能有一个根节点，否则只渲染第一个节点

### 演示

<preview path="./demos/popup/popup-demo1.vue" title="使用方式：" description="popup的使用可以用传统插槽方式和虚拟元素触发"></preview>

<preview path="./demos/popup/popup-demo2.vue" title="主题" description="属性 effect：dark、light；默认是 light"></preview>

<!-- <preview path="./demos/popup/popup-demo3.vue" title="不同方向弹出" description="属性 placement=`方向-对齐`。方向：top、left、right、bottom；是弹出泡出现在目标元素的哪边
对齐：start、 center、 end；是弹出泡与目标元素相邻边的对齐方式"></preview> -->

<preview path="./demos/popup/popup-demo3.vue" title="不同方向弹出" description="方向：top、left、right、bottom；是弹出泡出现在目标元素的哪边对齐：start、 center、 end；"></preview>

<preview path="./demos/popup/popup-demo4.vue" title="超出截断" description="txtOverLine：最大行数，默认值 0 不限制超出，若设置，则超出才显示 popup，不超出不显示；"></preview>

<preview path="./demos/popup/popup-demo5.vue" title="触发方式" description="提供三种触发方式：hover、click、manual,manual由开发者自行控制pop显示隐藏状态,结合v-model使用,组件内部不提供事件"></preview>

<preview path="./demos/popup/popup-demo6.vue" title="延迟时间" description="trigger：hover 模式提供两种延迟，延迟出现 openDelay、延迟隐藏 closeDelay；默认 100ms。openDelay:0 立即出现（注意这会在 reference 多且密时，只要你稍稍动动鼠标，就会满屏的泡，closeDelay:0 立即隐藏（注意需要预留用户鼠标移入弹出泡的时间，除非你不需要 enterable）"></preview>

<preview path="./demos/popup/popup-demo7.vue" title="偏移" description="offset 设置泡在上下左右四个方向上的偏移，可以为负值。默认单位：px，不支持 vh、vw、%，popup 上方弹出，left 值减 offset；popup 下方弹出，left 值加 offset；popup 左侧弹出，top 值减 offset；popup 右侧弹出，top 值加 offset；"></preview>

<preview path="./demos/popup/popup-demo8.vue" title="箭头设置" description="visible-arrow 设置显示隐藏箭头；arrow-offset 设置箭头的位置，默认值 0，单位px；【不设置值】箭头始终显示在中间，优先显示在 reference 元素中间，其次是泡中间。设置值】任何情况下都显示在设置的位置。设置的值超出极限，会显示为【不设置值】的效果"></preview>

<preview path="./demos/popup/popup-demo9.vue" title="初始状态" description="v-model / value：可以设置 pop 初始是否显示。默认隐藏，不创建pop，disabled：是否不能激活弹出信息"></preview>

### input 参数描述

| 参数                       |                  描述                  |                                                     类型 |             可选值 |     默认值 |
| -------------------------- | :------------------------------------: | -------------------------------------------------------: | -----------------: | ---------: |
| v-model / value            |            默认状态是否可见            |                                                  Boolean |                  - |      false |
| disabled                   |              pop 是否可用              |                                                  Boolean |                  - |      false |
| effect                     |                  主题                  |                                                   String |         dark light |       dark |
| trigger                    |                触发方式                |                                                   String | click hover manual |      hover |
| placement                  |                出现位置                |                                                   String |                  - | top-center |
| content                    |                  内容                  |                                                   string |                  - |          - |
| txtOverLine                |              超出最大行数              |                                                   Number |                  - |          0 |
| preRender                  |             是否需要预渲染             |                                                  Boolean |                  - |      false |
| enterable                  |          鼠标是否可进入到泡中          |                                                  Boolean |                  - |       true |
| popupClass                 |            自定义 pop 样式             |                                                   String |                  - |          - |
| offset                     |             泡偏移量（px）             |                                                   Number |                  - |          0 |
| visibleArrow               |              是否显示箭头              |                                                  Boolean |                  - |       true |
| arrowOffset                |                箭头偏移                |                                                   Number |                  - |          0 |
| openDelay                  |         延迟出现（hover 触发)          |                                                   Number |                  - |     100 ms |
| closeDelay                 |         延迟隐藏（hover 触发)          |                                                   Number |                  - |     100 ms |
| animated                   |                淡入动画                |                                                  Boolean |                  - |       true |
| virtualRef                 |             虚拟触发的元素             | ComponentPublicInstance\<HTMLElement\>\| \<HTMLElement\> |                  - |       null |
| outsideAutoCloseWithManual | 手动触发模式下，是否点击内容外自动关闭 |                                                  boolean |                  - |      false |

### popup 插槽

| 参数      |                                          描述                                          |
| --------- | :------------------------------------------------------------------------------------: |
| content   |                                          内容                                          |
| reference | 触发 popup 显示的 元素 ，popup 的 reference 插槽只能有一个根节点，否则只渲染第一个节点 |
