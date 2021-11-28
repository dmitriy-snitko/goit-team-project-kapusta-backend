const Users = require('../../repositories')
const { Unauthorized } = require('http-errors')
const { OK } = require('../../helpers/constants')

const logIn = async (req, res, next) => {
  const user = await Users.findUserByEmail(req.body.email)
  const isValidPassword = await user?.isValidPassword(req.body.password)

  if (!user || !isValidPassword) {
    throw new Unauthorized('Email or password is wrong')
  }

  if (!user.verify) {
    throw new Unauthorized('Email not verify')
  }
  const { id, name, balance } = user
  const token = user.createToken()
  await Users.updateToken(id, token)
  const { email } = await req.body
  return res.status(OK).json({
    status: 'succes',
    code: OK,
    id,
    email,
    name,
    balance,
    token
  })
}

module.exports = logIn
