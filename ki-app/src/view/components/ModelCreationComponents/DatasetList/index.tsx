import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import NewWindow from 'react-new-window';


export default class DatasetList extends Component {
	state = {
		mouse: false,
		openNewWindow: false,
		value: '',
		databaseList: [] as { dataSetID: number, dataSetName: string, chosen: boolean }[],
		datasets: [{
			dataSetID: 0,
			dataSetName: 'exampledataset',
			chosen: false
		}],
	}


	componentDidMount() {
		PubSub.subscribe('getlist', (_msg: any, data: { dataSetID: number, dataSetName: string }[]) => {
			let i: number
			let newDatabaseList: { dataSetID: number, dataSetName: string, chosen: boolean }[] = []
			for (i = 0; i < data.length; i++) {
				newDatabaseList[i] = { dataSetID: data[i].dataSetID, dataSetName: data[i].dataSetName, chosen: false }
			}
			this.setState({ databaseList: newDatabaseList })
		})
	}

	handleMouse = (flag: boolean) => {
		return () => {
			this.setState({ mouse: flag });
		};
	};

	handleCheck = (id: number, chosen: boolean) => {
		const { datasets } = this.state
		const newDatasets = datasets.map((dataset) => {
			if (dataset.dataSetID == id) return { ...dataset, chosen };
			else return dataset;
		})
		this.setState({ datasets: newDatasets })
	};

	handleDelete = (id: number) => {
		if (window.confirm('Sind Sie sicher, die gewählt Emailadresse zu löschen?')) {
			const { datasets } = this.state
			const newDatasets = datasets.filter((dataset) => {
				return dataset.dataSetID !== id;
			});
			//update emailList
			this.setState({ datasets: newDatasets })
		}
	};

	//addDataset for add new Dataset
	addDataset = (datasetObj: { dataSetID: number, dataSetName: string, chosen: boolean }) => {
		//get orignal datasetList
		const { datasets } = this.state
		//add new one
		const newDatasets = [datasetObj, ...datasets]
		//update datasetList
		this.setState({ datasets: newDatasets })
	}

	handleCreate = () => {
		//if (this.state.databaseList == []) {
		//	}
		const flag = !this.state.openNewWindow
		this.setState({ openNewWindow: flag })
	}
	handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({
			value: e.target.value
		})
	}

	handleChoose = () => {
		/* wait to change load model*/
		this.setState({ openNewWindow: false })
		if (this.state.value == '') {
			alert('no choice')
		} else {
			const { databaseList } = this.state
			const newDatabaseList1 = databaseList.map((databaseObj) => {
				if (databaseObj.dataSetName == this.state.value) {
					databaseObj.chosen = true
					const datasetObj = { dataSetID: databaseObj.dataSetID, dataSetName: databaseObj.dataSetName, chosen: false }
					this.addDataset(datasetObj)
				}
				return databaseObj
			}
			)
			const newDatabaseList2 = newDatabaseList1.filter((databaseObj) => {
				return databaseObj.chosen === false
			})
			//update emailList
			this.setState({ databaseList: newDatabaseList2 })
		}
	}

	options = () => {
		const { databaseList } = this.state
		/*way to add new into list
		and wait to get databaseList
		const newdatabase = {id:'003', name:'dataset3', chosen: false}
		databaseList.push(newdatabase)
		*/
		return databaseList.map(dataset =>
			<option key={dataset.dataSetID} value={dataset.dataSetName}>{dataset.dataSetName}</option>);
	}

	render() {
		const { mouse, datasets } = this.state

		return (

			<div className="dataset-main">
				{datasets.map(dataset => {
					return (

						<li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
							<label>
								<input type="checkbox" checked={dataset.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheck(dataset.dataSetID, e.target.checked)} />
								<span>{dataset.dataSetName}</span>
							</label>
							<button onClick={() => this.handleDelete(dataset.dataSetID)} className="btn-item" style={{ display: mouse ? 'block' : 'none' }}>Löschen</button>
						</li>
					)
				})}

				<div className="adddatasetbutton">
					{this.state.openNewWindow && (
						<NewWindow>
							<div className="login-window">
								<h1>DatabaseList</h1>
								<select onChange={this.handleChange}>
									<option value="choose dataset">choose dataset</option>
									{this.options()}
								</select>
								<button onClick={this.handleChoose} className="btn" >Add!</button>
							</div>
						</NewWindow>
					)}
					<button onClick={() => this.handleCreate()} className="btn" >Add new Dataset</button>
				</div>
			</div>


		)
	}
}
