import React from 'react';
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

		const VDOM = (
			<div className="deliverypage">
				<EmailList />
				<DownloadButton />
			</div>
		);
		ReactDOM.render(VDOM, document.getElementById('root'));
		this.delivery()
		this.download()
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
		PubSub.unsubscribe('delivery')
		PubSub.subscribe('delivery', (_msg: any, data: string[]) => {
			// eslint-disable-next-line
			this.state.currentState = States.DeliverWeb
			// eslint-disable-next-line
			this.state.chosenEmails = data
			this.notify()
		})
	}

	download() {
		PubSub.unsubscribe('download')
		PubSub.subscribe('download', (_msg: any) => {
			// eslint-disable-next-line
			this.state.currentState = States.NeedDownload
			this.notify()
		})
	}


}
