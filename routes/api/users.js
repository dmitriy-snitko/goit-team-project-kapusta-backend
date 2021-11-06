const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/index')
const guard = require('../../helpers/guard')

router.post('/singup', controllers.signUp)
router.post('/login', controllers.logIn)
router.post('/logout', guard, controllers.logout)
router.post('/', guard, controllers.userBalanceUpdate)
router.get('/', guard, controllers.getUserBalance)
module.exports = router
