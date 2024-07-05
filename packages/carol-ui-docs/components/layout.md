---
Layout
---

通过基础的 24 分栏，迅速简便地创建布局。

:::tip

组件默认使用 Flex 布局，不需要手动设置 type="flex"。

请注意父容器避免使用 inline 相关样式，会导致组件宽度不能撑满。

:::

## 基础布局

<preview path="./demos/layout/basic-layout.vue" title="使用列创建基础网格布局。" description="通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。"></preview>

## 分栏间隔

<preview path="./demos/layout/column-spacing.vue" title="支持列间距。" description="行提供 gutter 属性来指定列之间的间距，其默认值为0。"></preview>

## 混合布局

<preview path="./demos/layout/column-offset.vue" title="" description="通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。"></preview>

## 列偏移

<preview path="./demos/layout/column-offset.vue" title="您可以指定列偏移量。" description="通过制定 col 组件的 offset 属性可以指定分栏偏移的栏数。"></preview>

## 对齐方式

<preview path="./demos/layout/alignment.vue" title="默认使用 flex 布局来对分栏进行灵活的对齐。" description="您可以通过justify 属性来定义子元素的排版方式，其取值为start、center、end、space-between、space-around或space-evenly。"></preview>

## 响应式布局

<preview path="./demos/layout/responsive-layout.vue" title="参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。" description=""></preview>

## Row API

### Row 属性

| Name    | Description               | Type                                                                                       | Default |
| ------- | ------------------------- | ------------------------------------------------------------------------------------------ | ------- |
| gutter  | 栅格间隔                  | number                                                                                     | 0       |
| justify | flex 布局下的水平排列方式 | enum `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | start   |
| align   | flex 布局下的垂直排列方式 | enum `'top' \| 'middle' \| 'bottom'`                                                       | —       |
| tag     | 自定义元素标签            | string                                                                                     | div     |

### Row 插槽

| Name    | Description    | Subtags |
| ------- | -------------- | ------- |
| default | 自定义默认内容 | Col     |

## Col API

### Col 属性

| Name   | Description                            | Type                                                                             | Default |
| ------ | -------------------------------------- | -------------------------------------------------------------------------------- | ------- |
| span   | 栅格占据的列数                         | number                                                                           | 24      |
| offset | 栅格左侧的间隔格数                     | number                                                                           | 0       |
| push   | 栅格向右移动格数                       | number                                                                           | 0       |
| pull   | 栅格向左移动格数                       | number                                                                           | 0       |
| xs     | `<768px` 响应式栅格数或者栅格属性对象  | number / object `{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| sm     | `≥768px` 响应式栅格数或者栅格属性对象  | number / object `{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| md     | `≥992px` 响应式栅格数或者栅格属性对象  | number / object `{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| lg     | `≥1200px` 响应式栅格数或者栅格属性对象 | number / object `{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| xl     | `≥1920px` 响应式栅格数或者栅格属性对象 | number / object `{span?: number, offset?: number, pull?: number, push?: number}` | —       |
| tag    | custom element tag                     | string                                                                           | div     |

### Col 插槽

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |

<style lang="scss">
@use './demos/layout/index.scss';
</style>
