
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const profile = {
        headline: 'This is my headline!',
        email: 'foo@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
    }

const getHeadlines = (req, res) => {

    const users = req.params.users ? req.params.users.split(',') : ['Scott']

    res.send({ headlines: [ 
        { username: users[0], headline: profile.headline } 
    ] })
}

const putHeadline = (req, res) => {

    res.send({ 
        username: 'Scott', headline: req.body["headline"] } 
    )
}

const getEmail = (req, res) => {
    const username = req.params.user ? req.params.user : 'Scott'
    res.send({ 
        username , email: profile.email } 
    )
}

const putEmail = (req, res) => {
    
    res.send({ 
        username: 'scott', email: req.body["email"] } 
    )
}

const getZip = (req, res) => {
    const username = req.params.user ? req.params.user : 'Scott'
    res.send({ 
        username , zipcode: profile.zipcode } 
    )
}

const putZip = (req, res) => {
    res.send({ 
        username: 'scott', zipcode: req.body["zipcode"] } 
    )
}


const getAvatars = (req, res) => {

    const users = req.params.users ? req.params.users.split(',') : ['Scott']

    res.send({ avatars: [ 
        { username: users[0], avatar: profile.avatar } 
    ] })
}

const putAvartar = (req, res) => {

    res.send({ 
        username: 'Scott', avatar: req.body["avatar"] } 
    )
}


module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users*?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZip)
     app.put('/zipcode', putZip)
     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvartar)
}
