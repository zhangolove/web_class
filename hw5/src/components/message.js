import React, { PropTypes } from 'react'
import {Alert} from 'react-bootstrap'
import { connect } from 'react-redux'


export const Message = ({msgType, msgContent}) => (
    <div>
        {
            msgType === "" ? "" :
            <Alert bsStyle={msgType}>
                {msgContent}
            </Alert>
        }
    </div>
)

Message.PropTypes = {
	msgType: PropTypes.bool.isRequired,
	msgContent: PropTypes.string.isRequired
}

export default connect((state) => ({
		msgType: state.alertType,
		msgContent: state.alertContent
}))(Message)