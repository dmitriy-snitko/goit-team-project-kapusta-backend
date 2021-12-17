const { NotFound } = require('http-errors')
const { User } = require('../../models')

const verifyToken = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOneAndUpdate({ verifyToken }, { verify: true })

  if (!user) {
    throw new NotFound('User not found')
  }

  res.redirect(process.env.HOME_URL)
}

module.exports = verifyToken
