var express = require('express');
var app = express();
var path = require('path');

var nodemailer = require('nodemailer');
//const creds = require('./config/config');
console.log('User: ', process.env.USER);
var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

app.use(express.static(path.join(__dirname, './'))); //  "public" off of current is root

app.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${content} `

  var mail = {
    from: name,
    to: 'beyondjustcode@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

app.listen(process.env.PORT || 3000);
console.log('Listening on port 80');
