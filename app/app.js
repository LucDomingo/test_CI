var express = require('express')
var bodyParser = require('body-parser')
var ident = require('../routes/ident')
var bill = require('../routes/bill')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(ident)
app.use(bill)

module.exports = app
