const { signUp, logIn, logout, userBalanceUpdate, getUserBalance, getCurrent, getInfoForReports,googleAuth ,googleRedirect } = require('./userControllers')

module.exports = {
  signUp,
  logIn,
  logout,
  userBalanceUpdate,
  getUserBalance,
  getCurrent,
  getInfoForReports,
  googleAuth,
  googleRedirect
}
