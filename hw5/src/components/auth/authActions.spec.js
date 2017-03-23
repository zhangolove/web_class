import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Validate login', function() {
  let actions, actionTypes, locations, url, Actions
  beforeEach(() => {
    if (mockery.enable) {
    
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')
    }
    actions = require('./authActions')
    Actions = require('../../actions')
    locations = Actions.Locations
    actionTypes = Actions.ActionTypes
    url = Actions.url
  })

  afterEach(() => {
    if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
    }
  })


  it('should login a user',(done)=>{
    const username = "guest"
    const password = "visitor"
    mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      json: {username, result: "success"}
    })
    actions.loginAction(username, password)((action) => {
        if (action.type === actionTypes.LOGIN ) {
          expect(action).to.eql({type: actionTypes.LOGIN, username})
          done()
        }
    })
    

  })

 it('should not login an invalid user',(done)=>{
    const username = "cl46"
    const password = "visitordd"
    mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      status: 401,
      statusText: 'Unauthorized'
    })
    actions.loginAction(username, password)((action) => {
        expect(action).to
            .eql(Actions.alertError('Invalid username or password.'))
    }).catch(err => { done() })
  })

  it('should log out a user (state should be cleared)',(done)=>{
    mock(`${url}/logout`, {
      method: 'PUT',
      headers: {'Content-Type':'text/plain'},
      content: 'OK'
    })
    let called = 0
    actions.logoutAction()((action) => {
        if (called == 0) { 
            expect(action).to.eql({type: actionTypes.LOGOUT})
            called += 1
        }else{
            expect(action).to
              .eql({type: actionTypes.GO_TO_PAGE, location: locations.LANDING})
            done()
        }
    })
  })

})
