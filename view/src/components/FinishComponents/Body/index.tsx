import React, { Component } from 'react'
import body from './index.module.css'
import image from './ExampleImage.jpg'

export default class ConstantsText extends Component {
    render() {
        return (
        <div className="body" >
            <h2 className={body.title}>Fertig!</h2>  
            <img src={image} />           
        </div>
        )
    }
}
