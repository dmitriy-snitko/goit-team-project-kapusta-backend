const Users = require('../../repositories')
const { Conflict } = require('http-errors')
const { CREATED } = require('../../helpers/constants')

const signUp = async (req, res, next) => {
  const user = await Users.findUserByEmail(req.body.email)
  res.locals.user = user
  if (user) {
    throw new Conflict('Email in use')
  }

  await Users.createUser(req.body)

  return res
    .status(CREATED)
    .json({ status: 'succes', code: CREATED })
}

module.exports = signUp
