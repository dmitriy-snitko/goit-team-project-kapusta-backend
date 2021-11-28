const passport = require('passport')
require('./passport')
const { UNAUTHORIZED } = require('../helpers/constants')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const headerAuth = req.get('Authorization')
    // console.log(headerAuth)
    let token = null
    if (headerAuth) {
      token = headerAuth.split(' ')[1]
    }
    if (err || !user || token !== user?.token) {
      return res.status(UNAUTHORIZED).json({
        status: 'error',
        code: UNAUTHORIZED,
        message: 'Not authorized guard'
      })
    }
    res.locals.user = user // req.user = user; так зазвичай роблять.

    return next()
  })(req, res, next)
}

module.exports = guard
