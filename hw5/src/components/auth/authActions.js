import { resource, ActionTypes, alertError, goToMain, goToLanding } from '../../actions'
import {fetchArticles} from '../articles/articleActions'
import { fetchFollowings } from '../main/followingActions'
import {fetchProfile, fetchHeadline} from '../profile/profileActions'


export const loginAndRedirect = (username, password) =>
    (dispatch) => 
        loginAction(username, password)(dispatch)
            .then(() => loadInfo(username)(dispatch))
            .then(() => dispatch(goToMain()))
            .catch((err) => {
                console.log(err)
            })

export const loadInfo = (username) => (dispatch) => {
    return Promise.all([
            fetchArticles()(dispatch),
            fetchFollowings()(dispatch),
            fetchProfile()(dispatch),
            fetchHeadline(username)(dispatch)
        ])
}

export const loginAction = (username, password) => 
    (dispatch) =>
    resource('POST', 'login', {username, password})
        .then((response) => {
            dispatch({ type: ActionTypes.LOGIN, username: response.username })
        }).catch((err) => {
            dispatch(alertError('Invalid username or password.'))
        })


export const logoutAction = () => 
    (dispatch) =>
    resource('PUT', 'logout')
        .then((response) => {
            dispatch({ type: ActionTypes.LOGOUT })
            dispatch(goToLanding())
        }).catch((err) => {
            dispatch(alertError('Unauthorized logout.'))
        })
