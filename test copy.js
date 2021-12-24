const render = require('./render')
// const ipfs = require('./ipfs')
import { NFTStorage, File } from 'nft.storage'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxNzFCODcxNzYyMUQ3YjZmMEQyNmYxNjE1OTBBMWFlNTFFYmIyMDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDM1NTcxNDg1OCwibmFtZSI6IlNURF9kZXYifQ.EP0D9PO4tzRUp-opk-Xqb8jz7_pgAt4As4oC-FFXzEQ';
const client = new NFTStorage({ token })


const stickers = [
  { c: 'Qmct2Zp68VPtvuekDp1uG6dinRi9vCUDT5V5cHzb264aZt', x: 0.25, y: 0.25, s: 1, r: 45 }
]

// TODO read visualizer js
// TODO read json

async function generateMeta (someText) {
  const img = render(null, stickers)
  // upload image
  const ipfsRes = ipfs.saveSVG('cover.svg', img)
  const { IpfsHash } = ipfsRes

  const formJson = {
    name: `Item: ${someText}`,
    description: `desc desc ${someText}`,
    external_url: 'https://openseacreatures.io/3',
    animation_url: null,
    background_color: 'ff0044',
    attributes: {
    },
    image: `ipfs://${IpfsHash}/cover.svg`
  }
  const ipfsRes = ipfs.saveJSON('test.svg', img)
}

module.exports = generateMeta
