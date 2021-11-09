const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/index')
// const ctrl = require('../../controllers/transactions/index')
const guard = require('../../helpers/guard')
const { userJoiSchema, updatebalanceJoiSchema } = require('../../models')
const { validation } = require('../../middlewares')

router.post('/signup', validation(userJoiSchema), controllers.signUp)
router.post('/login', validation(userJoiSchema), controllers.logIn)
router.post('/logout', guard, controllers.logout)
router.post('/', guard, validation(updatebalanceJoiSchema), controllers.userBalanceUpdate)
router.get('/', guard, controllers.getUserBalance)
module.exports = router
