const mongoose = require('mongoose')
const { Schema, model } = mongoose

const transactionSchema = Schema({

  typeOftransactions: {
    type: Boolean
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  fullDate: {
    type: String
  },
  month: {
    type: String
  },
  day: {
    type: String
  }

}, { versionKey: false, timestamps: true })

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction

//   const data = Date.now()
//   var options = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   timezone: 'UTC',

// };

//   console.log(data.toLocaleString("ru", options));
