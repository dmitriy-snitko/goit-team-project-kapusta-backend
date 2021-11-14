require('dotenv').config()
const HttpCode = require('../helpers/constants')
const Users = require('../repositories')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY
const { sendSuccessRes } = require('../helpers')

const signUp = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email)
    res.locals.user = user
    if (user) {
      return res.status(HttpCode.CONFLICT).json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' })
    }
    const { id } = await Users.createUser(req.body)

    return res.status(HttpCode.CREATED).json({ status: 'succes', code: HttpCode.CREATED, id })
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
        .json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Email or password is wrong' })
    }
    const { id, name, balance } = user
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await Users.updateToken(id, token)
    const { email } = await req.body
    return res.status(HttpCode.OK).json({ status: 'succes', code: HttpCode.OK, id, email, name, balance, token })
    // sendSuccessRes(res, { email, name, balance, token }, HttpCode.OK)
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

const userBalanceUpdate = async (req, res, next) => {
  try {
    const { balance } = req.body
    const id = res.locals.user.id
    await Users.findUserById(id)
    await Users.updateBalance(id, balance)
    return res.status(HttpCode.OK).json({ status: 'succes', payload: balance })
  } catch (error) {
    next(error)
  }
}

const getUserBalance = async (req, res, next) => {
  try {
    // const { balance } = req.body
    const id = res.locals.user.id
    await Users.findUserById(id)
    const userbalance = await Users.getBalance(id)
    return res.status(HttpCode.OK).json({ status: 'succes', payload: userbalance })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signUp,
  logIn,
  logout,
  userBalanceUpdate,
  getUserBalance
}
