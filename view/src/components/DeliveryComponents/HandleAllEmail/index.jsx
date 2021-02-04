import React, { Component } from 'react'


export default class HandleAllEmail extends Component {

	//choose all emails
	handleChooseAll = (e)=>{
		this.props.chooseAllEmail(e.target.checked)
	}

	//clear all
	handleClearAllChosen = ()=>{
		this.props.clearAllChosen()
	}

	render() {
		const {emails} = this.props
		//already amount of chosen emails
		const chosenCount = emails.reduce((pre,email)=> pre + (email.chosen ? 1 : 0),0)
		//total amount
		const total = emails.length
		return (
			<div className="handleallemail">
				<label>
					<input type="checkbox" onChange={this.handleChooseAll} checked={chosenCount === total && total !== 0 ? true : false}/>
				</label>
				<span>
					<span>chosen: {chosenCount}</span> / total: {total}
				</span>
				<button onClick={this.handleClearAllChosen} className="btn-clear">delete all chosen emails</button>
			</div>
		)
	}
}
