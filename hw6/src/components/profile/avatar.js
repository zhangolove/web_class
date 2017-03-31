import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Image, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { uploadAvatar } from './profileActions'




const avatar = ({avatars, uploadAvatar}) => {
    let newImg
    let fileInput

    const _upload = () => {
        uploadAvatar(newImg)
        fileInput.value = ""
    }
    const handleImageChange = (e) => {
        newImg = e.target.files[0]
    }
    return (
    <div>
        <Image src={!avatars ? '' : avatars[0].avatar} rounded responsive/>
        <FormGroup>
        <ControlLabel>Upload new profile avatar</ControlLabel>
        <FormControl type="file" 
                     accept="image/*" onChange={(e) => handleImageChange(e)}
                     ref={(node) => fileInput = ReactDOM.findDOMNode(node)} />
        </FormGroup>
        <Button  onClick={_upload}>Upload</Button>
        
    </div>)
}

avatar.PropTypes = {
    pic: PropTypes.string.isRequired,
}

const Avatar = connect(
    (state) => ({...state.user}),
    (dispatch) => ({uploadAvatar: (img)=>
                    uploadAvatar(img)(dispatch)})
)(avatar)

export default Avatar