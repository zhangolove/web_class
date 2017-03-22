import { ActionTypes, resource } from '../../actions'

function UpdateProfileAvatars() {
	return (dispatch) => {
		return resource('GET', 'avatars')
			.then((response) => {
				dispatch({ type: Action.UPDATE_PROFILE, avatar: response.avatars[0].avatar });
			})
	}
}

const fields = ['dob', 'email', 'zipcode','avatars']
const fetchGeneric = (field) => (dispatch) => dispatch(fetchField(field))

const updateHeadline = (headline) => (dispatch) => dispatch(updateField('headline', headline))

const updateField = (field, value) => (dispatch) => {
  const payload = {}
  payload[field] = value
  return resource('PUT', field, payload).then(localUpdateField(field, dispatch))
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


export const fetchProfile = () =>
	 (dispatch) => 
		 Promise.all(
             fields.map(field => fetchGeneric(field)(fn => fn(dispatch)))
             )
	

