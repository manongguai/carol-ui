---
Button
---

<script setup>
import { ref } from 'vue'
</script>

## drawer 抽屉

<preview path="./demos/drawer/drawer-demo1.vue" title="不同方向" description="抽屉弹出的方式分为 左  上  右  下四种方式，默认是从右侧弹出。"></preview>
<preview path="./demos/drawer/drawer-demo2.vue" title="设置抽屉的宽高" description="width / height / size 的区别"></preview>
<preview path="./demos/drawer/drawer-demo3.vue" title="可拖拽" description=""></preview>
<preview path="./demos/drawer/drawer-demo4.vue" title="多层嵌套的抽屉" description=""></preview>
<preview path="./demos/drawer/drawer-demo5.vue" title="在容器内部打开抽屉" description=""></preview>
<preview path="./demos/drawer/drawer-demo6.vue" title="" description="props.title 和 slots.header 同时存在时，slot优先级更高"></preview>
<preview path="./demos/drawer/drawer-demo7.vue" title="自定义内容" description=""></preview>
<preview path="./demos/drawer/drawer-demo8.vue" title="自定义内容" description="使用自定义样式覆盖原有的样式"></preview>

## API

drawer Props
| 名称 | 类型 | 默认值 | 描述 |
| ------------ | :---------------------------- | :-------- | ------------------------------------------------------------------- |
| show | boolean | false | 控制抽屉的打开 |
| placement | `left` `right` `top` `bottom` | `right` | 抽屉从哪个方向弹出 |
| width | string / number | - | 抽屉的宽度 |
| height | string / number | - | 抽屉的高度 |
| size | `default` `large` | `default` | 抽屉的宽度或者高度， 具体见示例 2 |
| zIndex | number | - | 抽屉的层级 |
| blockScroll | boolean | true | 抽屉打开时是否锁定页面的滚动 |
| resizable | boolean | false | 抽屉是否可以拖动其边缘改变其宽高 |
| to | string / HTMLElement | body | 抽屉放置的位置 |
| showMask | boolean | true | 显示遮罩层 |
| maskClosable | boolean | true | 点击遮罩关闭抽屉 |
| onMaskClick | (e: MouseEvent) => void | - | 点击遮罩关闭弹窗后的回调函数 |
| drawerStyle | string / object | - | 抽屉的样式 |
| drawerClass | string | - | 抽屉样式类名 |
| onAfterEnter | () => void | - | 抽屉打开后调用的回调函数 |
| onAfterLeave | () => void | - | 抽屉关闭后调用的回调函数 |
| title | string | - | 抽屉的标题，如果抽屉同时设置了 title 和 slots.header，以 title 优先 |
| closable | boolean | true | 是否显示标题栏的 closeIcon |
| headerStyle | string / object | - | 抽屉 Header 部分的样式 |
| bodyStyle | string / object | - | 抽屉 body 部分的样式 |
| footerStyle | string / object | - | 抽屉 footer 部分的样式 |

### slots

| name       |                  描述                   |
| ---------- | :-------------------------------------: |
| header     | 自定义抽屉 header 部分，包含 close icon |
| close-icon |             自定义关闭按钮              |
| footer     |         自定义抽屉 footer 部分          |
| 默认插槽   |          自定义抽屉 body 部分           |

### dialog Events

| 事件          |         描述         |               回调参数 |
| ------------- | :------------------: | ---------------------: |
| update:show   | 抽屉的状态更新时触发 |           更新后的状态 |
| update:width  |  抽屉宽度更新时触发  | 更新后的宽度，没有单位 |
| update:height |  抽屉高度更新时触发  | 更新后的高度，没有单位 |
