import React, { Component } from 'react'

export default class DatasetItem extends Component {
    state = {mouse:false} //check mouse on item
	handleMouse = (flag)=>{
		return ()=>{
			this.setState({mouse:flag})
		}
	}
	//choose check
	handleCheck = (id)=>{
		return (event)=>{
			this.props.updateDataset(id,event.target.checked)
		}
	}
	//delete dataset
	handleDelete = (id)=>{
		if(window.confirm('Are you sure to delete this dataset?')){
			this.props.deleteDataset(id)
		}
	}


	render() {
		const {id,name,chosen} = this.props
		const {mouse} = this.state
		return (
			<li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
				<label>
					<input type="checkbox" checked={chosen} onChange={this.handleCheck(id)}/>
					<span>{name}</span>
				</label>
				<button onClick={()=> this.handleDelete(id) } className="btn-item" style={{display:mouse?'block':'none'}}>delete</button>
			</li>
		)
	}
}
