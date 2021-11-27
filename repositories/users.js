const { User } = require('../models')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../helpers')

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async ({ name, email, password }) => {
  const verifyToken = nanoid()
  const user = new User({ name, email, verifyToken })
  user.setPassword(password)

  await user.save()
  const data = {
    to: email,
    subject: 'Please confirm your email',
    html: `<a href="${process.env.BASE_URL}/api/users/verify/${verifyToken}">Confirm your email</a>`
  }

  return await sendEmail(data)
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
