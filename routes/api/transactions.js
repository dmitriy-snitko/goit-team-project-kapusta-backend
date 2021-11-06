const express = require('express')
const router = express.Router()

const { transactionJoiSchema } = require('../../models/transaction')
const { validation, ctrlWrap } = require('../../middlewares')

const controllers = require('../../controllers/transactions')
const guard = require('../../helpers/guard')

router.post(
  '/incoming',
  guard,
  validation(transactionJoiSchema),
  ctrlWrap(controllers.incoming),
)
router.post(
  '/outgoings',
  guard,
  validation(transactionJoiSchema),
  ctrlWrap(controllers.outgoings),
)

router.delete(
  '/:transactionId',
  guard,
  ctrlWrap(controllers.removeTransactionById),
)

module.exports = router
