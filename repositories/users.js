const { User } = require('../models')
const { nanoid } = require('nanoid')

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async ({ name, email, password }) => {
  const verifyToken = nanoid()
  const user = new User({ name, email, verifyToken })
  user.setPassword(password)

  return await user.save()
}

const createGoogleUser = async ({ name, email, password }) => {
  const user = new User({ name, email, verify: true })
  user.setPassword(password)

  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const findUserById = async (id) => {
  return await User.findById(id)
}

const updateBalance = async (id, data) => {
  return await User.updateOne({ _id: id }, { balance: data })
}

const getBalance = async (id) => {
  return await User.findOne({ _id: id }, 'balance')
}

module.exports = {
  findUserByEmail,
  createUser,
  updateToken,
  findUserById,
  updateBalance,
  getBalance,
  createGoogleUser
}
