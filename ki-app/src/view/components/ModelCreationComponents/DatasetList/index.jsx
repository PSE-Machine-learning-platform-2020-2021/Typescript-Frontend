import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatasetItem from '../DatasetItem'
export default class DatasetList extends Component {
    //limit props
	static propTypes = {
		datasets:PropTypes.array.isRequired,
		updateDataset:PropTypes.func.isRequired,
		deleteDataset:PropTypes.func.isRequired,
	}

	render() {
		const {datasets,updateDataset,deleteDataset} = this.props
		return (
			<ul className="dataset-main">
				{
					datasets.map( dataset =>{
						return <DatasetItem key={dataset.id} {...dataset} updateDataset={updateDataset} deleteDataset={deleteDataset}/>
					})
				}
			</ul>
		)
	}
}
