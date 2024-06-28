---
Title
---

<script setup>
import { ref } from 'vue'
</script>
<style>
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>

### Title 标题

一个面板、页面的标题，可搭配cl-panel组件一起使用

#### 演示

<preview path="./demos/title/title-demo2.vue" title="横向标题" description=" mode 参数为 col"></preview>
<preview path="./demos/title/title-demo1.vue" title="纵向标题" description="mode 参数为 row"></preview>

### API

Title Props
| 名称 | 说明 | 类型 | 默认值 |
| -------------|:-------------:| -----:| -----:|
| mode | 标题模式，横向、纵向。col,row | string | col |
| title | 标题文本 | string | - |
