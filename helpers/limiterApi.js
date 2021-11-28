const { TOO_MANY_REQUEST } = require('./constants')

const limiterApi = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    return res.status(TOO_MANY_REQUEST).json({
      status: 'error',
      code: TOO_MANY_REQUEST,
      message: 'Too many requests, please try again later.'
    })
  }
}

module.exports = limiterApi
