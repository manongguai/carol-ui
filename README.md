# Carol-UI

### 介绍 📖

Vue3通用组件库（持续迭代中，欢迎参与贡献）

### 一、在线文档

- Link：http://carol.kirk.wang

### 二、Git 仓库地址 (欢迎 Star⭐)

- GitHub：https://github.com/manongguai/carol-ui

### 三、🔨🔨🔨 项目功能

基础通用组件都有持续添加进来，详情见在线文档

### 四、安装使用步骤 📑

- **安装：**

```js
npm i @kirkw/carol-ui

```

- **使用：**

```js
import CarolUI from "@kirkw/carol-ui";

import "@kirkw/carol-ui/style.css";

Vue.use(CarolUI);
```

### 五、主要文件资源目录 📚

```text
carol-ui
.
├── README.md
├── apps
├── commitlint.config.js
├── icons
├── lint-staged.config.js
├── package.json
├── packages
│   ├── carol-ui  // 组件库核心代码
│   ├── carol-ui-docs // 文档
│   ├── tsconfig   // 通用tsconfig
│   ├── utils  // 通用工具函数
│   └── viteconfig // 通用viteconfig
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo
│   └── generators
│       ├── config.ts
│       └── react-component
│           └── component.hbs
├── turbo.json  // turborepo 脚本
├── types
│   ├── global.d.ts
│   └── vue.d.ts
└── watermark.png
```

### 六、开发脚本 🧩

- 全局安装turbo后可以直接执行turbo中的脚本

* **快速调试：**

```javascript
 pnpm dev
```

- **打包：**

```javascript
 pnpm build
```

- **文档调试：**

```javascript
 pnpm docs:dev
```

- **文档打包：**

```javascript
docs: build;
```

- **创建新组件：**

```javascript
 pnpm new
```

- **更新组件导入关系：**

```javascript
 pnpm register
```

- **test：**

```javascript
 pnpm test
```

- **添加版本变更：**

```javascript
 pnpm changeset:add
```

- **变更版本：**

```javascript
 pnpm changeset:version
```

- **发布包：**

```javascript
 pnpm changeset:publish
```

### 七、捐赠 🍵

如果你正在使用这个项目或者喜欢这个项目的，可以通过以下方式支持我：

- Star、Fork、Watch 一键三连 🚀
- 通过微信、支付宝一次性捐款 ❤

|                                        微信                                        |                                        支付宝                                        |
| :--------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: |
| <img src="http://admin.kirk.wang/images/weixin.png" alt="Alipay QRcode" width=170> | <img src="http://admin.kirk.wang/images/zhifubao.png" alt="Wechat QRcode" width=170> |
