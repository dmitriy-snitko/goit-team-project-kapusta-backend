const { Transaction } = require('../../models')
const { sendSuccessRes, totalAmount } = require('../../helpers')

const getAllIncomingsByPeriod = async (req, res, next) => {
  const { year } = req.query

  const _id = res.locals.user.id

  const allIncomingsByPeriod = await Transaction.find({
    owner: _id,
    year,
    typeOftransactions: true
  })

  // const total = totalAmount(allIncomingsByPeriod)

  sendSuccessRes(res, allIncomingsByPeriod, 200, 'OK')
}

module.exports = getAllIncomingsByPeriod
