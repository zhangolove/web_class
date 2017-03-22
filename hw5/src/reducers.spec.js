import { expect } from 'chai'



describe('Validate reducers', function() {
    let Reducer, Locations, ActionTypes, Action, initState, Filter
    
    beforeEach(() => {
        Reducer = require('./reducers').default
        Action = require('./actions')
        Filter = require('./components/articles/filterArticles')
                    .filterArticles
        Locations = Action.Locations
        ActionTypes = Action.ActionTypes
        initState = {
            location: Locations.LANDING,
            user: {},
            followings: [],
            articles: [],
            alertType: "",
            alertContent: "",
            filter: null
        }
    })
    it('should return the initial state', () => {
        
        expect(Reducer(undefined, {})).to.eql(initState)
    })

    it('should state success (for displaying success message to user)', () => {
        const alertContent = 'testSuccess'
        const alertType = "success"
        expect(Reducer(undefined, 
            { type: ActionTypes.ALERT, alertType, alertContent}))
            .to.eql({ ...initState, alertType, alertContent })
    })

    it('should state success (for displaying success message to user)', () => {
        const alertContent = 'testFailure'
        const alertType = "danger"
        expect(Reducer(undefined, 
            { type: ActionTypes.ALERT, alertType, alertContent}))
            .to.eql({ ...initState, alertType, alertContent })
    })

    it('should set the articles', () => {
        const articles = [ { _id: 1, author: 'xxx', date: new Date(), text: 'test' } ]
        expect(Reducer(undefined, { type: ActionTypes.LOAD_ARTICLES, articles }))
            .to.eql({ ...initState, articles })
    })

    it('should set the search keyword', () => {
        const filter = 'hello'
        expect(Reducer(undefined, { type: ActionTypes.CHANGE_FILTER, filter }))
            .to.eql({ ...initState, filter })
    })

    it('should filter displayed articles by the search keyword', () => {
        const filter = 'cl46'
        const articles = [
            { _id: 1, author: 'xxx', date: '2013-3-18', text: '1' },
            { _id: 2, author: 'cl46', date: '2013-3-18', text: '2' }
        ]

        const res = Filter(articles, filter)
        expect(res).to.have.length(1)
        expect(res[0]).to.eql(articles[1])
    })


})
