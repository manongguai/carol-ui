/* eslint-disable no-undef */
const fs = require('fs')
const pathLib = require('path')
const os = require('os')
const uppercamelcaseLib = require('uppercamelcase')
const { execSync } = require('child_process')

const copyDirDeep = (dir, destDir, replaceExpValues = []) => {
  if (!(isDirectory(dir, true) && isDirectory(destDir, true))) {
    return
  }

  const dirRes = fs.readdirSync(dir)
  dirRes.forEach((subPath) => {
    const path = pathLib.resolve(dir, subPath)
    let destPath = pathLib.resolve(destDir, subPath)

    if (Array.isArray(replaceExpValues)) {
      let tempPath = subPath
      replaceExpValues.forEach(({ exp, value }) => {
        const needReplace = !!exp && ![null, void 0].includes(value)
        if (needReplace) {
          tempPath = tempPath.replace(exp, value)
        }
      })
      destPath = pathLib.resolve(destDir, tempPath)
    }

    if (fs.statSync(path).isDirectory()) {
      fs.mkdirSync(destPath) // 子目录
      copyDirDeep(path, destPath, replaceExpValues)
    } else {
      fs.copyFileSync(path, destPath)
      replaceFileCtn(destPath, replaceExpValues)
    }
  })
}

const listDir = (dir) => {
  const dirRes = fs.readdirSync(dir)
  const pathList = []
  dirRes.forEach((subPath) => {
    const path = pathLib.resolve(dir, subPath)
    if (fs.statSync(path).isDirectory()) {
      const subDirRes = listDir(path)
      pathList.push(...subDirRes)
    } else {
      pathList.push(path)
    }
  })
  return pathList
}

const lowerCamelCase = (arg) => {
  const upper = uppercamelcaseLib(arg)
  if (upper) {
    return upper[0].toLowerCase() + upper.substring(1)
  }
}

const kebabCase = (arg) => {
  const upper = uppercamelcaseLib(arg)
  if (upper) {
    return upper.replace(/(?!^)([A-Z])/g, '-$1').toLowerCase()
  }
}

/**
 * 替换指定文件的
 * @param {*} filePath
 * @param {*} replaceExpValues
 * @returns
 */
const replaceFileCtn = (filePath, replaceExpValues = []) => {
  if (!isFile(filePath, true)) {
    return
  }

  let fileCtn = fs.readFileSync(filePath, { encoding: 'utf8' })
  if (Array.isArray(replaceExpValues)) {
    replaceExpValues.forEach(({ exp, value }) => {
      const needReplace = !!exp && ![null, void 0].includes(value)
      if (needReplace) {
        fileCtn = fileCtn.replace(exp, value)
      }
    })
  }
  fs.writeFileSync(filePath, fileCtn, { encoding: 'utf8' })
}

/**
 * 判断是否是一个目录
 * @param {*} dir
 * @param {*} showErr 是否显示错误信息，默认不显示
 * @returns
 */
const isDirectory = (dir, showErr = false) => {
  if (!fs.existsSync(dir)) {
    if (showErr) {
      console.error(`${dir}不存在`)
    }
    return false
  }
  if (!fs.statSync(dir).isDirectory()) {
    if (showErr) {
      console.error(`${dir}不是一个目录`)
    }
    return false
  }

  return true
}
/**
 * 判断是否是一个文件
 * @param {*} filePath
 * @param {*} showErr 是否显示错误信息，默认不显示
 * @returns
 */
const isFile = (filePath, showErr = false) => {
  if (!fs.existsSync(filePath)) {
    if (showErr) {
      console.error(`${filePath}不存在`)
    }
    return false
  }
  if (!fs.statSync(filePath).isFile()) {
    if (showErr) {
      console.error(`${filePath}不是一个文件`)
    }
    return false
  }

  return true
}

/**
 * 读取目录，非递归
 * @param {*} dir 目录
 * @param {*} mode 1-文件和目录；2-仅目录；3-仅文件
 */
const readDirSync = (dir, mode = 1) => {
  if (isDirectory(dir, true)) {
    const dirRes = fs.readdirSync(dir)
    return dirRes
      .filter((subPath) => {
        const path = pathLib.resolve(dir, subPath)
        if (mode === 2) {
          return isDirectory(path)
        } else if (mode === 3) {
          return isFile(path)
        }
        return true
      })
      .map((subPath) => {
        return pathLib.resolve(dir, subPath)
      })
  }
  return []
}

/**
 * 在文件中追加一行
 * @param {*} filePath 文件路径
 * @param {*} lineCtn 需要写入的行内容
 */
const writeFileByLine = (filePath, lineCtn = '') => {
  if (isFile(filePath, true)) {
    fs.appendFileSync(filePath, os.EOL + lineCtn, { encoding: 'utf-8' })
  }
}

/**
 * 清空文件内容
 * @param {*} filePath
 */
const cleanFile = (filePath) => {
  if (isFile(filePath, true)) {
    fs.rmSync(filePath)
    fs.writeFileSync(filePath, '', { encoding: 'utf-8' })
  }
}

const formatFile = (filePath) => {
  const command = `npx prettier --write ${filePath}`
  execCommand(command)
}

const execCommand = (command) => {
  execSync(command, { stdio: 'inherit' })
}

module.exports.isDirectory = isDirectory
module.exports.listDir = listDir
module.exports.copyDirDeep = copyDirDeep
module.exports.upperCamelCase = uppercamelcaseLib
module.exports.lowerCamelCase = lowerCamelCase
module.exports.kebabCase = kebabCase
module.exports.replaceFileCtn = replaceFileCtn
module.exports.readDirSync = readDirSync
module.exports.writeFileByLine = writeFileByLine
module.exports.cleanFile = cleanFile
module.exports.formatFile = formatFile
module.exports.execCommand = execCommand
