import React, { Component } from 'react'
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

	needDatabaseList() {
		this.state.currentState = States.NeedDatabaseList
		this.notify()
		let databaseList = [
			{ dataSetID: 1, dataSetName: 'dataset1' },
			{ dataSetID: 2, dataSetName: 'dataset2' },
			{ dataSetID: 3, dataSetName: 'dataset3' }
		]
		PubSub.publish('getlist', databaseList)
		//PubSub.publish('getlist', this.state.dataSets)
	}

	train() {
		PubSub.subscribe('train', (_msg: any, data: { dataSets: number[], imputations: string[], classifier: string, scaler: string, extractions: string[] }) => {
			//console.log(data);
			this.state.currentState = States.NeedKiTraining
			this.state.trainingParameter = data
			//console.log(this.state.trainingParameter);
			this.notify()
		})
	}

}
