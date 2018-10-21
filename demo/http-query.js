const http = require('http')
const qs = require('querystring')

const server = http.createServer()

server.listen(8808)

server.on('request', (req, res) => {
    const url = req.url
    const queryString = url.substr(url.indexOf('?') + 1, url.length)
    const query  = qs.parse(queryString)
    console.log(query)
    let resStr;
    if (url.indexOf('/hello') > -1) {
      resStr = 'hi there'
      if (query.a === '1' && Number(query.b) > 200) {
        resStr = 'go away!'
      }
    } else if (url.indexOf('/bye') > -1) {
        resStr = 'see you next time'
    } else {
        resStr = 'good!!'
    }
    res.statusCode = 200
    res.end(resStr)
})

