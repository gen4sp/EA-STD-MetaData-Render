const year = 365.26
const shift = 0.25
const stickerSize = 160
const stickerHelfSize = stickerSize / 2
const planets = [
  { label: 'Mercury', a: 195, s: 87.97 },
  { label: 'Venus', a: 267, s: 224.7 },
  { label: 'Earth', a: 354, s: year },
  { label: 'Mars', a: 94, s: 1.88 * year },
  { label: 'Jupiter', a: 65, s: 11.86 * year },
  { label: 'Saturn', a: 49, s: 29.46 * year },
  { label: 'Uranus', a: 128, s: 84.01 * year },
  { label: 'Neptune', a: 150, s: 164.79 * year },
  { label: 'Pluto', a: 192, s: 248.59 * year }
]

function arc ({ r, angle, length }) {
  const circumference = 2 * Math.PI * r
  const strokeDasharraySmall = (length) * circumference / 6
  const da = [
    strokeDasharraySmall,
    circumference - strokeDasharraySmall
  ].join(' ')

  const so = (shift + angle / 360) * circumference + strokeDasharraySmall / 2
  console.log('x ', { r, angle, length }, da, so)
  return `<g>
        <circle stroke="#ffffff22" fill="none" stroke-width="8px" cx="256" cy="256" r="${r}" ></circle>
        <circle stroke="#ffffff55" fill="none" stroke-width="12px" cx="256" cy="256" r="${r}" stroke-dasharray="${da}" stroke-dashoffset="${so}"></circle>
    </g>`
}

function render (stickers) {
  const arcs = planets.map((p, i) => {
    const ang = (360 - p.a) % 360

    return arc({ r: 100 + i * 16, angle: ang, length: 0.3 + i / 20 })
  })
  const images = stickers.map((s) => {
    const url = s.src
    const x = s.x * 512
    const y = s.y * 512

    return `<image  transform="translate(${x} ${y}) rotate(${s.r} ${stickerHelfSize} ${stickerHelfSize})  scale(${s.s} ${s.s})" href="${url}" height="${stickerSize}" width="${stickerSize}" />`
  })
  return `<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="my-svg-component"  width="512px" height="512px" viewBox="0 0 512 512" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
            <defs>
            <linearGradient id="lgrad"   x1="53%" y1="100%" x2="47%" y2="0%" >
                
                    <stop offset="0%" style="stop-color:rgb(238,130,238);stop-opacity:1.00" />
                    <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1.00" />
            
                </linearGradient>
            </defs> 
            <rect width="512" height="512" style="stroke:none;"  fill="url(#lgrad)"/>
            <g id="Artboard" stroke="none" stroke-width="1" >
                ${arcs}
            </g>
            
            <g>
                ${images}
            </g>
            </svg>
        `
}

module.exports = render
