const { sendSuccessRes } = require('../../helpers')
const { Transaction } = require('../../models')

const removeTransactionById = async (req, res) => {
  const id = req.params.contactId
  const result = await Transaction.findByIdAndDelete(id)

  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id:${req.params.contactId} not found`,
    })
    return
  }
  sendSuccessRes(res, { message: 'Contact deleted' })
}

module.exports = removeTransactionById
