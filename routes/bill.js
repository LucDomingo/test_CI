var express = require('express')
var router = express.Router()
var utils = require('../utils/utils.js')

router.route('/bill')
  .post(function (req, res) {
    const body = req.body
    utils.finalPrice(body)
      .then((price) => {
        res.json({ total: price })
      })
      .catch((error) => {
        res.json({ error: error.toString() })
      })
  })

module.exports = router
