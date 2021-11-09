const { Transaction } = require('../../models')
const { sendSuccessRes, totalAmount } = require('../../helpers')

const getAllIncomingsByPeriod = async (req, res, next) => {
  const id = res.locals.user.id

  const allIncomingsByPeriod = await Transaction.find({
    owner: id,
    ...req.query,
    typeOftransactions: true,
  }).sort({ amount: -1 })

  const total = totalAmount(allIncomingsByPeriod)

  sendSuccessRes(res, { total, allIncomingsByPeriod }, 201)
}

module.exports = getAllIncomingsByPeriod
