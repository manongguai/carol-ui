---
Steps
---

<script setup>
import { ref } from 'vue'
</script>

## Steps 步骤条

### 演示

<preview path="./demos/steps/steps-demo1.vue" title="简单的步骤条" description=" 设置 active 属性，接受一个 Number，表明步骤的 index，从 0 开始。 需要定宽的步骤条时，设置 space 属性即可，它接受 Number， 单位为 px， 如果不设置，则为自适应。 设置 finish-status 属性可以改变已经完成的步骤的状态。"></preview>
<preview path="./demos/steps/steps-demo2.vue" title="居中的步骤条" description="标题和描述可以居中。"></preview>
<preview path="./demos/steps/steps-demo3.vue" title="自定义步骤条" description="标题，描述，icon均可以插槽的方式自定义"></preview>

## API

Steps Props

| 参数           |        说明        |    类型 |                  可选值 | 默认值 |
| -------------- | :----------------: | ------: | ----------------------: | -----: |
| space          |     步骤条宽度     |  string |                       - |  200px |
| active         |  设置当前激活步骤  |  number |                       - |     -1 |
| process-status | 设置当前步骤的状态 |  string | wait / process / finish |  200px |
| finish-status  | 设置结束步骤的状态 |  string | wait / process / finish |  200px |
| space          |     步骤条宽度     |  string |                       - |  200px |
| align-center   |    进行居中对齐    | boolean |                       - |  false |

Step Props

| 参数        |        说明        |   类型 |                  可选值 | 默认值 |
| ----------- | :----------------: | -----: | ----------------------: | -----: |
| title       |        标题        | string |                       - |      - |
| description |     描述性文字     | string |                       - |      - |
| status      | 设置当前步骤的状态 | string | wait / process / finish |      - |
| space       |     步骤条宽度     | string |                       - |  200px |
