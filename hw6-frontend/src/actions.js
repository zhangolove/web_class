import "isomorphic-fetch"

export const url = 'https://webdev-dummy.herokuapp.com'

export const resource = (method, endpoint, payload, ifRaw=false) => {
  const options =  {
    method,
    credentials: 'include'
  }
  if (!ifRaw) {
    options.headers = {'Content-Type': 'application/json'}
  }
  if (!ifRaw && payload) payload = JSON.stringify(payload)
  if (payload) options.body = payload

  return fetch(`${url}/${endpoint}`, options)
    .then((r) => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type')
                  .indexOf('json') > 0) ? r.json() : r.text()
      } else {
        throw new Error(r.statusText)
      }
    })
}



export const Locations = {
    MAIN: 'MAIN_PAGE',
    LANDING: 'LANDING_PAGE',
    PROFILE: 'PROFILE_PAGE'
}

export const ActionTypes = {
    GO_TO_PAGE: 'GO_TO_PAGE',
    UPDATE_HEADLINE: 'UPDATE_HEADLINE',
    CHANGE_FILTER: 'CHANGE_FILTER',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    ALERT: 'ALERT',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOAD_ARTICLES: 'LOAD_ARTICLES',
    LOAD_FOLLOWINGS: 'LOAD_FOLLOWINGS',
    ADD_ARTICLES: 'ADD_ARTICLES',
    REMOVE_ARTICLES: 'REMOVE_ARTICLES',
    DISMISS_ALERT: 'DISMISS_ALERT',
    EDIT_ARTICLE: 'EDIT_ARTICLE',
    EDIT_COMMENT: 'EDIT_COMMENT',
    ADD_COMMENT: 'ADD_COMMENT',
    SHOW_COMMENT: 'SHOW_COMMENT'
}

export const goToPage = (dest) => ({type: ActionTypes.GO_TO_PAGE,  
                                    location: dest})

export const goToMain = () => goToPage(Locations.MAIN)
export const goToLanding = () => goToPage(Locations.LANDING)
export const goToProfile = () => goToPage(Locations.PROFILE)

export const alertError = (alertContent) => ({type: ActionTypes.ALERT,  
                                    alertType: "danger", alertContent})

export const alertSuccess = (alertContent) => ({type: ActionTypes.ALERT,  
                                    alertType: "success", alertContent})

