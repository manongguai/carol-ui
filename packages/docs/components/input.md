---
Input
---

<script setup>
import { ref, reactive } from 'vue'
const form = reactive({
  name: 'web',
  age: 18
})
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  .tips {
    display: block;
  }
  .cl-input {
    margin-top: 12px;
  }
}
</style>

## input 输入框

<preview path="./demos/input/input-demo1.vue" title="基础用法" description="placeholder默认 '请输入'，默认可清空，只读模式，禁用模式"></preview>
<preview path="./demos/input/input-demo6.vue" title="phone格式" description="自动控制11位且只能输入数字"></preview>
<preview path="./demos/input/input-demo2.vue" title="限制字符长度" description="限制最大字符数&可选是否显示当前字符数"></preview>
<preview path="./demos/input/input-demo3.vue" title="聚焦失焦" description="可调用组件的focus和blur实现聚焦失焦"></preview>
<preview path="./demos/input/input-demo4.vue" title="前缀后缀用法" description="prefix、suffix 是将元素插入input-wrap内部，被插入的元素没有边框，适用轻量元素若要被插入元素有边框或者插入组合元素，请使用input-group"></preview>
<preview path="./demos/input/input-demo5.vue" title="密码输入框" description="不要密文显示直接用text，否则password"></preview>

### textarea 文本域

<preview path="./demos/input/textarea-demo1.vue" title="基础用法" description="textarea目前没有slot，即prefix、suffix"></preview>
<preview path="./demos/input/textarea-demo2.vue" title="行数设置" description="rows: 展示几行 默认二行，当与minRows, maxRows冲突时，rows具有较低的优先级 minRows: 最小可压缩的行数，默认一行, 会控制resize和autoSize交互 maxRows: 最大可扩展的行数，会控制resize和autoSize交互"></preview>
<preview path="./demos/input/textarea-demo3.vue" title="限制字数" description="可以限制输入的长度&控制字符数是否显示"></preview>

### inputgroup

<preview path="./demos/input/input-group-demo1.vue" title="基础用法" description="有slot，即prefix、suffix会有分隔符"></preview>

### input props

| 名称            |  类型   | 默认值 |                 说明 |
| --------------- | :-----: | -----: | -------------------: |
| v-model         | string  |      - |                    - |
| maxlength       | number  |      - | 最大输入长度(字符数) |
| show-word-limit | boolean |  false | 是否显示输入字数统计 |
| placeholder     | string  | 请输入 |       输入框占位文本 |
| clearable       | boolean |   true |           是否可清空 |
| disabled        | boolean |  false |                 禁用 |
| readonly        | boolean |  false |                 只读 |
| autofocus       | boolean |  false |         自动获取焦点 |
| inputWidth      | number  |    240 |          input的宽度 |

### password props

| 名称             |  类型   |   默认值 | 可选值 |                 说明 |
| ---------------- | :-----: | -------: | -----: | -------------------: |
| type             | string  | password |      - |       代表是密码类型 |
| visibilityToggle | boolean |     true |      - | 是否展示显示明文icon |

### textarea props

| 名称            |  类型   | 默认值 |                           可选值 |                                     说明 |
| --------------- | :-----: | -----: | -------------------------------: | ---------------------------------------: |
| rows            | number  |      2 |                                - |                               输入框行数 |
| minRows         | number  |      1 |                                - |                                 最小行数 |
| maxRows         | number  |      - |                                - |                                 最大行数 |
| autosize        | boolean |   true |                                - | 自适应高度,设置为false将不会自动撑开高度 |
| resize          | string  |      - | none, both, horizontal, vertical |                     控制是否能被用户缩放 |
| maxlength       | number  |      - |                                - |                     最大输入长度(字符数) |
| show-word-limit | boolean |  false |                                - |                     是否显示输入字数统计 |
| clearable       | boolean |   true |                                - |                               是否可清空 |

### Slots 参数说明

| name   |      说明      | 回调参数 |
| ------ | :------------: | -------- |
| prefix | 输入框头部内容 | -        |
| suffix | 输入框尾部内容 | -        |

### Events 参数说明

| 事件   |                    说明                     | 回调参数       |
| ------ | :-----------------------------------------: | -------------- | 
| blur   |           在 Input 失去焦点时触发           | (event: Event) |
| focus  |           在 Input 获得焦点时触发           | (event: Event) |
| change |   仅在输入框失去焦点或用户按下回车时触发    | (value: string | number) |
| input  |            在 Input 值改变时触发            | (value: string | number) |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发 | -              |

### Methods 参数说明

| 事件  |       说明        | 回调参数 |
| ----- | :---------------: | -------: |
| focus | 使 input 获取焦点 |        - |
| blur  | 使 input 失去焦点 |        - |
