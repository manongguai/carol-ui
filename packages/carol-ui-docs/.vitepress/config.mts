import { defineConfig } from "vitepress";
import {
  baseComponents,
  dataDisplayComponents,
  dataInputComponents,
  layoutComponents,
  noticeComponents,
  otherComponents
} from "./sidebar";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";
import { fileURLToPath } from "node:url";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Carol UI",
  description: "A Vue3 Library",
  head: [["link", { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }]],
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "快速开始", link: "/quickstart" },{ text: "组件", link: "/components/button.html" }],

    sidebar: [
      {
        text: "通用组件",
        items: baseComponents
      },
      {
        text: "布局",
        items: layoutComponents
      },
      {
        text: "数据录入",
        items: dataInputComponents
      },
      {
        text: "数据展示",
        items: dataDisplayComponents
      },
      {
        text: "反馈",
        items: noticeComponents
      },
      {
        text: "其他",
        items: otherComponents
      }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/manongguai/react-vite-admin"
      }
    ],
    footer: {
      message: '<a href="https://beian.miit.gov.cn/">豫ICP备2023009283号-1</a>',
      copyright: "Copyright © 2024-present Kirk Wang"
    }
  }
});
