const Users = require('../../repositories')
const { OK } = require('../../helpers/constants')

const getUserBalance = async (req, res, next) => {
  const id = res.locals.user.id
  await Users.findUserById(id)
  const userbalance = await Users.getBalance(id)
  return res
    .status(OK)
    .json({ status: 'succes', payload: userbalance })
}

module.exports = getUserBalance
