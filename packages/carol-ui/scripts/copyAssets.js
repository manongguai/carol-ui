/* eslint-disable no-undef */
const path = require('path')
const { copyDirDeep, isDirectory } = require('./utils')
const { mkdirSync, rmSync } = require('fs')

const srcAssetsDir = path.resolve(__dirname, '../public')
const desAssetsDir = path.resolve(__dirname, '../docs/public')

if (isDirectory(desAssetsDir)) {
  rmSync(desAssetsDir, {
    recursive: true,
    force: true
  })
}

mkdirSync(desAssetsDir)
copyDirDeep(srcAssetsDir, desAssetsDir)
