import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EmailItem from '../EmailItem'

export default class EmailList extends Component {
    //limit props
	static propTypes = {
		emails:PropTypes.array.isRequired,
		updateEmail:PropTypes.func.isRequired,
		deleteEmail:PropTypes.func.isRequired,
	}

	render() {
		const {emails,updateEmail,deleteEmail} = this.props
		return (
			<ul className="email-main">
				{
					emails.map( email =>{
						return <EmailItem key={email.id} {...email} updateEmail={updateEmail} deleteEmail={deleteEmail}/>
					})
				}
			</ul>
		)
	}
}
