import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'cl46test',
    password: 'liquid-cent-wood'
}
const preamble = 'You have logged out'

exports.login = () =>
    sleep(500)
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys(exports.creds.username))
        .then(findId('password').sendKeys(exports.creds.password))
        .then(findId('login').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logout').click())
        .then(sleep(1000))