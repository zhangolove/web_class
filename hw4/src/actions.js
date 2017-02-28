import {ActionTypes} from './enums'



export const goToPage = (location) => {
    console.log("goToPage")
    return { type: ActionTypes.GO_TO_PAGE, location }
}