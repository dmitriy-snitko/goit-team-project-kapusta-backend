const { BASE_URL } = process.env

const createEmail = (name, verifyToken) => {
  const html = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet">
  <title>Document</title>
  <style>
    .body,
    h1,
    p {
      margin: 0;
      padding: 0;
    }

    p {
      margin-bottom: 25px;
    }

    .body {
      font-family: Roboto;
      font-style: normal;
      font-size: 14px;
      letter-spacing: 0.04em;

      color: #52555F;
    }

    header {
      margin-bottom: 20px;
      padding-top: 20px;
    }

    .container {
      margin: 0 auto;
      padding: 0 20px;
      max-width: 436px;
    }

    .logo {
      width: 160px;
      margin-left: auto;
    }

    .logo h1 {
      font-size: 42px;
      color: #000000;
    }

    .logo p {
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-left: 10px;
    }

    button {
      display: block;
      margin: 0 auto;
      margin-bottom: 25px;
      padding: 12px 34px;

      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.02em;
      text-transform: uppercase;

      border: none;
      border-radius: 16px;

      color: #FFFFFF;
      background-color: #FF751D;
    }

    a {
      text-decoration: none;
    }

    .main-text {
      box-sizing: border-box;
      height: 500px;
      padding: 30px;
      padding-top: 40px;
      background: #FFFFFF;

      border-radius: 30px;
      border-right: 3px solid rgb(231, 231, 231);
      border-bottom: 3px solid rgb(231, 231, 231);
      border-left: 1px solid #F5F6FB;
      border-top: 1px solid #F5F6FB;

      background-image: url('https://i.ibb.co/Vv7ssKj/bgBottom.jpg');
      background-repeat: no-repeat;
      background-position: bottom 25px right 30px;
    }

  </style>
</head>
<body class="body">
  <div style="max-width: 768px; margin: 0 auto; background-image: url('https://i.ibb.co/nMSYP6k/bgTop.jpg'); background-repeat: no-repeat; background-position: top left;">
    <header>
      <div class="container">
        <div class="logo">
          <h1>Kapu$ta</h1>
          <p>Smart Finance</p>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="main-text">
          <p>Hello, ${name}!</p>
    
          <p>
            You registered an account on <span>Kapusta smart finance</span>, before being able to use your account you need
            to verify that this is your email address by clicking here:
          </p>
    
          <a href="${BASE_URL}/api/users/verify/${verifyToken}">
            <button type="button">Verify Your email</button>
          </a>
    
          <p>
            Kind Regards, <span>Kapusta smart finance.</span>
          </p>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
  `

  return html
}

module.exports = createEmail
