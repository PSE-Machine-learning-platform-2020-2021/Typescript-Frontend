import React, { Component } from 'react';
import AddEmailButton from '../../components/DeliveryComponents/AddEmailButton';
import DownloadButton from '../../components/DeliveryComponents/DownloadButton';
import EmailList from '../../components/DeliveryComponents/EmailList';
import HandleAllEmail from '../../components/DeliveryComponents/HandleAllEmail';
import SendButton from '../../components/DeliveryComponents/SendButton';
import { EmailType } from './EmailType';
export default class DeliveryPage extends Component {

	//init state
	state = {
		emails: [
			{ id: 'example', address: 'example-email(deleted after first input)', chosen: false },
		]
	};

	//addEmail for add new Email
	addEmail = (emailObj: EmailType) => {
		//get orignal emailList
		const { emails } = this.state;
		//add new one
		const newEmails = [emailObj, ...emails];
		//update emailList
		this.setState({ emails: newEmails });
	};

	//updateEmail for update EmailList
	updateEmail = (id: string, chosen: boolean) => {
		//get orignal EmailList
		const { emails } = this.state;
		//compare id
		const newEmails = emails.map((emailObj) => {
			if (emailObj.id === id) return { ...emailObj, chosen };
			else return emailObj;
		});
		this.setState({ emails: newEmails });
	};

	//deleteEmail for delete emailObj
	deleteEmail = (id: string) => {
		//get orignal emailList
		const { emails } = this.state;
		//delete emailObj with id
		const newEmails = emails.filter((emailObj) => {
			return emailObj.id !== id;
		});
		//update emailList
		this.setState({ emails: newEmails });
	};

	//checkAllEmail for all chosen email
	chooseAllEmail = (chosen: boolean) => {
		//get orignal emailList
		const { emails } = this.state;
		//traverse emailList
		const newEmails = emails.map((emailObj) => {
			return { ...emailObj, chosen };
		});
		//update emailList
		this.setState({ emails: newEmails });
	};

	//clearAllChosen for delete all emails
	clearAllChosen = () => {
		//get orignal emailList
		const { emails } = this.state;
		//filter datas
		const newEmails = emails.filter((emailObj) => {
			return !emailObj.chosen;
		});
		//update emailLists
		this.setState({ emails: newEmails });
	};

	render() {
		const { emails } = this.state;
		return (
			<div className="deliverypage">
				<div className="emailList-wrap">
					<AddEmailButton addEmail={this.addEmail} deleteEmail={this.deleteEmail} />
					<EmailList emails={emails} updateEmail={this.updateEmail} deleteEmail={this.deleteEmail} />
					<HandleAllEmail emails={emails} chooseAllEmail={this.chooseAllEmail} clearAllChosen={this.clearAllChosen} />
				</div>
				<DownloadButton />
				<SendButton />
			</div>
		);
	}
}
