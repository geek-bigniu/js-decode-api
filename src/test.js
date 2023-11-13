const fs = require('fs')
const PluginCommon = require('./plugin/common.js')
const PluginJjencode = require('./plugin/jjencode.js')
const PluginSojson = require('./plugin/sojson.js')
const PluginSojsonV7 = require('./plugin/sojsonv7.js')
const PluginObfuscator = require('./plugin/obfuscator.js')
const PluginAwsc = require('./plugin/awsc.js')

let encodeFile = 'input.js'
let decodeFile = 'output.js'


// 读取源代码
const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' })

// 净化源代码
let code
  code = PluginSojsonV7(sourceCode)

// 输出代码
if (code) {
  fs.writeFile(decodeFile, code, () => {})
}
