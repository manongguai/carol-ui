<script setup>
import { ref } from 'vue'
</script>

## Notification

悬浮出现在页面角落，显示全局的通知提醒消息。

## 演示

<preview path="./demos/notification/notification-demo1.vue" title="基本用法" description="通知内容message支持string和render函数"></preview>
<preview path="./demos/notification/notification-demo2.vue" title="是否自动关闭" description="duration为0则是默认不关闭"></preview>
<preview path="./demos/notification/notification-demo3.vue" title="带有倾向性" description="带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息"></preview>
<preview path="./demos/notification/notification-demo4.vue" title="自定义弹出位置" description="可以让 Notification 从屏幕四角中的任意一角弹出"></preview>
<preview path="./demos/notification/notification-demo5.vue" title="自定义底部 | 自定义icon" description="底部可以自定义例如去跳转｜可直接送进来icon属性"></preview>

## <font color=FF0000> warning！！！ </font>

`message` `footerInfo` 属性虽然支持传入 HTML/JSX，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在使用的情况下，请确保 `message` `footerInfo` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` `footerInfo` 属性。

## API

Notification Props
| 名称 | 类型 | 默认值 | 可选值 | 描述 |
| ------------- | :----------- | :---- | :----------- | :----------- |
| customClass | string | | | 自定义组件名 |  
| id | string | | | 自定义组件ID |
| dangerouslyUseHTMLString | boolean |false | true/false| 是否支持传入HTML片段） |
| duration | number | 3000 | | 关闭弹窗的时间，0则不自动关闭 |
| type | string | | success error info warning| 带有倾向性的弹窗 |
| icon属性 | string | | | 自定义的icon |
| title | string | | | title |
| message | string vnode | | | content |
| footerInfo | string vnode | | | footer |
| position | string | top-right | 'top-right', 'top-left', 'bottom-right', 'bottom-left'| 弹出的方位 |
| offset | number | | | 距离position的边距 |
| showClose | boolean |true | | 是否展示关闭按钮 |
| z-index | number |2000 | |可自动设置层级 |
| contentHeight | number | | |内容区域的高度 超过滚动 |
| onClose | Function | | |关闭时的回调函数 |
| beforeClose | Function | | |关闭前的回调函数 |

Notification 方法
| 名称 | 详情 | 类型 |
| ------------- | :----------- | :---- |
| close | 关闭当前的notification | function |
| closeAll | 关闭所有的notification | function |
