// const ipfs = require('./ipfs')
const storage = require('nft.storage')
// const fs = require('fs')
const axios = require('axios')
const render = require('./render')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxNzFCODcxNzYyMUQ3YjZmMEQyNmYxNjE1OTBBMWFlNTFFYmIyMDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDM1NTcxNDg1OCwibmFtZSI6IlNURF9kZXYifQ.EP0D9PO4tzRUp-opk-Xqb8jz7_pgAt4As4oC-FFXzEQ'
const { NFTStorage, File } = storage
const client = new NFTStorage({ token })
// const pinata = pinataSDK('bb180bc5011d2f2824b3', '55e4206eb6f353edb61a323c92408c5e1e3f8a6e7d6512ac148d1b8188aef4a0')

const stickers = [
  { c: 'QmV6kXDjR95ogEBcSE19Scz37CaAihao8sVE912QJGHt6J', x: 0.75, y: 0.25, s: 1.2, r: 45 }
]

function readIPFSFile (cid) {
  return axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.error(e)
    })
}

function getSticker (sticker) {
  return readIPFSFile(sticker.c)
    .then((data) => {
      sticker.src = data
      return sticker
    })
}

// const stream = node.cat('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A')
// const data = ''

// for await (const chunk of stream) {
//   // chunks of data are returned as a Buffer, convert it back to a string
//   data += chunk.toString()
// }

// console.log(data)
// }
console.log(!File)
// TODO read visualizer js
// TODO read json
// function getStream (data) {
//   var wstream = fs.createWriteStream('cover.svg')
//   // Node.js 0.10+ emits finish when complete
//   wstream.on('finish', function () {
//     console.log('file has been written')
//   })
//   wstream.write(data)
//   console.log('\n\n', data, '\n\n')
//   return wstream
// }

// function convertSvgToBase64Blob (text) {
//   return Buffer.from(`data:image/svg+xml;base64,${text}`, 'binary').toString('base64')
// }

// const mimes = {
//   png: 'image/png',
//   svg: 'image/svg+xml'
// }
// function saveBase64PNG (data) {
//   return Buffer.from(`data:${mimes.png};base64,${data}`, 'binary').toString('base64')
// }
async function generateMeta (someText, stickers) {
  const img = render('v.2.0', stickers)
  //   const stream = getStream(img)
  const metadata = client.store({
    name: `Item: ${someText}`,
    description: `desc desc ${someText}`,
    external_url: 'https://openseacreatures.io/3',
    animation_url: null,
    background_color: 'ff0044',
    attributes: {
    },
    image: new File([img], 'cover.svg', {
      type: 'image/svg+xml'
    })
  })
  console.log('metadata', await metadata)
}

console.log(!generateMeta)
Promise.all(stickers.map(getSticker))
  .then((stickersB64) => {
    console.log('stickersB64', stickersB64)
    return generateMeta('awesome', stickersB64)
  })

// module.exports = generateMeta
