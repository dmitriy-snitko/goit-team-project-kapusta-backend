const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/index')
// const ctrl = require('../../controllers/transactions/index')
const guard = require('../../helpers/guard')
const { userJoiSchema, updatebalanceJoiSchema, userJoiSchemaLogin } = require('../../models')
const { validation } = require('../../middlewares')

router.post('/signup', validation(userJoiSchema), controllers.signUp)
router.post('/login', validation(userJoiSchemaLogin), controllers.logIn)
router.post('/logout', guard, controllers.logout)
router.post('/', guard, validation(updatebalanceJoiSchema), controllers.userBalanceUpdate)
router.get('/', guard, controllers.getUserBalance)
router.get('/current', controllers.getCurrent)

module.exports = router
