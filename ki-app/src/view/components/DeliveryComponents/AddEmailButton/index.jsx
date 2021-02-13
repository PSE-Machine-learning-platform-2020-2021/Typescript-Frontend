import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';


export default class AddEmailButton extends Component {
	//limit props
	static propTypes = {
		addEmail: PropTypes.func.isRequired
	};

	state = { click: false };
	handleCreate = () => {
		this.setState({ click: true });
	};
	handleKeyUp = (event) => {
		this.props.deleteEmail('example');
		//get keyCode,target
		const { keyCode, target } = event;
		//check ENTER-key
		if (keyCode !== 13) return;
		//cant add empty email
		if (target.value.trim() === '') {
			alert('Input cant be empty!');
			return;
		}
		//new emailObj
		const emailObj = { id: nanoid(), address: target.value, chosen: false };
		this.props.addEmail(emailObj);
		//clear input
		target.value = '';
		//hide inputbox
		this.setState({ click: false });
	};


	render() {
		return (
			<div className="addemailbutton">
				<button onClick={() => this.handleCreate()} className="btn" >Add new Email</button>
				{this.state.click ?
					<div className="inputbox">
						<input onKeyUp={this.handleKeyUp} type="text" placeholder="input email address with ENTER-key" />
					</div>
					: null}

			</div>
		);
	}
}
