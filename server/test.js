var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()

app.get('/setcookie/:name', cookieParser('mysecret'), function (req, res) {
  res.cookie(req.params.name, "my secret cookie", {
    httpOnly: true,
    signed: true
  })
  res.send(`cookie ${req.params.name} set`)
})

app.get('/', cookieParser('mysecret'), function (req, res) {
  res.json(req.signedCookies)
})

app.listen(8080)