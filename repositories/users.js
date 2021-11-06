const { User } = require('../models')

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email })
  } catch (error) {
    console.log(error.message)
  }
}

const createUser = async ({ _id, email, password }) => {
  try {
    const user = new User({ _id, email })
    user.setPassword(password)

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

const updateBalance = async (data) => {
  try {
    return await User.updateOne({ balance: data })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  updateToken,
  findUserById,
  updateBalance
}
