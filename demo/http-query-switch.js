const http = require('http')
const qs = require('querystring')
const users = []
const server = http.createServer()

server.listen(8808)

server.on('request', (req, res) => {
    const url = req.url
    console.log('url', url)
    
    let resStr;
    const path = url.substr(0, url.indexOf('?'))
    const queryString = url.substr(url.indexOf('?') + 1, url.length)
    const query  = qs.parse(queryString)
    switch(path) {
        case '/user':
        switch (req.method) {
            case 'GET':
                res.statusCode = 200
                res.end(JSON.stringify(users))
                break
            case 'POST':
                const contentType = req.headers['content-type']
                if (contentType !== 'application/json') {
                  res.statusCode = 400
                  res.end('error')
                }   
                console.log(contentType)
                
                let reqBodyStr = ''
                req.on('data', data => {
                    reqBodyStr += data.toString()
                })
                req.on('end', () => {
                    // 前端需要先stringify参数，因为后端是先parse参数的
                    const user = JSON.parse(reqBodyStr)
                    users.push(user)
                    res.statusCode = 200
                    res.end(JSON.stringify(user))
                })
                break
        }
        break
        default: 
        res.statusCode = 404
        res.end('not found')
    }
})

