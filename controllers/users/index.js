const signUp = require('./signUp')
const logIn = require('./logIn')
const logout = require('./logout')
const userBalanceUpdate = require('./userBalanceUpdate')
const getUserBalance = require('./getUserBalance')
const getCurrent = require('./getCurrent')
const googleAuth = require('./googleAuth')
const googleRedirect = require('./googleRedirect')
const verify = require('./verify')
const verifyToken = require('./verifyToken')

module.exports = {
  signUp,
  logIn,
  logout,
  userBalanceUpdate,
  getUserBalance,
  getCurrent,
  googleAuth,
  googleRedirect,
  verify,
  verifyToken
}
