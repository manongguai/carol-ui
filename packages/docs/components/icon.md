<script setup>
import { ref } from 'vue'
</script>

## Icon

系统支持使用symbol的方式对icon做引用， 推荐使用 xicons 作为图标库。

## 系统图标

<preview path="./demos/icon/icon-demo1.vue" title="图标" description="引用各种iconfont图标"></preview>

## xicons库图标

<preview path="./demos/icon/icon-demo2.vue" title="图标" description="引用各种iconfont图标"></preview>

## API

Icon Props
| 名称 | 类型 | 默认值 | 描述 |
| ------------- | :----------- | :---- | ---- |
| icon属性 | string | | icon的名字
| color | string | | 自定义icon的颜色（支持形如 #FFF， #FFFFFF， yellow，rgb(0, 0, 0) 的颜色） |
