const fs = require('fs')
const path = require('path')
module.exports = function (filepath) {
  const b64string = fs.readFileSync(path.resolve(__dirname, filepath))
  return Buffer.from(b64string, 'base64').toString('ascii')
}
