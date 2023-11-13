const express = require('express');
const bodyParser = require('body-parser');

// 假设你有不同版本的插件模块
const PluginCommon = require('./plugin/common.js')
const PluginJjencode = require('./plugin/jjencode.js')
const PluginSojson = require('./plugin/sojson.js')
const PluginSojsonV7 = require('./plugin/sojsonv7.js')
const PluginObfuscator = require('./plugin/obfuscator.js')
const PluginAwsc = require('./plugin/awsc.js')
const app = express();
const decodeRouter = express.Router(); // 创建一个新的Router实例

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 为Router实例添加路由
decodeRouter.post('/v7', (req, res) => {
  processDecodeRequest(req, res, PluginSojsonV7);
});

decodeRouter.post('/sojson', (req, res) => {
  processDecodeRequest(req, res, PluginSojson);
});

decodeRouter.post('/common', (req, res) => {
  processDecodeRequest(req, res, PluginCommon);
});
decodeRouter.post('/jj', (req, res) => {
  processDecodeRequest(req, res, PluginJjencode);
});
decodeRouter.post('/Obfuscator', (req, res) => {
  processDecodeRequest(req, res, PluginObfuscator);
});
decodeRouter.post('/awsc', (req, res) => {
  processDecodeRequest(req, res, PluginAwsc);
});
// 这个函数可以处理解码请求，减少代码重复
function processDecodeRequest(req, res, Plugin) {
  try {
    console.log('request come', req.body.code);
    const sourceCode = req.body.code;
    const decodedCode = Plugin(sourceCode); 
    if (!decodedCode) {
      throw new Error("解码失败");
    }
    res.status(200).json({
      code: 1,
      msg: "success",
      data: decodedCode
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      code: 0,
      msg: e.message
    });
  }
}

// 使用/decode前缀来使用Router
app.use('/decode', decodeRouter);

// 处理404响应
app.use((req, res) => {
  res.status(404).json({
    code: 0,
    msg: "Not Found"
  });
});

const PORT = 8085;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('服务启动了~');
});
