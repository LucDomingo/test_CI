const app = require('../app/app')
var hostname = 'localhost'
var port = 3000

app.listen(port, hostname, function () {
  console.log('waiting request on  http://' + hostname + ':' + port)
})
