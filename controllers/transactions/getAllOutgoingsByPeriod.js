const { Transaction } = require('../../models')
const { sendSuccessRes, totalAmount } = require('../../helpers')

const getAllOutgoingsByPeriod = async (req, res, next) => {
  const id = res.locals.user.id

  const allOutgoingsByPeriod = await Transaction.find({
    owner: id,
    ...req.query,
    typeOftransactions: false,
  })

  const total = totalAmount(allOutgoingsByPeriod)

  sendSuccessRes(res, { total, allOutgoingsByPeriod }, 201)
}

module.exports = getAllOutgoingsByPeriod
