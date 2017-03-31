import { resource, ActionTypes, alertError, alertSuccess, goToMain, goToLanding } from '../../actions'
import {fetchArticles} from '../articles/articleActions'
import { fetchFollowings } from '../main/followingActions'
import {fetchProfile, fetchHeadline} from '../profile/profileActions'
import { validate_pwd, validate_dob } from '../forms'

export const loginAndRedirect = (username, password) =>
    (dispatch) => 
        loginAction(username, password)(dispatch)
        //prefetch info to avoid fetching info for every page
        //redirection
            .then(() => loadInfo(username)(dispatch))
            .then(() => dispatch(goToMain()))
            .catch((err) => {})

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
            throw(err)
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

export const registerAction = ({username, email, 
                        dob, zipcode, pwd1, password}) => 
    (dispatch) => {
        if (validate_dob(dob) && validate_pwd(pwd1, password)) {
            const payload = {username: username.value,
                            email: email.value,
                            dob: dob.value,
                            zipcode: zipcode.value,
                            password: password.value}
            resource('POST', 'register', payload)
              .then((response) => {
              dispatch(alertSuccess('Registration succeeded. Please log in'))
            })
        }
    }