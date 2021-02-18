import React, { Component } from 'react';
import DownloadButton from '../../components/DeliveryComponents/DownloadButton';
import EmailList from '../../components/DeliveryComponents/EmailList';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import { States } from '../State';

type Props = {
};

export class DeliveryPage extends React.Component<Props, State> implements Page {

	state = new State();
	observers: PageController[] = [];
	constructor(props: Props) {
		super(props);
		this.delivery()
		this.download()
		const VDOM = (
			<div className="deliverypage">
				<EmailList />
				<DownloadButton />
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

	delivery() {
		PubSub.subscribe('delivery', (_msg: any, data: string[]) => {
			this.state.currentState = States.DeliverWeb
			this.state.chosenEmails = data
			this.notify()
		})
	}

	download() {
		PubSub.subscribe('download', (_msg: any) => {
			this.state.currentState = States.NeedDownload
			this.notify()
		})
	}


}
