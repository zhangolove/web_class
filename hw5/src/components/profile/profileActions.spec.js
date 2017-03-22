import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Validate profile actions', function() {
    let actions, actionTypes, url, Actions
    
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        //Action = require('./actions').default
        actions = require('./profileActions')
        Actions = require('../../actions')
        actionTypes = Actions.ActionTypes
        url = Actions.url
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })


    it('should fetch the user\'s proile information',(done)=>{
        const userProfile = 
            {avatars: 'test0', email: 'e1', zipcode: 'z1', dob: 'dob1'}
        mock(`${url}/avatars`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                json: { avatars: userProfile.avatars }
            })

            mock(`${url}/email`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                json: { email: userProfile.email }
            })

            mock(`${url}/zipcode`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                json: { zipcode: userProfile.zipcode }
            })

            mock(`${url}/dob`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                json: { dob: userProfile.dob }
            })

        actions.fetchProfile()((action) => {
            expect(action.type).to.eql(actionTypes.UPDATE_PROFILE)
            const key = Object.keys(action.field)[0]
            expect(action.field.key).to.eql(userProfile.key)
        }).then(() => done())

    })

    it('should update headline',(done)=>{
        // the result from the mocked AJAX call
        const username = 'sep1test'
        const headline = 'A new headline!'

        mock(`${url}/headline`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json: { username, headline }
        })

        actions.updateHeadline('does not matter')(
            fn => fn(action => {
            expect(action.type).to.eql(actionTypes.UPDATE_PROFILE)
            expect(action.field).to.eql({headline})
            done()
        }))
    })
})
