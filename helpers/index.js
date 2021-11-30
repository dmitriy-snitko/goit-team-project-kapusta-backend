const sendSuccessRes = require('./sendSuccessRes')
const totalAmount = require('./totalAmount')
const summary = require('./summary')
const getTotal = require('./getTotal')
const sendEmail = require('./sendEmail')
const createEmail = require('./createEmail')
const limiterApi = require('./limiterApi')

module.exports = {
  sendSuccessRes,
  totalAmount,
  summary,
  getTotal,
  sendEmail,
  createEmail,
  limiterApi
}
