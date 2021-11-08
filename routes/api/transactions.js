const express = require('express')
const router = express.Router()

const {
  transactionJoiSchema,
  transactionByMonthJoiSchema,
} = require('../../models/transaction')
const { validation, ctrlWrap } = require('../../middlewares')

const controllers = require('../../controllers/transactions')
const guard = require('../../helpers/guard')

router.get('/', guard, ctrlWrap(controllers.getAllByUser))
router.post(
  '/incomings',
  guard,
  validation(transactionJoiSchema),
  ctrlWrap(controllers.incomings),
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

router.get('/incomings', guard, controllers.getAllIncomingsByPeriod)
router.get('/outgoings', guard, controllers.getAllOutgoingsByParams)

router.get(
  '/incomings/month',
  guard,
  validation(transactionByMonthJoiSchema),
  controllers.getIncomingsByMonth,
)
router.get(
  '/outgoings/month',
  guard,
  validation(transactionByMonthJoiSchema),
  controllers.getOutgoingsByMonth,
)

module.exports = router
