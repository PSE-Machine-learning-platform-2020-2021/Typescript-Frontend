import React, { Component } from 'react'
import DatasetList from '../../components/ModelCreationComponents/DatasetList'
import AddDatasetButton from '../../components/ModelCreationComponents/AddDatasetButton'
import {DatasetType} from './DatasetType'

export default class ModelCreationPage extends Component {
    //init state
	state = {datasets:[
		{id:'ex',name:'example-dataset(delete with button)',chosen:false},
	]}

	//addDataset for add new Dataset
	addDataset = (datasetObj: DatasetType)=>{
		//get orignal datasetList
		const {datasets} = this.state
		//add new one
		const newDatasets = [datasetObj,...datasets]
		//update datasetList
		this.setState({datasets:newDatasets})
	}

	//updateDataset for update DatasetList
	updateDataset = (id: string,chosen: boolean)=>{
		//get orignal DatasetList
		const {datasets} = this.state
		//compare id
		const newDatasets = datasets.map((datasetObj)=>{
			if(datasetObj.id === id) return {...datasetObj,chosen}
			else return datasetObj
		})
		this.setState({datasets:newDatasets})
	}

	//deleteDataset for delete datasetObj
	deleteDataset = (id: string)=>{
		//get orignal datasetList
		const {datasets} = this.state
		//delete datasetObj with id
		const newDatasets = datasets.filter((datasetObj)=>{
			return datasetObj.id !== id
		})
		//update datasetList
		this.setState({datasets:newDatasets})
	}


	render() {
		const {datasets} = this.state
		return (
			<div className="modelcreationpage">
				<div className="dataset-wrap">
                    <h3>Datasets</h3>
					
					<DatasetList datasets={datasets} updateDataset={this.updateDataset} deleteDataset={this.deleteDataset}/>
					<AddDatasetButton datasets={datasets} addDataset={this.addDataset} deleteDataset={this.deleteDataset}/>
					
				</div>
			</div>
		)
	}
}
