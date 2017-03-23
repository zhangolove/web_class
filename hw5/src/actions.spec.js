import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Validate actions', function() {
  let actions,url,resource
  beforeEach(() => {
    if (mockery.enable) {
    
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')
    }
    //Action = require('./actions').default
    actions = require('./actions')
    url = actions.url
    resource = actions.resource
  })

  afterEach(() => {
    if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
    }
  })

  it('should validate that resource is a resource', (done) => {
    
  
    mock(`${url}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        json: {
            hello: 'world'
        }
    })

   resource('GET','')
    .then((response)=>{
        expect(response.hello).to.eql('world')
    })
    .then(done)
    .catch(done)

  })

  it('should validate that resouce gives http error',(done)=>{
    mock(`${url}/headlines`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    resource('GET','headlines')
    .catch((error)=>{
      expect(error.toString()).to.eql('Error: Unauthorized')
    })
    .then(done)
    .catch(done)
  })

  it('should validate that resource is POSTable',(done)=>{
    const username = "guest"
    const password = "visitor"
    mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      json: {username, result: "success"}
    })
    resource('POST','login', {username, password})
    .then((response) => {
      expect(response.username).to.eql(username)
      expect(response.result).to.eql('success')
    })
    .then(done)
    .catch(done)
  })

  it('should update error message',(done)=>{
    const alertContent = 'should update error message'
    expect(actions.alertError(alertContent))
          .to.eql({ type: actions.ActionTypes.ALERT, 
                  alertType: "danger", alertContent })
    done()
  })

  it('should update success message',(done)=>{
    const alertContent = 'should update success message'
    expect(actions.alertSuccess(alertContent))
              .to.eql({ type: actions.ActionTypes.ALERT, 
                  alertType: "success", alertContent })
    done()
  })

  it('should navigate (to profile, main, or landing)',(done)=>{
    const {MAIN, LANDING, PROFILE}  = actions.Locations
    expect(actions.goToMain()).to.eql({ type: actions.ActionTypes.GO_TO_PAGE, 
                  location: MAIN})
    expect(actions.goToLanding()).to.eql({ type: actions.ActionTypes.GO_TO_PAGE, 
                  location: LANDING})
    expect(actions.goToProfile()).to.eql({ type: actions.ActionTypes.GO_TO_PAGE, 
                  location: PROFILE})
    done()
  })

})
