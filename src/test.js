const storage = require('nft.storage')
const ipfsReader = require('./ipfsReader')
// const base64 = require('./base64')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxNzFCODcxNzYyMUQ3YjZmMEQyNmYxNjE1OTBBMWFlNTFFYmIyMDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDM1NTcxNDg1OCwibmFtZSI6IlNURF9kZXYifQ.EP0D9PO4tzRUp-opk-Xqb8jz7_pgAt4As4oC-FFXzEQ'
const { NFTStorage } = storage
const client = new NFTStorage({ token })
const skins = {
  default: require('./renders/skin/default'),
  v2: require('./renders/skin/v2')
}
const metaRenders = {
  default: require('./renders/meta/default')
}

const stickers = {
  poop: require('./renders/stickers/poop.b64'),
  lit: require('./renders/stickers/lit.b64'),
  musc: require('./renders/stickers/musc.b64')
}

// const pinata = pinataSDK('bb180bc5011d2f2824b3', '55e4206eb6f353edb61a323c92408c5e1e3f8a6e7d6512ac148d1b8188aef4a0')

// sticker = {
//     p:'', // path
//     x: 0..1,
// y: 0..1,
// s: 0..1,
// r: 0..2PI,
//     data: '', //data
// }
// skin = {
//     c:'', // path
//     data: '', //data
// }

// const stickers = [
//   { c: 'QmV6kXDjR95ogEBcSE19Scz37CaAihao8sVE912QJGHt6J', x: 0.75, y: 0.25, s: 1.2, r: 45 }
// ]
// const renderCid = 'QmVnPfFcbi7HU6wgExmVWK9DBbtRzhWnG92126X5NkF9po'

function getSticker (sticker) {
  if (!sticker || !sticker.c) return null
  if (stickers[sticker.c]) {
    return stickers[sticker.c]
  }
  return ipfsReader(sticker.c)
    .then((data) => {
      sticker.src = data
      return sticker
    })
}

function getSkin (sidOrCid) {
  if (!sidOrCid) return skins.default
  if (skins[sidOrCid]) {
    return skins[sidOrCid]
  }
  return ipfsReader(sidOrCid)
    .then((scriptText) => {
      // eslint-disable-next-line no-eval
      const s = eval(scriptText)
      return s
    })
}
function getMetaRender (sidOrCid) {
  if (metaRenders[sidOrCid]) {
    return skins[sidOrCid]
  }
  return ipfsReader(sidOrCid)
    .then((scriptText) => {
      // eslint-disable-next-line no-eval
      const s = eval(scriptText)
      return s
    })
}

function generateMeta (data, metaRenderId, skinIdOrCid, stickers) {
  const skin = getSkin(skinIdOrCid)
  const img = skin(data, stickers)
  // const imgb64 = base64.svg(img)
  const metaRender = getMetaRender(metaRenderId)
  const json = metaRender(data, img)

  return client.store(json)
}

// console.log(!generateMeta, !getSticker)
// Promise.all(stickers.map(getSticker))
//   .then((stickersB64) => {
//     console.log('stickersB64', stickersB64)
//     return generateMeta('awesome', stickersB64)
//   })
// const renderCid = 'QmVnPfFcbi7HU6wgExmVWK9DBbtRzhWnG92126X5NkF9po'
// getRender(renderCid)
//   .then((r) => {
//     console.log('r', r)
//     r('v234', stickers)
//   })

//
function main (data, metaRenderId, skinIdOrCid, stickers = []) {
  return Promise.all(stickers.map(getSticker))
    .then((stickersB64) => {
      const safeStickers = []
      for (let i = 0; i < stickersB64.length; i++) {
        if (stickersB64[i]) safeStickers.push(stickersB64[i])
      }
      return generateMeta(data, metaRenderId, skinIdOrCid, stickersB64)
    })
}
main({ day: 4000000 }, null, null, [
  { c: 'lit', x: 0.5, y: 0.5, s: 1, r: 0 },
  { c: 'poop', x: 0.2, y: 0.2, s: 2, r: 45 }
])
// module.exports = generateMeta
