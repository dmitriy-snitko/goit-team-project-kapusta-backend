const { NotFound } = require('http-errors')

const { User } = require('../models')

const verifyToken = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })

  if (!user) {
    throw new NotFound('User not found')
  }
  const token = user.createToken()
  await User.findOneAndUpdate(
    { verifyToken },
    { verifyToken: null, verify: true, token },
  )

  res.redirect(
    `${process.env.HOME_URL}/google-redirect/?` +
      `token=${token}&` +
      `email=${user.email}&` +
      `balance=${user.balance}&` +
      `name=${user.name}`,
  )
}

module.exports = verifyToken