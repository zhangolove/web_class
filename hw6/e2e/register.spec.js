import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'



exports.login = () =>
    sleep(500)
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys(exports.creds.username))
        .then(findId('password').sendKeys(exports.creds.password))
        .then(findId('login').click())
        .then(sleep(2000))


describe('Test Authentication', () => {

    it('should log in as the test user', (done) => {
        go().then(common.login)
            .then(()=>sleep(500))
            .then(common.logout)
            .then(done)
    })

    it('should register and alert the user', (done) => {
        const msg = 'Registration succeeded. Please log in'
        const alertId = 'alertMsg'
        go().then(findId('rusername').sendKeys('abcdefg'))
            .then(findId('rdname').sendKeys('abcdefg123'))
            .then(findId('remail').sendKeys('a@b.com'))
            .then(findId('rdob').sendKeys('12/05/1995'))
            .then(findId('rphone').sendKeys('1234567890'))
            .then(findId('rzipcode').sendKeys('77005'))
            .then(findId('rpwd1').sendKeys('a'))
            .then(findId('rpassword').sendKeys('a'))
            .then(findId('register').click())
            .then(()=>sleep(500))
            .then(findId(alertId).getText()
                    .then(text=>expect(text).to.contains(msg)))
            .then(sleep(2000))
            .then(done)
    })

})
