const axios = require('axios')

function requestGet (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
    .catch((error) => {
      throw error
    })
}

module.exports = {
  requestGet: requestGet
}
