const Users = require('../../repositories')
const { Conflict } = require('http-errors')
const { CREATED } = require('../../helpers/constants')
const { createEmail, sendEmail } = require('../../helpers')

const signUp = async (req, res, next) => {
  const user = await Users.findUserByEmail(req.body.email)
  res.locals.user = user

  if (user) {
    throw new Conflict('Email in use')
  }

  const { verifyToken } = await Users.createUser(req.body)
  const data = createEmail(req, verifyToken)
  sendEmail(data)

  return res
    .status(CREATED)
    .json({ status: 'succes', code: CREATED })
}

module.exports = signUp
