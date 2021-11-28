require('dotenv').config()
const { SECRET_KEY } = process.env
const Users = require('../../repositories')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')

const getCurrent = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw new Unauthorized('Not authorized')
  }
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authorization.split(' ')
  if (!token) {
    throw new Unauthorized('Not authorized')
  }
  const { id } = jwt.verify(token, SECRET_KEY)

  const user = await Users.findUserById(id)
  const { email, name, balance } = user
  sendSuccessRes(res, { id, email, name, balance }, 200)
}

module.exports = getCurrent
