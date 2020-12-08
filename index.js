const axios = require("axios")

exports.fetchProducts = endpoint => {

  return axios
    .get('/product', {
      baseURL: endpoint,
      headers: { Accept: 'application/json', 'Content-Type':  'application/json; charset=utf-8' },
      data: {}
    })
    .then(response => response.data)
}