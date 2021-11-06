const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = Schema({

  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },

  token: {
    type: String,
    default: null
  },
  verifyToken: {
    type: String

  },
  balance: {
    type: Number
  }

}, { versionKey: false, timestamps: true })

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
