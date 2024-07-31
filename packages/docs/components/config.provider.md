---
Config Provider
---

<script setup>
import { ref } from 'vue'
</script>

## 配置器

用来配置主题，样式覆盖，等全局的配置。

## 演示

<preview path="./demos/config-provider/config-provider-demo1.vue" title="样式覆盖" description="覆盖原始的样式, 允许多层嵌套"></preview>

## API

Config Provider Props
| 名称 | 类型 | 默认值 | 描述 |
| ------------- | :----------- | :---- | ---- |
| theme | Object | lightTheme | 默认的Theme 主题，可以使用其他系统提供的theme主题类型 |
| themeOverrides | Object | | 覆盖现有的主题内可以改变的部分 |
