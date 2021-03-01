import React from 'react'
import PubSub from 'pubsub-js';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import './ModelCreationPage.css'
import { States } from '../State'
import Train from '../../components/ModelCreationComponents/Train';

type Props = {
};

export class ModelCreationPage extends React.Component<Props, State> implements Page {
	state = new State();
	observers: PageController[] = [];
	constructor(props: Props) {
		super(props);

		const VDOM = (
			<div className="modelcreationpage">
				<Train />
			</div>
		);

		ReactDOM.render(VDOM, document.getElementById('root'));
		this.needDatabaseList()
		this.train()
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

	setState(newState: any): void {
		return;
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
		PubSub.publish('getlist', this.state.dataSetMetas)
	}

	train() {
		PubSub.subscribe('train', (_msg: any, data: { dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[] }) => {
			//console.log(data);
			// eslint-disable-next-line
			this.state.currentState = States.NeedKiTraining
			//this.state.trainingParameter = data 
			this.state.trainingParameter!.dataSets = data.dataSets
			this.state.trainingParameter!.imputator = data.imputator
			this.state.trainingParameter!.classifier = data.classifier
			this.state.trainingParameter!.scaler = data.scaler
			this.state.trainingParameter!.features = data.features
			//console.log(this.state.trainingParameter);
			this.notify()
		})
	}

}
