const pinataSDK = require('@pinata/sdk')

const pinata = pinataSDK('bb180bc5011d2f2824b3', '55e4206eb6f353edb61a323c92408c5e1e3f8a6e7d6512ac148d1b8188aef4a0')
const Readable = require('stream').Readable

function saveText (filename, text) {
  const readableStream = Readable.from([text])// new Readable()
  readableStream.path = `${filename}.txt`
  return _saveToIpfs(readableStream)
}
function saveJson (filename, text) {
  const readableStream = Readable.from([text])// new Readable()
  readableStream.path = `${filename}.txt`
  return pinata.pinJSONToIPFS()
}

function saveSVG (filename, svg) {
  const readableStream = Readable.from([svg])// new Readable()
  readableStream.path = `${filename}.svg`
  return _saveToIpfs(readableStream)
}
function saveBase64SVG (filename, dataURL) {
  const data = dataURL.replace(/^data:image\/png;base64,/, '')
  const buff = Buffer.from(data, 'base64')
  const readableStream = Readable.from(buff)
  readableStream.path = `${filename}.svg`
  return _saveToIpfs(readableStream)
}
function _saveToIpfs (readableStream) {
  return pinata.pinFileToIPFS(readableStream, {
    wrapWithDirectory
  })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log('e', e)
    })
}
module.exports = {
  saveText,
  saveSVG,
  saveBase64SVG,
  saveJson
}
