const http = require('http')

const server = http.createServer()

server.listen(8808)

server.on('request', (req, res) => {
    const url = req.url
    console.log(url)
    let resStr;
    if (url === '/hello') {
      resStr = 'hi there'
    } else if (url === '/bye') {
        resStr = 'see you next time'
    } else {
        resStr = 'good!!'
    }
    res.statusCode = 200
    res.end(resStr)
})

