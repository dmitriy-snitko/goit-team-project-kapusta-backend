const { Transaction } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getAllIncomingsByPeriod = async (req, res, next) => {
  const id = res.locals.user.id
  const { year, month } = req.query
  const allIncomingsByPeriod = await Transaction.find({
    owner: id,
    year,
    month,
    typeOftransactions: true,
  })
  sendSuccessRes(res, { allIncomingsByPeriod }, 201)
}

module.exports = getAllIncomingsByPeriod
