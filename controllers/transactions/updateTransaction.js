const { Transaction, User } = require('../../models')
const { sendSuccessRes } = require('../../helpers')
const { NotFound } = require('http-errors')

const updateTransaction = async (req, res) => {
  const { _id: userId, balance } = res.locals.user
  const { transactionId } = req.params

  const transaction = await Transaction.findOne({ _id: transactionId, owner: userId })
  let newBalance = null

  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} not found`)
  }

  const { amount, typeOftransactions: type } = transaction
  const newAmount = req.body.amount

  if (type) {
    newBalance = (balance - amount) + newAmount
  }

  if (!type) {
    newBalance = (balance + amount) - newAmount
  }

  const updatedTransaction = await Transaction.findOneAndUpdate({ _id: transactionId, owner: userId }, req.body, { new: true })
  await User.findByIdAndUpdate({ _id: userId }, { balance: newBalance }, { new: true })

  sendSuccessRes(res, updatedTransaction, 200, 'Transaction has been successfully updated')
}

module.exports = updateTransaction
