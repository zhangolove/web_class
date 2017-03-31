import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Button, ButtonGroup} from 'react-bootstrap'

const EditableContent = ({editable, text, update}) => {
    let textArea
    const updateContent = () => {
        update(textArea.value)
    }
    return (<div>
    { editable ? 
    <div>
        <textarea defaultValue={text}
                ref={(node)=>{textArea=ReactDOM.findDOMNode(node)}} /> 
        <Button onClick={updateContent}> Update </Button>
    </div> :
    <p>{text}</p>   
    }
    </div>)
}

export default EditableContent