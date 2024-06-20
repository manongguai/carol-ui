/* eslint-disable no-undef */
'use strict'

const fs = require('fs')
const path = require('path')
const {
  upperCamelCase,
  lowerCamelCase,
  kebabCase,
  copyDirDeep,
  listDir,
  execCommand
} = require('./utils')

const srcComponentName = process.argv[2]
if (!srcComponentName) {
  console.error('[组件名]必填 - Please enter new component name')
  process.exit(1)
}

// 大驼峰命名
const upperCamelCaseName = upperCamelCase(srcComponentName)
// 小驼峰命名
const lowerCamelCaseName = lowerCamelCase(srcComponentName)
// bebab case 命名
const kebabCaseName = kebabCase(srcComponentName)
// 组件根目录
const rootComponentDir = path.resolve(__dirname, '../packages/components')

// 创建目录
const componentDir = path.resolve(rootComponentDir, kebabCaseName)
if (fs.existsSync(componentDir)) {
  console.error(`${kebabCaseName}已存在，请检查！`)
  process.exit(1)
}
fs.mkdirSync(componentDir, { recursive: true })

// 创建component
const templateDir = path.resolve(__dirname, './templates/component')
copyDirDeep(templateDir, componentDir, [
  { exp: /-component-/g, value: kebabCaseName },
  { exp: /_component_/g, value: lowerCamelCaseName },
  { exp: /_Component_/g, value: upperCamelCaseName }
])

const filePaths = listDir(componentDir).map((path) =>
  path.replace(rootComponentDir, 'packages/components')
)
filePaths.forEach((path) => console.log(`创建文件：${path}`))

// 注册component
const command = `node scripts/updateRegister.js`
execCommand(command)
