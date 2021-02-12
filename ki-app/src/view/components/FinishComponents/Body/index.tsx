import React, { Component } from 'react'
import image from './ExampleImage.jpg'
import body from './index.module.css'

export default class Body extends Component {
    render() {
        return (
        <div>
            <h2 className={body.title}>Fertig!</h2>  
            <img src={image} alt="" style={{width:'auto'}} />  
        </div>
        )
    }
}
