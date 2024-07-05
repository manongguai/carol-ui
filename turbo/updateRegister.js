/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const {
  readDirSync,
  upperCamelCase,
  writeFileByLine,
  cleanFile,
  kebabCase,
  lowerCamelCase,
  formatFile,
  execCommand
} = require("./utils");

// 读取components
const rootComponentDir = path.resolve(__dirname, "../packages/carol-ui/packages/components");
const componentNames = readDirSync(rootComponentDir, 2).map(fullPath => {
  return {
    fullPath,
    /**
     * 组件名
     */
    name: fullPath.substring(rootComponentDir.length + 1)
  };
});

// 写入components.ts => packages/components/components.ts
const componentsTsPath = path.resolve(__dirname, "../packages/carol-ui/packages/components/components.ts");
cleanFile(componentsTsPath); // 先清空文件
writeFileByLine(componentsTsPath, `import type { Component } from 'vue'`);
componentNames.forEach(({ name }) => {
  const clName = `Cl${upperCamelCase(name)}`;
  const kebabCaseName = kebabCase(name);
  writeFileByLine(componentsTsPath, `import ${clName} from './${kebabCaseName}'`);
});

componentNames.forEach(({ name }) => {
  const kebabCaseName = kebabCase(name);
  writeFileByLine(componentsTsPath, `export * from './${kebabCaseName}'`);
});

const clNames = componentNames.map(({ name }) => `Cl${upperCamelCase(name)}`);
writeFileByLine(componentsTsPath);
writeFileByLine(componentsTsPath, `const clComponents: Component[] = [${clNames.join(", ")}]`);
writeFileByLine(componentsTsPath);
writeFileByLine(componentsTsPath, `export { clComponents, ${clNames.join(", ")} }`);
formatFile(componentsTsPath);

// 写入custom-theme.ts => packages/components/config-provider/src/custom-theme.ts
const customThemeTsPath = path.resolve(__dirname, "../packages/carol-ui/packages/components/config-provider/src/custom-theme.ts");

const filterComponentNames = componentNames.filter(({ name }) => {
  // 需要排除config-provider
  if (name === "config-provider") {
    return false;
  }
  // 不存在theme定义的也要排除
  const themePath = path.resolve(__dirname, `../packages/carol-ui/packages/components/${kebabCase(name)}/styles/index.ts`);
  // console.log(themePath)
  return fs.existsSync(themePath);
});

cleanFile(customThemeTsPath); // 先清空文件
filterComponentNames.forEach(({ name }) => {
  const themeName = `${upperCamelCase(name)}Theme`;
  const kebabCaseName = kebabCase(name);
  writeFileByLine(customThemeTsPath, `import type { ${themeName} } from '@/components/${kebabCaseName}/styles'`);
});
writeFileByLine(customThemeTsPath);
const themeProperties = filterComponentNames.map(({ name }) => {
  const themeName = `${upperCamelCase(name)}Theme`;
  return `${lowerCamelCase(name)}?: ${themeName}`;
});
writeFileByLine(customThemeTsPath, `export interface CustomTheme { ${themeProperties.join(", ")} }`);
formatFile(customThemeTsPath);

// 写入light.ts => packages/themes/light.ts
const themeLightTsPath = path.resolve(__dirname, "../packages/carol-ui/packages/themes/light.ts");
cleanFile(themeLightTsPath);
writeFileByLine(themeLightTsPath, `import { commonLight } from '../styles'`);
writeFileByLine(themeLightTsPath, `import type { BuiltInGlobalTheme } from './themes'`);
writeFileByLine(themeLightTsPath);
filterComponentNames.forEach(({ name }) => {
  const lowerCamelCaseName = lowerCamelCase(name);
  const kebabCaseName = kebabCase(name);
  const lightName = `${lowerCamelCaseName}Light`;
  writeFileByLine(themeLightTsPath, `import { ${lightName} } from '@/components/${kebabCaseName}/styles'`);
});
writeFileByLine(themeLightTsPath);

const lightProperties = filterComponentNames.map(({ name }) => {
  const lowerCamelCaseName = lowerCamelCase(name);
  const lightName = `${lowerCamelCase(name)}Light`;
  return `${lowerCamelCaseName}: ${lightName}`;
});
const prefixLight = `name: 'light', common: commonLight`;
writeFileByLine(
  themeLightTsPath,
  `export const lightTheme: BuiltInGlobalTheme = { ${prefixLight}, ${lightProperties.join(", ")} }`
);
formatFile(themeLightTsPath);

// 检查依赖
execCommand("turbo run @kirkw/carol-ui#type-check");
