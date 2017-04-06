import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Button, ButtonGroup} from 'react-bootstrap'

const EditableContent = ({editable, text, update, ...props}) => {
    let textArea
    const updateContent = () => {
        update(textArea.value)
    }
    return (<div {...props}>
    { editable ? 
    <div>
        <textarea className="areaEditArticle" defaultValue={text}
                ref={(node)=>{textArea=ReactDOM.findDOMNode(node)}} /> 
        <Button className="btnEditArticle"onClick={updateContent}>
             Update 
        </Button>
    </div> :
    <p>{text}</p>   
    }
    </div>)
}

export default EditableContent