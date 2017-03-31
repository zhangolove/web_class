import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Authentication', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

   
    // it("Update the headline and verify the change", (done) => {
    //     const oldHeadline = "old old old"
    //     const newHeadline = "new new new"
    //     const prefix = `${preamble} ${common.creds.username}`
    //     sleep(500)
    //         .then(findId('newHeadline').clear())
    //         .then(findId('newHeadline').sendKeys(oldHeadline))
    //         .then(findId('headline').click())
    //         .then(sleep(2000))
    //         .then(findId('message').getText()
    //             .then(text => {
    //                 expect(text).to.equal(`${prefix} "${oldHeadline}"`)}))
    //         .then(findId('newHeadline').clear())
    //         .then(findId('newHeadline').sendKeys(newHeadline))
    //         .then(findId('headline').click())
    //         .then(sleep(2000))
    //         .then(findId('message').getText()
    //             .then(text => {
    //                 expect(text).to.equal(`${prefix} "${newHeadline}"`)}))
    //         .then(done)
    // })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
