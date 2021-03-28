import React from 'react';
import DownloadButton from '../../components/DeliveryComponents/DownloadButton';
import EmailList from '../../components/DeliveryComponents/EmailList';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
export class DeliveryPage implements Page {

	state = new State;
	observers: PageController[] = [];

	constructor() {
		this.state = new State()
	}


	update() {
		this.notify()
		const VDOM = (
			<div>
				<EmailList delivery={this.delivery.bind(this)} />
				<DownloadButton download={this.download.bind(this)} />
			</div>
		);
		if (document.getElementById('root') !== null) {
			ReactDOM.render(VDOM, document.getElementById('root'));
		}
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

	setState(state: any) {
		this.state = state
		this.update()
	}

	private delivery(chosenEmails: string[]) {

		// eslint-disable-next-line
		this.state.currentState = States.DeliverWeb
		// eslint-disable-next-line
		this.state.chosenEmails = chosenEmails
		this.notify()
	}

	private download() {

		// eslint-disable-next-line
		this.state.currentState = States.NeedDownload
		this.notify()
	}


}
