const { Transaction } = require('../../models')
const { sendSuccessRes, totalAmount } = require('../../helpers')

const getIncomingsByMonth = async (req, res, next) => {
  const id = res.locals.user.id
  const { year, month } = req.body

  const incomingsByMonth = await Transaction.find({
    owner: id,
    month,
    year,
    typeOftransactions: false,
  })

  const total = totalAmount(incomingsByMonth)

  sendSuccessRes(res, { month, total }, 201)
}

module.exports = getIncomingsByMonth
