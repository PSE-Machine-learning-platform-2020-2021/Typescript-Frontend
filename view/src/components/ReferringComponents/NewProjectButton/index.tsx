import React, { Component } from 'react'
import QRImage from '../QRImage'
import LinkText from '../LinkText'

export default class NewProjectButton extends Component {
    state = {click : false}
    handleCreate = ()=> {
            this.setState({click:true})
    }
       
    render() {
          return (  
            <section>
                <button onClick={()=> this.handleCreate()} className="btn" >Neues Projekt</button>
                {this.state.click?<div> <QRImage/><LinkText/></div>:null}
            </section>
          );
    }
}
