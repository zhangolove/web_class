const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')


const allowedOrigin = 'http://localhost:8080'

const cors = (req, res, next) => {
	console.log('entered cors')
    //only allows connection from 'http://localhost:8080'
	res.header('Access-Control-Allow-Origin', allowedOrigin)
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,\
									 Content-Type, Accept')
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	if (req.method === 'OPTIONS'){
		res.status(200).send('OK')  
		console.log('send ok cors')
	} else {
		next()
	}

}

const app = express()
app.use(logger('default'))
app.use(bodyParser.json())
app.use(cors)
require('./articles.js')(app)
require('./profile.js')(app)
require('./auth.js')(app)
require('./following.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
app.listen(port, () => {
	//const addr = server.address()
	//console.log(`Server listening at http://${addr.address}:${addr.port}`)
})