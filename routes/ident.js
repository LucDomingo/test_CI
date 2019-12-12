var express = require('express')
var router = express.Router()

router.route('/ident')
  .get(function (req, res) {
    res.json({ id: 'it340-2019-carpaccio-LucDomingo' })
  })

module.exports = router
