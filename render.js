const vis = require('./renders/skin/vis1')
// get skin
// get stikers

// sticker = {
//     p:'', // path
//     x: 0..1,
// y: 0..1,
// s: 0..1,
// r: 0..2PI,
//     data: '', //data
// }
// skin = {
//     p:'', // path
//     data: '', //data
// }

function render (_skinId, stickers) {
  const svg = vis(stickers)
  //   const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  //   console.log(svg)
  return svg
}

module.exports = render
