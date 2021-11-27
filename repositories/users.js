const { User } = require('../models')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../helpers')

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email })
  } catch (error) {
    console.log(error.message)
  }
}

const createUser = async ({ _id, name, email, password }) => {
  try {
    const verifyToken = nanoid()
    const user = new User({ _id, name, email, verifyToken })
    user.setPassword(password)

    await user.save()
    const data = {
      to: email,
      subject: 'Please confirm your email',
      html: `
  <a href="${process.env.BASE_URL}/api/users/verify/${verifyToken}">Confirm your email</a>
  `,
    }

    await sendEmail(data)
    return user
  } catch (error) {
    console.log(error.message)
  }
}

const createGoogleUser = async ({ _id, name, email }) => {
  try {
    const pass = nanoid()
    const user = new User({ _id, name, email, verifyToken: pass, verify: true })
    user.setPassword(pass)

    return await user.save()
  } catch (error) {
    console.log(error.message)
  }
}

const updateToken = async (id, token) => {
  try {
    return await User.updateOne({ _id: id }, { token })
  } catch (error) {
    console.log(error.message)
  }
}

const findUserById = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    console.log(error.message)
  }
}

const updateBalance = async (id, data) => {
  try {
    return await User.updateOne({ _id: id }, { balance: data })
  } catch (error) {
    console.log(error.message)
  }
}

const getBalance = async (id) => {
  try {
    return await User.findOne({ _id: id }, 'balance')
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  updateToken,
  findUserById,
  updateBalance,
  getBalance,
  createGoogleUser,
}
