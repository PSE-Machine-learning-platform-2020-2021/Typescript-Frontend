import React, { Component } from 'react'

export default class EmailItem extends Component {
    state = {mouse:false} //check mouse on item
	handleMouse = (flag)=>{
		return ()=>{
			this.setState({mouse:flag})
		}
	}
	//choose check
	handleCheck = (id)=>{
		return (event)=>{
			this.props.updateEmail(id,event.target.checked)
		}
	}
	//delete email
	handleDelete = (id)=>{
		if(window.confirm('Are you sure to delete this email address?')){
			this.props.deleteEmail(id)
		}
	}


	render() {
		const {id,address,chosen} = this.props
		const {mouse} = this.state
		return (
			<li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
				<label>
					<input type="checkbox" checked={chosen} onChange={this.handleCheck(id)}/>
					<span>{address}</span>
				</label>
				<button onClick={()=> this.handleDelete(id) } className="btn-item" style={{display:mouse?'block':'none'}}>delete</button>
			</li>
		)
	}
}
