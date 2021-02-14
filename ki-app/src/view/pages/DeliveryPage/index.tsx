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
		//this.addEmail({ id: 'ex', address: 'example', chosen: false })
		this.addEmail = this.addEmail.bind(this)
		this.deleteEmail = this.deleteEmail.bind(this)
		this.updateEmail = this.updateEmail.bind(this)
		this.chooseAllEmail = this.chooseAllEmail.bind(this)
		this.clearAllChosen = this.clearAllChosen.bind(this)
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

		//add new one
		const newEmails = [emailObj, ...this.state.emails];
		//update emailList
		this.state.emails = newEmails
	};

	//updateEmail for update EmailList
	updateEmail = (id: string, chosen: boolean) => {
		//get orignal EmailList
		//compare id
		const newEmails = this.state.emails.map((emailObj) => {
			if (emailObj.id === id) return { ...emailObj, chosen };
			else return emailObj;
		});
		this.state.emails = newEmails
	};

	//deleteEmail for delete emailObj
	deleteEmail = (id: string) => {
		//get orignal emailList
		//delete emailObj with id
		const newEmails = this.state.emails.filter((emailObj) => {
			return emailObj.id !== id;
		});
		//update emailList
		this.state.emails = newEmails
	};

	//checkAllEmail for all chosen email
	chooseAllEmail = (chosen: boolean) => {
		//get orignal emailList
		//traverse emailList
		const newEmails = this.state.emails.map((emailObj) => {
			return { ...emailObj, chosen };
		});
		//update emailList
		this.state.emails = newEmails
	};

	//clearAllChosen for delete all emails
	clearAllChosen = () => {
		//get orignal emailList
		const { emails } = this.state;
		//filter datas
		const newEmails = this.state.emails.filter((emailObj) => {
			return !emailObj.chosen;
		});
		//update emailLists
		this.state.emails = newEmails
	};

}
