const {
  signUp,
  logIn,
  logout,
  userBalanceUpdate,
  getUserBalance,
  getCurrent,
  googleAuth,
  googleRedirect,
} = require('./userControllers')
const verify = require('./verify')
const verifyToken = require('./verifyToken')

const { getInfoForReports } = require('./transactions')

module.exports = {
  signUp,
  verify,
  logIn,
  logout,
  userBalanceUpdate,
  getUserBalance,
  getCurrent,
  getInfoForReports,
  googleAuth,
  googleRedirect,
  verifyToken,
}
