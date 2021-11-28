const Users = require('../../repositories')
const { NO_CONTENT } = require('../../helpers/constants')

const logout = async (req, res, next) => {
  const id = res.locals.user.id
  await Users.updateToken(id, null)
  return res.status(NO_CONTENT).json({})
}

module.exports = logout
