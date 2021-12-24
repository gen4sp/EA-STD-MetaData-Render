module.exports = function (data, img) {
  const text = JSON.stringify(data)
  return {
    name: `Item: ${text}`,
    description: `desc desc ${text}`,
    external_url: 'https://openseacreatures.io/3',
    animation_url: null,
    background_color: 'ff0044',
    attributes: {
    },
    image: new File([img], 'cover.svg', {
      type: 'image/svg+xml'
    })
  }
}
