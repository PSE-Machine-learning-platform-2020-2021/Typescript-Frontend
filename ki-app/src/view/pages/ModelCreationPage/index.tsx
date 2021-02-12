import React, { Component } from 'react'
import DatasetList from '../../components/ModelCreationComponents/DatasetList'
import AddDatasetButton from '../../components/ModelCreationComponents/AddDatasetButton'
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

type Props = {
};


export default class ModelCreationPage extends React.Component<Props, State> implements Page {
	state = new State();
	observers: PageController[] = [];
	constructor(props: Props) {
		super(props);
		const VDOM = (
			<div className="modelcreationpage">
				<div className="checklist">
					<h3>Datasets</h3>
					<DatasetList datasets={this.state.datasets} updateDataset={this.updateDataset} deleteDataset={this.deleteDataset} />
					<AddDatasetButton datasets={this.state.datasets} addDataset={this.addDataset} deleteDataset={this.deleteDataset} />
				</div>
				<div className="checklist"><ImputationList /><NormalizationList /></div>
				<div className="checklist"><FeatureList /><ModelTypeList /></div>
				<TrainButton />
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

	//addDataset for add new Dataset
	addDataset = (datasetObj: { id: string, name: string, chosen: boolean }) => {
		//get orignal datasetList
		const { datasets } = this.state
		//add new one
		const newDatasets = [datasetObj, ...datasets]
		//update datasetList
		this.setState({ datasets: newDatasets })
	}

	//updateDataset for update DatasetList
	updateDataset = (id: string, chosen: boolean) => {
		//get orignal DatasetList
		const { datasets } = this.state
		//compare id
		const newDatasets = datasets.map((datasetObj) => {
			if (datasetObj.id === id) return { ...datasetObj, chosen }
			else return datasetObj
		})
		this.setState({ datasets: newDatasets })
	}

	//deleteDataset for delete datasetObj
	deleteDataset = (id: string) => {
		//get orignal datasetList
		const { datasets } = this.state
		//delete datasetObj with id
		const newDatasets = datasets.filter((datasetObj) => {
			return datasetObj.id !== id
		})
		//update datasetList
		this.setState({ datasets: newDatasets })
	}

}
