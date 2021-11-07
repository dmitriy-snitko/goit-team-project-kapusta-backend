const { sendSuccessRes } = require('../../helpers')
const { Transaction } = require('../../models')

const outgoings = async (req, res) => {
  const data = new Date()
  const monthOptions = { month: 'long', timezone: 'UTC' }
  const month = data.toLocaleString('ru', monthOptions)
  const yearOptions = { year: 'numeric', timezone: 'UTC' }
  const year = data.toLocaleString('ru', yearOptions)
  const newOutgoing = { ...req.body, owner: res.locals.user._id, month: month, year: year, typeOftransactions: false }
  const result = await Transaction.create(newOutgoing)
  sendSuccessRes(res, { result }, 201)
}

module.exports = outgoings

// const data = new Date()
// const options = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   timezone: 'UTC'

// }

// console.log(data.toLocaleString('ru', options))
