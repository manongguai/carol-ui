const { upperCamelCase, lowerCamelCase, kebabCase, copyDirDeep, listDir, execCommand } = require("../utils");

module.exports = function generator(plop) {
  plop.setGenerator("new", {
    description: "为carol-ui创建新的组件",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "要创建的新组件的名称是什么?",
        validate: input => {
          if (!input) {
            return "componentName is required";
          }
          return true;
        }
      }
    ],
    actions: data => {
      const { componentName } = data;
      // 大驼峰命名
      const upperCamelCaseName = upperCamelCase(componentName);
      // 小驼峰命名
      const lowerCamelCaseName = lowerCamelCase(componentName);
      // bebab case 命名
      const kebabCaseName = kebabCase(componentName);
      return [
        {
          type: "addMany",
          destination: `packages/core/packages/components/${kebabCaseName}`,
          base: `templates/`,
          templateFiles: "**/*",
          data: {
            upperCamelCaseName,
            lowerCamelCaseName,
            kebabCaseName
          }
        }
      ];
    }
  });
};
