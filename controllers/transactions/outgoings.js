const { sendSuccessRes } = require('../../helpers')
const { Transaction, User } = require('../../models')

const outgoings = async (req, res) => {
  const id = res.locals.user._id
  const newOutgoing = { ...req.body, owner: id }
  const result = await Transaction.create(newOutgoing)

  const newBalance = res.locals.user.balance - newOutgoing.amount

  await User.findByIdAndUpdate(id, { balance: newBalance }, { new: true })

  sendSuccessRes(res, { result }, 201)
}

module.exports = outgoings
