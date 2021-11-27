const { NotFound } = require('http-errors')

const { User } = require('../models')

const verifyToken = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })

  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findOneAndUpdate(
    { verifyToken },
    { verifyToken: null, verify: true }
  )
  res.redirect(process.env.HOME_URL)
}

module.exports = verifyToken
