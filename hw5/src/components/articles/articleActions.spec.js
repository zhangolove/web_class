import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Validate article actions', function() {
  let actions, actionTypes, url, Actions
  beforeEach(() => {
    if (mockery.enable) {
    
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')
    }
    //Action = require('./actions').default
    actions = require('./articleActions')
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


  it('should fetch articles (mocked request)',(done)=>{
    const article = { _id: 1, author: 'cl46', text: "hello worlds", comments: [] }
    mock(`${url}/articles`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: {articles:[article]}
    })
    actions.fetchArticles()((action) => {
      expect(action.type).to.eql(actionTypes.LOAD_ARTICLES)
	  //expect(action.articles[0]).to.eql(article)
	  done()
    })
  })

 it('should update the search keyword',(done)=>{
    const filter = 'keyword'
    expect(actions.changeFilter(filter)).to.eql({type: actionTypes.CHANGE_FILTER, filter})
    done()
 })

})
