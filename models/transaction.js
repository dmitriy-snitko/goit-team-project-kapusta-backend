const { Schema, model } = require('mongoose')

const userSchema = Schema(
  {},
  { versionKey: false, timestamps: true },
)

const Transaction = model('transaction', userSchema)

module.exports = {
  Transaction
}
