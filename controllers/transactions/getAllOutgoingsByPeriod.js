const { Transaction } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getAllOutgoingsByPeriod = async (req, res, next) => {
  const id = res.locals.user.id
  const { year, month } = req.query
  const allOutgoingsByPeriod = await Transaction.find({
    owner: id,
    year,
    month,
    typeOftransactions: false,
  })
  sendSuccessRes(res, { allOutgoingsByPeriod }, 201)
}

module.exports = getAllOutgoingsByPeriod
