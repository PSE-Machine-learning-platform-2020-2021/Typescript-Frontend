import React from 'react';
import PubSub from 'pubsub-js';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import './ModelCreationPage.css';
import { States } from '../State';
import Train from '../../components/ModelCreationComponents/Train';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class ModelCreationPage implements Page {
	state = new State;
	observers: PageController[] = [];

	constructor() {
		this.state = new State()
	}

	update() {
		this.notify()
		const VDOM = (
			<div>
				<Train />
				<NotificationContainer />
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

	setState(state: any) {
		this.state = state
		this.update()
	}

	needDatabaseList() {
		// eslint-disable-next-line
		//this.state.currentState = States.NeedDatabaseList
		//this.notify()

		/**  Beispiel
		let databaseList = [
			{ dataSetID: 1, dataSetName: 'dataset1' },
			{ dataSetID: 2, dataSetName: 'dataset2' },
			{ dataSetID: 3, dataSetName: 'dataset3' }
		]
		PubSub.publish('getlist', databaseList)*/
	}

	train() {
		PubSub.unsubscribe('train');
		PubSub.subscribe('train', (_msg: any, data: { dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[]; }) => {
			// eslint-disable-next-line
			this.state.currentState = States.NeedKiTraining;
			// eslint-disable-next-line
			this.state.trainingParameter = data;
			this.notify();
		});
	}

}
