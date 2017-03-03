const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)
     const url = req.url
     let payload
     res.statusCode = 200
     res.setHeader('Content-Type', 'application/json')
     if (url === '/' && req.method == 'GET') {
        payload = { 'hello': 'world' }
        
     }else if (url === '/articles'&& req.method == 'GET') {
        payload = {'articles': [{id: 1, author: "Scott", body:"A post"},
                                 {id: 2, author: "Scott1", body:"A post1"},
                                 {id: 3, author: "Scott2", body:"A post2"}]}
     }else if (url === '/login' && req.method == 'POST') {
         try {
            username = JSON.parse(req.body)['username']
            payload = {username, result:'success'}
        } catch(e) {
           res.statusCode = 400
        }
     }else if (url === '/logout' && req.method == 'PUT'){
        res.setHeader('Content-Type', 'text')
        payload = 'OK'
        res.end(payload)
        return
     }else {
         res.statusCode = 400
     }

     
     res.end(JSON.stringify(payload))
     
}
