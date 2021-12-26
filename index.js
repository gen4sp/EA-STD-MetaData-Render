const { Requester, Validator } = require('@chainlink/external-adapter')
const metaDataRender = require('./src/main')
// Define custom error scenarios for the API.
// Return true for the adapter to retry.
// const customError = (data) => {
//   if (data.Response === 'Error') return true
//   return false
// }

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  seed: ['seed'],
  metaRenderId: false,
  skinIdOrCid: false,
  stickers: false
}

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const { seed, metaRenderId, skinIdOrCid, stickers } = validator.validated.data

  metaDataRender(seed, metaRenderId, skinIdOrCid, stickers)
    .then((metadataUploaded) => {
      callback(200, Requester.success(jobRunID, { status: 200, data: { result: metadataUploaded.url } }))
    })
}

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest
