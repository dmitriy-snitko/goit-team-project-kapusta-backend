const { Schema, model } = require('mongoose')
const Joi = require('joi')

const transactionSchema = Schema(
  {
    typeOftransactions: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    fullDate: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
)

const transactionJoiSchema = Joi.object({
  typeOftransactions: Joi.boolean().required(),

  amount: Joi.number().required(),

  description: Joi.string().required(),

  category: Joi.string().required(),

  fullDate: Joi.string(),

  month: Joi.string().required(),

  year: Joi.string().required()
})

const transactionByMonthJoiSchema = Joi.object({
  year: Joi.number().required(),

  month: Joi.string().required(),
})

const balanceByYearJoiSchema = Joi.object({
  year: Joi.string().required(),
})

const Transaction = model('transaction', transactionSchema)

module.exports = {
  Transaction,
  transactionJoiSchema,
  balanceByYearJoiSchema,
  transactionByMonthJoiSchema,
}

//   const data = Date.now()
//   var options = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   timezone: 'UTC',

// };

//   console.log(data.toLocaleString("ru", options));
