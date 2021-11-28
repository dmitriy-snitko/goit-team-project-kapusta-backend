const queryString = require('query-string')
const axios = require('axios')
const Users = require('../../repositories')

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code
  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code
    }
  })
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`
    }
  })

  const { id, email, given_name: name } = userData.data
  let user = await Users.findUserByEmail(email)

  if (!user) {
    const newUser = {
      email,
      name,
      password: id
    }
    user = await Users.createGoogleUser(newUser)
  }

  const token = user.createToken()
  await Users.updateToken(user.id, token)

  return res.redirect(
    `${process.env.HOME_URL}/google-redirect/?` +
      `token=${token}&` +
      `email=${user.email}&` +
      `balance=${user.balance}&` +
      `name=${user.name}`
  )
}

module.exports = googleRedirect
