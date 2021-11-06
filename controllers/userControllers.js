require('dotenv').config()
const HttpCode = require('../helpers/constants')
const Users = require('../repositories')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const signUp = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email)
    res.locals.user = user
    // console.log(res.locals.user);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' })
    }
    const { id } = await Users.createUser(req.body)

    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await Users.updateToken(id, token)
    return res.status(HttpCode.CREATED).json({ status: 'succes', code: HttpCode.CREATED, id, token })
  } catch (error) {
    next(error)
  }
}

const logIn = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email)
    const isValidPassword = await user?.isValidPassword(req.body.password)

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED)
        .json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email or password is wrong' })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await Users.updateToken(id, token)
    const { email } = await req.body
    return res.status(HttpCode.OK).json({ status: 'succes', code: HttpCode.OK, email, token })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = res.locals.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({ })
  } catch (error) {
    next(error)
  }
}

const UserBalanceUpdate = async (req, res, next) => {
  try {
    const id = res.locals.user.id
    await Users.findUserById(id)
    // const { balance } = req.body
    // return res.status(HttpCode.OK).json({ status: 'succes', payload: data })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signUp,
  logIn,
  logout,
  UserBalanceUpdate
}