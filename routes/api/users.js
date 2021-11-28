const express = require('express')
const router = express.Router()
const { users: ctrl } = require('../../controllers')
const guard = require('../../helpers/guard')
const { userJoiSchema, updatebalanceJoiSchema, userJoiSchemaLogin } = require('../../models')
const { validation, ctrlWrap } = require('../../middlewares')

router.post('/',
  guard,
  validation(updatebalanceJoiSchema),
  ctrlWrap(ctrl.userBalanceUpdate)
)
router.post('/signup',
  validation(userJoiSchema),
  ctrlWrap(ctrl.signUp)
)
router.post('/login',
  validation(userJoiSchemaLogin),
  ctrlWrap(ctrl.logIn)
)
router.post('/logout',
  guard,
  ctrlWrap(ctrl.logout)
)
router.post('/verify',
  ctrlWrap(ctrl.verify)
)

router.get('/',
  guard,
  ctrlWrap(ctrl.getUserBalance)
)
router.get('/verify/:verifyToken',
  ctrlWrap(ctrl.verifyToken)
)
router.get('/current',
  guard,
  ctrlWrap(ctrl.getCurrent)
)
router.get('/google',
  ctrlWrap(ctrl.googleAuth)
)
router.get('/google-redirect',
  ctrlWrap(ctrl.googleRedirect)
)

module.exports = router
