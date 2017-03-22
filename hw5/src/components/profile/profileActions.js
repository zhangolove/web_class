import { ActionTypes, resource } from '../../actions'
import { validate_pwd } from '../forms'

function UpdateProfileAvatars() {
	return (dispatch) => {
		return resource('GET', 'avatars')
			.then((response) => {
				dispatch({ type: Action.UPDATE_PROFILE, avatar: response.avatars[0].avatar });
			})
	}
}


const fetchGeneric = (field) => (dispatch) => dispatch(fetchField(field))

const updateHeadline = (headline) => 
        (dispatch) => dispatch(updateField('headline', headline))
const updateEmail = (email) => 
      (dispatch) => dispatch(updateField('email', email))
const updateZipcode = (zipcode) => 
    (dispatch) => dispatch(updateField('zipcode', zipcode))
const updatePassword = (password) => 
    (dispatch) => dispatch(updateField('password', password))

const updateField = (field, value) => (dispatch) => {
  const payload = {}
  payload[field] = value
  return resource('PUT', field, payload)
          .then(localUpdateField(field, dispatch))
}

const fetchField = (field) => (dispatch) => 
  resource('GET', field).then(localUpdateField(field, dispatch))


const localUpdateField = (field, dispatch) => (response) => {
    const fieldObj = {}
    fieldObj[field] = response[field]
    const action = { type:  ActionTypes.UPDATE_PROFILE,
                     field: fieldObj}
    dispatch(action)
}


export const fetchProfile = (username) => {
    const fields = ['dob', 'email', 'zipcode','avatars']
    return (dispatch) => 
		 Promise.all(
             fields.map(field => fetchGeneric(field)(fn => fn(dispatch)))
             )
}
	 

export const cloudUpdate = (dispatch) => (refs) => {
            const {pwd, pwd1, zipcode, email} = refs
            //pwd1 is only for confirmation, so don't want it to be updated
            const changed = Object.keys(refs)
                .filter((key) => refs[key] && refs[key].value 
                        && key !== "pwd1")
                .reduce((obj, key) => {
                    obj[key] = refs[key].value
                    return obj
                }, {})
            if ('zipcode' in changed) {
                console.log(zipcode.value)
                updateZipcode(zipcode.value)(fn => fn(dispatch))
            }
            if ('email' in changed) {
                console.log(email.value)
                updateEmail(email.value)(fn => fn(dispatch))
            }
            if (validate_pwd(pwd, pwd1)) {
                if (pwd1.value != '') {
                    updatePassword(pwd1.value)(fn => fn(dispatch))
                }
                Object.keys(refs).forEach((k) => refs[k].value = "")
                if (changed.length > 0){
                  dispatch({type: ActionTypes.UPDATE_PROFILE, field: changed})
                }
            }
        }

