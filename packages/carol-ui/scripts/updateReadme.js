/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, './readmeTemplate.md')
const outputPath = path.join(__dirname, '../README.md')

function updateReadme() {
  console.log('开始更新readme.md')
  const packageInfo = require('../package.json')
  let template = fs.readFileSync(inputPath).toString()
  let add = `# cl-design
* 文档地址：[https://hdz-ui.design.flkj.pub/carol-ui@${packageInfo.version}/docs/.vuepress/dist/index.html](https://hdz-ui.design.flkj.pub/carol-ui@${packageInfo.version}/docs/.vuepress/dist/index.html)`
  fs.writeFileSync(outputPath, add + template)
  console.log('更新README.md完成')
}

module.exports = updateReadme
