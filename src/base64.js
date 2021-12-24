const mimes = {
  png: 'image/png',
  svg: 'image/svg+xml',
  jpeg: 'image/jpeg'
}
function saveBase64PNG (data) {
  return Buffer.from(`data:${mimes.png};base64,${data}`, 'binary').toString('base64')
}
function svg (text) {
  return saveBase64PNG(text, mimes.svg)
}
function png (text) {
  return saveBase64PNG(text, mimes.png)
}
function jpeg (text) {
  return saveBase64PNG(text, mimes.jpeg)
}
module.exports = {
  svg,
  png,
  jpeg
}
