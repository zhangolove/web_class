
const express = require('express')
const bodyParser = require('body-parser')

const repo = [{id: 1, text:"A post"},
                                 {id: 2, text:"A post1"},
                                 {id: 3, text:"A post2"}]
const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     const text = req.body["text"]
     if (text) {
        id = repo.length + 1
        repo.push({id, text})
        res.send({id, text})
     }
     
}

const fetchArticles = (req, res) => {
    res.send({'articles': repo})
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', fetchArticles)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
