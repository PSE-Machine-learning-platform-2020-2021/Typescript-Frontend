import React, { Component } from 'react';
import AddEmailButton from '../../components/DeliveryComponents/AddEmailButton';
import DownloadButton from '../../components/DeliveryComponents/DownloadButton';
import EmailList from '../../components/DeliveryComponents/EmailList';
import HandleAllEmail from '../../components/DeliveryComponents/HandleAllEmail';
import SendButton from '../../components/DeliveryComponents/SendButton';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';

type Props = {
};

export class DeliveryPage extends React.Component<Props, State> implements Page {

	state = new State();
	observers: PageController[] = [];
	constructor(props: Props) {
		super(props);
		const VDOM = (
			<div className="deliverypage">
				<div className="emailList-wrap">
					<AddEmailButton addEmail={this.addEmail} deleteEmail={this.deleteEmail} />
					<EmailList emails={this.state.emails} updateEmail={this.updateEmail} deleteEmail={this.deleteEmail} />
					<HandleAllEmail emails={this.state.emails} chooseAllEmail={this.chooseAllEmail} clearAllChosen={this.clearAllChosen} />
				</div>
				<DownloadButton />
				<SendButton />
			</div>
		);
		ReactDOM.render(VDOM, document.getElementById('root'));
	}

	attach(observer: PageController) {
		this.observers.push(observer);
	}

	detach(observer: PageController) {
		const index = this.observers.indexOf(observer, 0);
		if (index > -1) {
			this.observers.splice(index, 1);
		}
	}

	notify() {
		for (let index = 0; index < this.observers.length; index++) {
			const element = this.observers[index];
			element.update();
		}
	}

	getState() {
		return this.state;
	}

	//addEmail for add new Email
	addEmail = (emailObj: { id: string, address: string, chosen: boolean }) => {
		//get orignal emailList
		const emails = this.state.emails;
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
		const emails = this.state.emails;
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
		const emails = this.state.emails;
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

}
