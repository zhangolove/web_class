import React, { PropTypes } from 'react'
import {Alert} from 'react-bootstrap'
import { connect } from 'react-redux'
import { ActionTypes} from '../actions'



export const Message = ({msgType, msgContent, dismiss}) => (
    <div>
        {
            msgType === "" ? "" :
            <Alert bsStyle={msgType} onDismiss={dismiss} className="alert_info">
                {msgContent}
            </Alert>
        }
    </div>
)



Message.PropTypes = {
	msgType: PropTypes.bool.isRequired,
	msgContent: PropTypes.string.isRequired
}

export default connect(
    (state) => ({
		msgType: state.alertType,
		msgContent: state.alertContent
    }),
    (dispatch) => ({
        dismiss: () => dispatch({type: ActionTypes.DISMISS_ALERT })
    }))(Message)