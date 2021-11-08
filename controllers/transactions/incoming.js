const { sendSuccessRes } = require('../../helpers')
const { Transaction } = require('../../models')

const incoming = async (req, res) => {
  const data = new Date()
  const monthOptions = { month: 'long', timezone: 'UTC' }
  const month = data.toLocaleString('ru', monthOptions)
  const yearOptions = { year: 'numeric', timezone: 'UTC' }
  const year = data.toLocaleString('ru', yearOptions)
  const newOutgoing = {
    ...req.body,
    owner: res.locals.user._id,
    month: month,
    year: year,
    typeOftransactions: true,
  }
  const result = await Transaction.create(newOutgoing)
  sendSuccessRes(res, { result }, 201)
}

module.exports = incoming
