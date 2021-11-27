const express = require('express')
const router = express.Router()
const guard = require('../../helpers/guard')
const { validation, ctrlWrap } = require('../../middlewares')
const { transactionJoiSchema } = require('../../models/transaction')
const { transactions: ctrl } = require('../../controllers')

router.get('/', guard, ctrlWrap(ctrl.detailedInformation))
router.get('/incomings', guard, ctrlWrap(ctrl.incomingsSummaryForYear))
router.get('/outgoings', guard, ctrlWrap(ctrl.outgoingsSummaryForYear))
router.get('/incomings/date', guard, ctrlWrap(ctrl.getAllIncomingsByPeriod))
router.get('/outgoings/date', guard, ctrlWrap(ctrl.getAllOutgoingsByPeriod))
router.get('/forReports', guard, ctrlWrap(ctrl.getInfoForReports))

router.post('/incomings', guard, validation(transactionJoiSchema), ctrlWrap(ctrl.incomeings))
router.post('/outgoings', guard, validation(transactionJoiSchema), ctrlWrap(ctrl.outgoings))

router.delete('/:transactionId', guard, ctrlWrap(ctrl.removeTransactionById))

module.exports = router
