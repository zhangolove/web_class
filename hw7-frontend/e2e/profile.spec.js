import { expect } from 'chai'
import { go, sleep, findId, findCSS, findAllClass, 
                findClass, By } from './selenium'
import common from './common'

describe('Test Main Page functionalities', () => {


    it("should log in", (done) => {
        go().then(common.login).then(done)
    })

    // it ("should post new article and appear in feed", (done) => {
    //     const text = "test new article" + Math.random()
    //     sleep(500)
    //         .then(findClass('inputAddArticle').sendKeys(text))
    //         .then(findId('btnAddArticle').click())
    //         .then(sleep(1000))
    //         .then(findClass("t_articleContent")
    //                 .getText()
    //                 .then(content => expect(content).to.be.eql(text)))
    //         .then(done)
    //         .catch(done)
    // })

    
    it("should navigate to the profile page", (done) => {
        sleep(500)
            .then(findId('btnRedirect2Profile').click())
            .then(done)
            .catch(done)
    })

    

    const updateAndVerify = (fieldId, val, done) => {
        findId(fieldId).sendKeys(val)
            .then(findId("btnUpdateProfile").click())
            .then(sleep(1000))
            .then(() => findId(fieldId)
                .getAttribute("placeholder"))
            .then(text => {expect(text).to.eql(val)})
            .then(done)
            .catch(done)
    }

    it("should update email", (done) => {
        updateAndVerify('inputemail', 'newemail@gmail.com', done)
    })

    it("should update zipcode", (done) => {
        const min = 10000
        const max = 99999
        const num = Math.floor(Math.random() * (max - min + 1)) + min
        updateAndVerify('inputzipcode', num.toString(), done)
    })

    it("should update password and diplay message", (done) => {
        const val = 'hello'
        const msg = "Your password would not change"
        findId('inputpwd').sendKeys(val)
            .then(findId('inputpwd1').sendKeys(val))
            .then(findId("btnUpdateProfile").click())
            .then(sleep(1000))
            .then(findId('alertMsg').getText()
                .then(text=>expect(text).to.contains(msg)))
            .then(done)
            .catch(done)
    })

   it("should log out", (done) => {
        common.logout().then(done)
    })
})
