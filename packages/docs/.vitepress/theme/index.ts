import DefaultTheme from "vitepress/theme";
import CarolUI, { ClNotification } from "@kirkw/carol-ui";
import "@kirkw/carol-ui/style.css";
import "@vitepress-demo-preview/component/dist/style.css";
import { AntDesignContainer } from "@vitepress-demo-preview/component";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: any) {
    // register your custom global components
    ctx.app.use(CarolUI);
    ctx.app.component("demo-preview", AntDesignContainer);
    ctx.app.config.globalProperties.$clNotify = ClNotification;
  }
};
