import { expect } from 'chai'
import { go, sleep, findId, findCSS, findAllClass, 
                findClass, By } from './selenium'
import common from './common'

describe('Test Main Page functionalities', () => {


    it("should log in", (done) => {
        go().then(common.login).then(done)
    })

    it ("should post new article and appear in feed", (done) => {
        const text = "test new article" + Math.random()
        sleep(500)
            .then(findClass('inputAddArticle').sendKeys(text))
            .then(findId('btnAddArticle').click())
            .then(sleep(1000))
            .then(findClass("t_articleContent")
                    .getText()
                    .then(content => expect(content).to.be.eql(text)))
            .then(done)
            .catch(done)
    })

    

    it ("should Edit an article and validate the \
                article text has updated", (done) => {
        const text = "test edit new article" + Math.random()
        sleep(500)
            .then(findClass('btnToggleEdit').click())
            .then(findClass('areaEditArticle').clear())
            .then(findClass('areaEditArticle').sendKeys(text))
            .then(findClass('btnEditArticle').click())
            .then(sleep(1000))
            .then(findClass("t_articleContent")
                    .getText()
                    .then(content => expect(content).to.be.eql(text)))
            .then(done)
            .catch(done)
    })


    it ("should Update the status headline", (done) => {
        const text = "test edit headline" + Math.random()
        sleep(500)
            .then(findId('inputHeadline').clear())
            .then(findId('inputHeadline').sendKeys(text))
            .then(findId('btnHeadline').click())
            .then(sleep(1000))
            .then(findId("hHead")
                    .getText()
                    .then(content => expect(content).to.be.eql(text)))
            .then(done)
            .catch(done)
    })

    const countFollowing = () => 
            findAllClass("hFollowing")
                .then(followings => followings.length)
    const toAdd = "Follower"

    it ("should add a user to the list of followed users", (done) => {
        
        let numFollowing
        
        countFollowing()
            .then(num => numFollowing = num)
            .then(findId('inputAddFollowing').clear())
            .then(findId('inputAddFollowing').sendKeys(toAdd))
            .then(findId('btnAddFollowing').click())
            .then(sleep(1000))
            .then(countFollowing)
            .then(num => {expect(num).to.eql(numFollowing + 1)})
            .then(done)
            .catch(done)
    })

    it ("should remove a user to the list of followed users", (done) => {
        
        let numFollowing
        
        countFollowing()
            .then(num => numFollowing = num)
            .then(findAllClass('btnRemoveFollowing')
                    .then(f => f[numFollowing-1].click()))
            .then(sleep(1000))
            .then(countFollowing)
            .then(num => {expect(num).to.eql(numFollowing - 1)})
            .then(done)
            .catch(done)
    })


    it ("should search for \"Only One Article Like This\"\
           and show only one article ", (done) => {
        
        const query = "Only One Article Like This"
        findId("inputSearchArticle")
            .sendKeys(query)
            .then(() =>findAllClass("articleAuthor"))
            .then(authors => {
                expect(authors).to.have.length(1)
                return authors[0].getText()
            })
            .then(a => {expect(a).to.contains('cl46test')})
            .then(done)
            .catch(done)
    })

    

   
   it("should log out", (done) => {
        common.logout().then(done)
    })
})
