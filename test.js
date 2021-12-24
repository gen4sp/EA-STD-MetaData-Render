const render = require('./render')
const ipfs = require('./ipfs')

const stickers = [
  { c: 'Qmct2Zp68VPtvuekDp1uG6dinRi9vCUDT5V5cHzb264aZt', x: 0.25, y: 0.25, s: 1, r: 45 }
]
const img = render(null, stickers)

ipfs.saveSVG('test.svg', img)
