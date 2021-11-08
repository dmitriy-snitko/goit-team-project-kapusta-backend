const { Transaction } = require('../../models')
const HttpCode = require('../../helpers/constants')

const getBalanceIncomings = async (req, res, next) => {
  try {
    const id = res.locals.user.id
    const year = req.body.year
    const userBalance = await Transaction.find({ owner: id, year: year, typeOftransactions: false })
    return res.status(HttpCode.OK).json({ status: 'succes', data: userBalance })
  } catch (error) {
    next(error)
  }
}

module.exports = getBalanceIncomings
