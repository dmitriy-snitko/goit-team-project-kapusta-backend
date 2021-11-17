const { Unauthorized } = require('http-errors')
require('dotenv').config()
const HttpCode = require('../helpers/constants')
const Users = require('../repositories')
const jwt = require('jsonwebtoken')
const queryString = require('query-string')
const SECRET_KEY = process.env.SECRET_KEY
const axios = require('axios')

const signUp = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email)
    res.locals.user = user
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      })
    }
    const { id } = await Users.createUser(req.body)

    return res
      .status(HttpCode.CREATED)
      .json({ status: 'succes', code: HttpCode.CREATED, id })
  } catch (error) {
    next(error)
  }
}

const logIn = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email)
    const isValidPassword = await user?.isValidPassword(req.body.password)

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await Users.updateToken(id, token)
    const { email } = await req.body
    return res
      .status(HttpCode.OK)
      .json({ status: 'succes', code: HttpCode.OK, email, token })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = res.locals.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
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
    return res
      .status(HttpCode.OK)
      .json({ status: 'succes', payload: userbalance })
  } catch (error) {
    next(error)
  }
}

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  )
}

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code
  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  })
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  })
  const email = userData.data.email
  const user = await Users.findUserByEmail(email)
  if (!user) {
    throw new Unauthorized(`User with ${email} not exist`)
  }
  const { _id } = user
  const payload = {
    _id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
  await Users.updateToken(_id, token)
  console.log(user)
  console.log(token)
  console.log(user.name)

  return res.redirect(
    `${process.env.HOME_URL}/google-redirect/?token=${token}&email=${user.email}&balance=${user.balance}&name=${user.name}`,
  )
}

module.exports = {
  signUp,
  logIn,
  logout,
  userBalanceUpdate,
  getUserBalance,
  googleAuth,
  googleRedirect,
}
