import { resource, ActionTypes, alertError, goToMain, goToLanding } from '../../actions'



export const loginAction = (username, password) => 
    (dispatch) =>
    resource('POST', 'login', {username, password})
        .then((response) => {
            dispatch({ type: ActionTypes.LOGIN, username: response.username })
            dispatch(goToMain())
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
