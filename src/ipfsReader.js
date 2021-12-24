const axios = require('axios')
module.exports = function (cid) {
  return axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.error(e)
    })
}
