import { ActionTypes } from '../../enums'

export const updateHeadline = (text) => ({
	type: ActionTypes.UPDATE_HEADLINE,
	text
})