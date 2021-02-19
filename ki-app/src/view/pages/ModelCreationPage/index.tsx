import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import DatasetList from '../../components/ModelCreationComponents/DatasetList'
import ImputationList from '../../components/ModelCreationComponents/ImputationList'
import NormalizationList from '../../components/ModelCreationComponents/NormalizationList'
import FeatureList from '../../components/ModelCreationComponents/FeatureList'
import ModelTypeList from '../../components/ModelCreationComponents/ModelTypeList'
import TrainButton from '../../components/ModelCreationComponents/TrainButton'
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import './ModelCreationPage.css'
import { States } from '../State'

type Props = {
};

export class ModelCreationPage extends React.Component<Props, State> implements Page {
	state = new State();
	observers: PageController[] = [];
	constructor(props: Props) {
		super(props);

		const VDOM = (
			<div className="modelcreationpage">
				<div className="checklist">
					<h3>Datasets</h3>

					<DatasetList />

				</div>
				<div className="checklist"><ImputationList /><NormalizationList /></div>
				<div className="checklist"><FeatureList /><ModelTypeList /></div>
				<TrainButton />
			</div>
		);

		ReactDOM.render(VDOM, document.getElementById('root'));
		this.needDatabaseList()
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

}
