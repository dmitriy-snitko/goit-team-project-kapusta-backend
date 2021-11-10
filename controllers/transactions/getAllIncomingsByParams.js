const { Transaction } = require('../../models')
const { sendSuccessRes, totalAmount } = require('../../helpers')

const getAllIncomingsByParams = async (req, res, next) => {
  const id = res.locals.user.id

  const allIncomingsByParams = await Transaction.find({
    owner: id,
    ...req.query,
    typeOftransactions: true,
  }).sort({ amount: -1 })

  const total = totalAmount(allIncomingsByParams)

  sendSuccessRes(res, { total, allIncomingsByParams }, 201)
}

module.exports = getAllIncomingsByParams
