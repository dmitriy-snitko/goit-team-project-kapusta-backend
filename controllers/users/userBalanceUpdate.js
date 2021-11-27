const Users = require('../../repositories')
const { OK } = require('../../helpers/constants')

const userBalanceUpdate = async (req, res, next) => {
  const { balance } = req.body
  const id = res.locals.user.id
  await Users.findUserById(id)
  await Users.updateBalance(id, balance)
  return res.status(OK).json({ status: 'succes', payload: balance })
}

module.exports = userBalanceUpdate
