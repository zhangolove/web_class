const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const request = require('request')
const session = require('express-session')
const qs = require('querystring')

const sessionUser = {}
const users = {}
const config = {
	'clientID'      : '1359775824115148', 
    'clientSecret'  : 'e893b9ec93a273b67954857cb46852f9', 
    'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
}



const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	} else {
		res.redirect('/login')
	}
}

const profile = (req, res) => {
	res.send('ok now waht', req.user)
}
const logout = (req, res) => {

	req.logout();
	res.redirect('/')
}

const hello = (req, res) => {
	res.send({'hello':'world'})
}

const fail = (req, res) => {
    res.send({'fail':req.user})
}


passport.serializeUser((user, done) => {
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	done(null, users[id])
})

passport.use(new FacebookStrategy(config,
	(token, refreshToken, profile, done) => {
		process.nextTick(() => {
			return done(null,profile)
		})
	}))




module.exports = (app) => {
	const cookieParser = require('cookie-parser')
	app.use(session({ secret: 'thisIsMySecretxoxo'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login', 
		passport.authenticate('facebook',{ scope:'email' }))
	app.use('/callback', 
		passport.authenticate('facebook', {
			successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/profile', isLoggedIn, profile)
	app.use('fail', fail)
	app.use('logout', logout)
	app.use('/', hello)

}