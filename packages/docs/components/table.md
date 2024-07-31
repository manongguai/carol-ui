# Table 

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

::: warning
全力开发中
:::

## 基础表格

<preview path="./demos/table/basic-table.vue" title="基础的表格展示用法。" description="当 cl-table 元素中注入 data 对象数组后，在 cl-table-column 中用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名。 可以使用 width 属性来定义列宽。"></preview>



## 带斑马纹表格

<preview path="./demos/table/stripe-table.vue" title="使用带斑马纹的表格，可以更容易区分出不同行的数据。" description="stripe 可以创建带斑马纹的表格。 如果 true, 表格将会带有斑马纹。"></preview>



## 超出滚动

<preview path="./demos/table/scroll-table.vue" title="使用带斑马纹的表格，可以更容易区分出不同行的数据。" description="stripe 可以创建带斑马纹的表格。 如果 true, 表格将会带有斑马纹。"></preview>


## Table API

## Table Attributes

| 属性              | 描述           | 类型            | 默认值    |
| ----------------- | -------------- | --------------- | --------- |
| data              | 表格数据       | array           | []        |
| tableLayout       | 表格布局       | string          | fixed     |
| showHeader        | 是否显示表头   | boolean         | true      |
| stripe            | 是否显示斑马纹 | boolean         | false     |
| width             | 表格宽度       | string / number | undefined |
| height            | 表格高度       | string / number | undefined |
| maxHeight         | 表格最大高度   | string / number | undefined |
| scrollbarAlwaysOn | 总是显示滚动条 | boolean         | false     |


## Table Column Attributes

| 属性     | 描述               | 类型            | 默认值 |
| -------- | ------------------ | --------------- | ------ |
| prop     | 对应列内容的字段名 | string          | —      |
| label    | 显示的列名         | string          | —      |
| type     | 列的类型           | string          | —      |
| width    | 列的宽度           | number / string | —      |
| minWidth | 列的最小宽度       | number / string | —      |
