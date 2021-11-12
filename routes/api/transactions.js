const express = require('express')
const router = express.Router()

const {
  transactionJoiSchema,
  transactionByMonthJoiSchema
} = require('../../models/transaction')
const { validation, ctrlWrap } = require('../../middlewares')

const controllers = require('../../controllers/transactions')
const guard = require('../../helpers/guard')

router.get('/', guard, ctrlWrap(controllers.detailedInformation))
router.post(
  '/incomings',
  guard,
  validation(transactionJoiSchema),
  ctrlWrap(controllers.incomeings)
)
router.post(
  '/outgoings',
  guard,
  validation(transactionJoiSchema),
  ctrlWrap(controllers.outgoings)
)

router.delete(
  '/:transactionId',
  guard,
  ctrlWrap(controllers.removeTransactionById)
)

router.get('/incomings', guard, ctrlWrap(controllers.incomingsSummaryForYear))
router.get('/outgoings', guard, ctrlWrap(controllers.outgoingsSummaryForYear))

router.get(
  '/incomings/month',
  guard,
  validation(transactionByMonthJoiSchema),
  controllers.getIncomingsByMonth
)
router.get(
  '/outgoings/month',
  guard,
  validation(transactionByMonthJoiSchema),
  controllers.getOutgoingsByMonth
)

module.exports = router
