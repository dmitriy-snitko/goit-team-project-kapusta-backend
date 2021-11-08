const { Transaction } = require('../../models')
const { sendSuccessRes, totalAmount } = require('../../helpers')

const getAllOutgoingsByParams = async (req, res, next) => {
  const id = res.locals.user.id

  const allOutgoingsByParams = await Transaction.find({
    owner: id,
    ...req.query,
    typeOftransactions: false,
  }).sort({ amount: -1 })

  const total = totalAmount(allOutgoingsByParams)

  sendSuccessRes(res, { total, allOutgoingsByParams }, 201)
}

module.exports = getAllOutgoingsByParams
