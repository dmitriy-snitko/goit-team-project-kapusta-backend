const { sendSuccessRes } = require('../../helpers')
const { Transaction } = require('../../models')

const outgoings = async (req, res) => {
  console.log(res.locals.user._id)
  const newOutgoing = { ...req.body, owner: res.locals.user._id }
  const result = await Transaction.create(newOutgoing)
  sendSuccessRes(res, { result }, 201)
}

module.exports = outgoings
