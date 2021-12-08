const { BASE_URL } = process.env

const createEmail = (name, verifyToken) => {
  const html = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap');

  </style>
</head>

<body style="margin: 0; font-family: Arial, Helvetica, sans-serif;">
  <table style="width: 100%; max-width: 768px; margin: 0 auto; border-collapse: collapse; background-repeat: no-repeat; font-size: 14px; color: #52555F"
    background="https://i.ibb.co/nMSYP6k/bgTop.jpg">
    <tr>
      <td></td>
      <td
        style="height: 100px; width: 436px; background: url(https://i.ibb.co/q1k4MQP/logo.png); background-repeat: no-repeat; background-position: right bottom;">
      </td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td style="padding-top: 40px; text-align: center;">
        <div
          style="padding: 30px; box-sizing: border-box; border-radius: 30px; border-right: 3px solid #e1e1e1; border-left: 1px solid #F5F6FB; border-bottom: 3px solid #e1e1e1; background: #FFFFFF;">
          <p style="text-align: left; margin-bottom: 30px;">Hello, ${name}!</p>

          <p style="text-align: left; margin-bottom: 30px;">
            You registered an account on <span>Kapusta smart finance</span>, before being able to use your account you
            need
            to verify that this is your email address by clicking here:
          </p>
         <a href="${BASE_URL}/api/users/verify/${verifyToken}"
            style="text-transform: uppercase; background: #FF751D; padding: 12px 34px; border-radius: 16px; color: #FFFFFF; text-decoration: none; display: inline-block; margin: 0 auto; margin-bottom: 15px;">Verify
            Your email
          </a>

          <p style="text-align: left; margin-bottom: 30px;">
            Kind Regards, <span>Kapusta smart finance.</span>
          </p>
          <div style="height: 150px; background: url('https://i.ibb.co/Vv7ssKj/bgBottom.jpg'); background-repeat: no-repeat; background-position: bottom right;">
          </div>
        </div>
      </td>
      <td></td>
    </tr>
  </table>

  </div>
</body>

</html>
  `

  return html
}

module.exports = createEmail
