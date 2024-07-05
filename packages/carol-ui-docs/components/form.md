# Form

表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。
:::tip

Form 组件已经从 2. x 的 Float 布局升级为 Flex 布局。
:::

## 基础表单

<preview path="./demos/form/basic-form.vue" title="最基础的表单包括各种输入表单项，比如input、select、radio、checkbox等。" description="在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。"></preview>

:::tip

W3C 标准定义：

当一个表单中只有一个单行文本输入字段时， 浏览器应当将在此字段中按下 Enter （回车键）的行为视为提交表单的请求。 如果希望阻止这一默认行为，可以在 \<el-form> 标签上添加 @submit.prevent。

:::

<!-- ## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

通过设置 inline 属性为 true 可以让表单域变为行内的表单域。 -->

## 对齐方式

<preview path="./demos/form/alignment.vue" title="根据设计情况，来选择最佳的标签对齐方式。" description="通过设置 label-position 属性可以改变表单域标签的位置，可选值为 top、left， 当设为 top 时标签会置于表单域的顶部"></preview>

## 表单校验

<preview path="./demos/form/validation.vue" title="Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。" description="Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可。 更多高级用法可参考 async-validator。"></preview>

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

本例还使用status-icon属性为输入框添加了表示校验结果的反馈图标。

form/custom-validation

:::

:::tip

自定义的校验回调函数必须被调用。 更多高级用法可参考 async-validator。

:::

## 添加/删除表单项

除了一次通过表单组件上的所有验证规则外. 您也可以动态地通过验证规则或删除单个表单字段的规则。

form/form-items

:::

## 数字类型验证

数字类型的验证需要在 v-model 处加上 .number 的修饰符，这是 Vue 自身提供的用于将绑定值转化为 number 类型的修饰符。

form/number-validate

:::

:::tip

When an `el-form-item` is nested in another `el-form-item`, its label width will be `0`. You can set `label-width` on that `el-form-item` if needed.

:::

## 尺寸控制

表单中的所有子组件都继承了该表单的 size 属性。 同样，form-item 也有一个 size 属性。

如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的 size 属性，直接为这个表单项或表单组件设置自己的 size 属性即可。

form/size-control

:::

## 无障碍

当在 el-form-item 内只有一个输入框（或相关的控制部件，如选择或复选框），表单项的标签将自动附加在那个输入框上。 然而，如果同时有多个输入框在 el-form-item内， 表单项将被分配为 WAI-ARIA 组 的角色。 在这种情况下，需要手动给每个 input 指定访问标签。

:::demo

form/accessibility

:::

## Form API

### Form Attributes

| Name                      | Description                                                                                                                                                                              | Type                                           | Default |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------- |
| model                     | Data of form component.                                                                                                                                                                  | ^[object]`Record<string, any>`                 | —       |
| rules                     | Validation rules of form.                                                                                                                                                                | ^[object]`FormRules`                           | —       |
| inline                    | Whether the form is inline.                                                                                                                                                              | ^[boolean]                                     | false   |
| label-position            | Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required.                                                                                                 | ^[enum]`'left' \| 'right' \| 'top'`            | right   |
| label-width               | Width of label, e.g. `'50px'`. All its direct child form items will inherit this value. `auto` is supported.                                                                             | ^[string] / ^[number]                          | ''      |
| label-suffix              | Suffix of the label.                                                                                                                                                                     | ^[string]                                      | ''      |
| hide-required-asterisk    | Whether to hide required fields should have a red asterisk (star) beside their labels.                                                                                                   | ^[boolean]                                     | false   |
| require-asterisk-position | Position of asterisk.                                                                                                                                                                    | ^[enum]`'left' \| 'right'`                     | left    |
| show-message              | Whether to show the error message.                                                                                                                                                       | ^[boolean]                                     | true    |
| inline-message            | Whether to display the error message inline with the form item.                                                                                                                          | ^[boolean]                                     | false   |
| status-icon               | Whether to display an icon indicating the validation result.                                                                                                                             | ^[boolean]                                     | false   |
| validate-on-rule-change   | Whether to trigger validation when the `rules` prop is changed.                                                                                                                          | ^[boolean]                                     | true    |
| size                      | Control the size of components in this form.                                                                                                                                             | ^[enum]`'' \| 'large' \| 'default' \| 'small'` | —       |
| disabled                  | Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.                                                           | ^[boolean]                                     | false   |
| scroll-to-error           | When validation fails, scroll to the first error form entry.                                                                                                                             | ^[boolean]                                     | false   |
| scroll-into-view-options  | When validation fails, it scrolls to the first error item based on the scrollIntoView option. [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). | ^[object]`Record<string, any>` / ^[boolean]    | —       |

### Form Events

| Name     | Description                             | Type                                                                         |
| -------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| validate | triggers after a form item is validated | ^[Function]`(prop: FormItemProp, isValid: boolean, message: string) => void` |

### Form Slots

| Name    | Description               | Subtags  |
| ------- | ------------------------- | -------- |
| default | customize default content | FormItem |

### Form Exposes

| Name          | Description                                                        | Type                                                                                                                              |
| ------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| validate      | Validate the whole form. Receives a callback or returns `Promise`. | ^[Function]`(callback?: FormValidateCallback) => Promise<void>`                                                                   |
| validateField | Validate specified fields.                                         | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined, callback?: FormValidateCallback \| undefined) => FormValidationResult` |
| resetFields   | Reset specified fields and remove validation result.               | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |
| scrollToField | Scroll to the specified fields.                                    | ^[Function]`(prop: FormItemProp) => void`                                                                                         |
| clearValidate | Clear validation message for specified fields.                     | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |

## FormItem API

### FormItem Attributes

| Name            | Description                                                                                                                                                   | Type                                                | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------- |
| prop            | A key of `model`. It could be an array of property paths (e.g `['a', 'b', 0]`). In the use of `validate` and `resetFields` method, the attribute is required. | ^[string] / ^[string&#91;&#93;]                     | —       |
| label           | Label text.                                                                                                                                                   | ^[string]                                           | —       |
| label-width     | Width of label, e.g. `'50px'`. `'auto'` is supported.                                                                                                         | ^[string] / ^[number]                               | ''      |
| required        | Whether the field is required or not, will be determined by validation rules if omitted.                                                                      | ^[boolean]                                          | —       |
| rules           | Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).    | ^[object]`Arrayable<FormItemRule>`                  | —       |
| error           | Field error message, set its value and the field will validate error and show this message immediately.                                                       | ^[string]                                           | —       |
| show-message    | Whether to show the error message.                                                                                                                            | ^[boolean]                                          | true    |
| inline-message  | Inline style validate message.                                                                                                                                | ^[string] / ^[boolean]                              | ''      |
| size            | Control the size of components in this form-item.                                                                                                             | ^[enum]`'' \| 'large' \| 'default' \| 'small'`      | —       |
| for             | Same as for in native label.                                                                                                                                  | ^[string]                                           | —       |
| validate-status | Validation state of formItem.                                                                                                                                 | ^[enum]`'' \| 'error' \| 'validating' \| 'success'` | —       |

#### FormItemRule

| Name    | Description                     | Type                        | Default |
| ------- | ------------------------------- | --------------------------- | ------- |
| trigger | How the validator is triggered. | ^[enum]`'blur' \| 'change'` | —       |

:::tip

If you don't want to trigger the validator based on input events, set the `validate-event` attribute as `false` on the corresponding input type components (`<el-input>`, `<el-radio>`, `<el-select>`, ...).

:::

### FormItem Slots

| Name    | Description                                   | Type                         |
| ------- | --------------------------------------------- | ---------------------------- |
| default | Content of Form Item.                         | —                            |
| label   | Custom content to display on label.           | ^[object]`{ label: string }` |
| error   | Custom content to display validation message. | ^[object]`{ error: string }` |

### FormItem Exposes

| Name            | Description                                       | Type                                                                                                 |
| --------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| size            | Form item size.                                   | ^[object]`ComputedRef<'' \| 'large' \| 'default' \| 'small'>`                                        |
| validateMessage | Validation message.                               | ^[object]`Ref<string>`                                                                               |
| validateState   | Validation state.                                 | ^[object]`Ref<'' \| 'error' \| 'validating' \| 'success'>`                                           |
| validate        | Validate form item.                               | ^[Function]`(trigger: string, callback?: FormValidateCallback \| undefined) => FormValidationResult` |
| resetField      | Reset current field and remove validation result. | ^[Function]`() => void`                                                                              |
| clearValidate   | Remove validation status of the field.            | ^[Function]`() => void`                                                                              |

## Type Declarations

<details>
  <summary>Show declarations</summary>

```ts
type Arrayable<T> = T | T[];

type FormValidationResult = Promise<boolean>;

// ValidateFieldsError: see [async-validator](https://github.com/yiminghe/async-validator/blob/master/src/interface.ts)
type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void;

// RuleItem: see [async-validator](https://github.com/yiminghe/async-validator/blob/master/src/interface.ts)
interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}
type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>;
```

</details>
