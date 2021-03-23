import React, { Component } from 'react';
import NewWindow from 'react-new-window';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Train.css'
export default class Train extends Component {
	props = {
		dataSetMetas: [{ dataSetID: -1, dataSetName: 'ex' }],
		train: function (dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[]) { }
	}
	state = {
		mouse: false,
		openNewWindow: false,
		value: '',
		databaseList: [] as { dataSetID: number, dataSetName: string, chosen: boolean; }[],
		datasets: [] as { dataSetID: number, dataSetName: string, chosen: boolean; }[],
		imputators: [
			{ name: "Mittel", checked: false, tag: 'MEAN' },
			{ name: "Letzer Wert fortgeführt", checked: false, tag: 'FORWARD' },
			{ name: "Bewegter Durchschnitt", checked: false, tag: 'MOVING' },
			{ name: "Lineare Interpolation", checked: false, tag: 'LINEAR' },
			{ name: "Spline Interpolation", checked: false, tag: 'SPLINE' }
		],
		scalers: [
			{ name: "Standard Scaler", checked: false, tag: 'STANDARD' },
			{ name: "Robust Scaler", checked: false, tag: 'ROBUST' },
			{ name: "Min-Max Scaler", checked: false, tag: 'MIN_MAX' },
			{ name: "Normalizer", checked: false, tag: 'NORMALIZER' },
			{ name: "Anteilstrafo", checked: false, tag: 'SHARE' }
		],
		myfeatures: [
			{ name: "Minimum", checked: false, tag: 'MIN' },
			{ name: "Maximum", checked: false, tag: 'MAX' },
			{ name: "Varianz", checked: false, tag: 'VARIANCE' },
			{ name: "Energie", checked: false, tag: 'ENERGY' },
			{ name: "Fourier-T", checked: false, tag: 'FOURIER_TRANSFORM' },
			{ name: "Mittelwert", checked: false, tag: 'MEAN' },
			{ name: "Autoregressiv", checked: false, tag: 'AUTOREGRESSIVE' },
			{ name: "Abweichung", checked: false, tag: 'SKEWNESS' },
			{ name: "Wölbung", checked: false, tag: 'KURTOSIS' },
			{ name: "IQR", checked: false, tag: 'IQR' }
		],
		classifiers: [
			{ name: "MLPClassifier", checked: false, tag: 'MLP' },
			{ name: "RandomForestClassifier", checked: false, tag: 'RANDOM_FOREST' },
			{ name: "KNeighborsClassifier", checked: false, tag: 'K_NEIGHOBORS' },
			{ name: "Support Vector Machine", checked: false, tag: 'SVM' }
		],
		chosenScaler: 0,
		chosenclassifier: 0,
		chosenImputator: 0
	};

	componentDidMount() {
		let newDatabaseList: { dataSetID: number, dataSetName: string, chosen: boolean; }[] = [];
		this.props.dataSetMetas?.map((dataset) => {
			newDatabaseList.push({ dataSetID: dataset.dataSetID, dataSetName: dataset.dataSetName, chosen: false });
		})
		this.setState({ databaseList: newDatabaseList });

	}

	handleMouse = (flag: boolean) => {
		return () => {
			this.setState({ mouse: flag });
		};
	};

	handleCheck = (id: number, chosen: boolean) => {
		const { datasets } = this.state;
		const newDatasets = datasets.map((dataset) => {
			// eslint-disable-next-line
			if (dataset.dataSetID == id) return { ...dataset, chosen };
			else return dataset;
		});
		this.setState({ datasets: newDatasets });
	};

	handleDelete = (id: number) => {
		if (window.confirm('Sind Sie sicher, die gewählt Emailadresse zu löschen?')) {
			const { datasets } = this.state;
			const newDatasets = datasets.filter((dataset) => {
				return dataset.dataSetID !== id;
			});
			//update emailList
			this.setState({ datasets: newDatasets });
		}
	};

	//addDataset for add new Dataset
	addDataset = (datasetObj: { dataSetID: number, dataSetName: string, chosen: boolean; }) => {
		//get orignal datasetList
		const { datasets } = this.state;
		//add new one
		const newDatasets = [datasetObj, ...datasets];
		//update datasetList
		this.setState({ datasets: newDatasets });
	};

	handleCreate = () => {
		//if (this.state.databaseList == []) {
		//	}
		const flag = !this.state.openNewWindow;
		this.setState({ openNewWindow: flag });
	};

	handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({
			value: e.target.value
		});
	};

	handleChoose = () => {
		/* wait to change load model*/
		this.setState({ openNewWindow: false });
		// eslint-disable-next-line
		if (this.state.value == '') {
			NotificationManager.error("Kein Wählen!", "", 3000);
		} else {
			const { databaseList } = this.state;
			const newDatabaseList1 = databaseList.map((databaseObj) => {
				// eslint-disable-next-line
				if (databaseObj.dataSetName == this.state.value) {
					databaseObj.chosen = true;
					const datasetObj = { dataSetID: databaseObj.dataSetID, dataSetName: databaseObj.dataSetName, chosen: false };
					this.addDataset(datasetObj);
				}
				return databaseObj;
			}
			);
			const newDatabaseList2 = newDatabaseList1.filter((databaseObj) => {
				// eslint-disable-next-line
				return databaseObj.chosen == false;
			});
			//update emailList
			this.setState({ databaseList: newDatabaseList2 });
		}
	};

	options = () => {
		const { databaseList } = this.state;
		/*way to add new into list
		and wait to get databaseList
		const newdatabase = {id:'003', name:'dataset3', chosen: false}
		databaseList.push(newdatabase)
		*/
		return databaseList.map(dataset =>
			<option key={dataset.dataSetID} value={dataset.dataSetName}>{dataset.dataSetName}</option>);
	};

	handleImputation = (index: number) => {
		var newList = [...this.state.imputators];
		var newChosen = this.state.chosenImputator;
		if (newList[index].checked) { newChosen--; }
		else { newChosen++; }
		if (newChosen <= 1) {
			newList[index].checked = !newList[index].checked;
			this.setState({ chosenImputator: newChosen, imputators: newList });
		} else {
			NotificationManager.error("Darf nicht mehrer Imputationen wählen!", "", 3000);
			return;
		}
	};

	handleScaler = (index: number) => {

		var newList = [...this.state.scalers];
		var newChosen = this.state.chosenScaler;
		if (newList[index].checked) { newChosen--; }
		else { newChosen++; }
		if (newChosen <= 1) {
			newList[index].checked = !newList[index].checked;
			this.setState({ chosenScaler: newChosen });
			this.setState({ scalers: newList });
		} else {
			NotificationManager.error("Darf nicht mehrer Scaler wählen!", "", 3000);
			return;
		}

	};

	handleExtraction = (index: number) => {
		var newList = [...this.state.myfeatures];
		newList[index].checked = !newList[index].checked;
		this.setState({ features: newList });
	};

	handleClassifier = (index: number) => {
		var newList = [...this.state.classifiers];
		var newChosen = this.state.chosenclassifier;
		if (newList[index].checked) { newChosen--; }
		else { newChosen++; }
		if (newChosen <= 1) {
			newList[index].checked = !newList[index].checked;
			this.setState({ chosenclassifier: newChosen });
			this.setState({ classifiers: newList });
		} else {
			NotificationManager.error("Darf nicht mehrer Classifier wählen!", "", 3000);
			return;
		}
	};

	handleTrain = () => {
		var dataSets: number[] = [], imputator = "", classifier = '', scaler = '', features: string[] = [];
		const { datasets, imputators, classifiers, scalers, myfeatures } = this.state;
		datasets.map((datasetObj) => {
			if (datasetObj.chosen) dataSets.push(datasetObj.dataSetID);
			return datasetObj;
		});
		imputators.map((imputatorObj) => {
			if (imputatorObj.checked) imputator = imputatorObj.tag;
			return imputatorObj;
		});
		classifiers.map((classifierObj) => {
			if (classifierObj.checked) classifier = classifierObj.tag;
			return classifierObj;
		});
		scalers.map((scalerObj) => {
			if (scalerObj.checked) scaler = scalerObj.tag;
			return scalerObj;
		});
		myfeatures.map((featureObj) => {
			if (featureObj.checked) features.push(featureObj.tag);
			return featureObj;
		});
		//console.log(chosendataSets, chosenImputator, chosenclassifier, chosenscaler, chosenFeatures)
		this.props.train(dataSets, imputator, classifier, scaler, features);
	};

	render() {
		const { mouse, datasets, imputators, scalers, myfeatures, classifiers } = this.state;
		return (
			<div className="train">
				<h3>Datasets</h3>
				{datasets.map(dataset => {
					return (

						<li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
							<label>
								<input type="checkbox" checked={dataset.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheck(dataset.dataSetID, e.target.checked)} />
								<span>{dataset.dataSetName}</span>
							</label>
							<button onClick={() => this.handleDelete(dataset.dataSetID)} className="btn-item" style={{ display: mouse ? 'block' : 'none' }}>Löschen</button>
						</li>
					);
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
					<button onClick={() => this.handleCreate()} className="adddataset-btn" >Add new Dataset</button>
				</div>
				<div className="list">
					<div className="imputationlist">
						<h3>Imputation</h3>
						{imputators.map((imputator, index) => {
							return (
								<div key={index}>
									<input type="checkbox" value={index} checked={imputator.checked} onChange={() => this.handleImputation(index)} /><span>{imputator.name}</span>
								</div>
							);
						})}
					</div>
					<div className="scalerlist">
						<h3>Normalisierung</h3>
						{scalers.map((scaler, index) => {
							return (
								<div key={index}>
									<input type="checkbox" value={index} checked={scaler.checked} onChange={() => this.handleScaler(index)} /><span>{scaler.name}</span>
								</div>
							);
						})
						}
					</div>
				</div>

				<div className="list">
					<div className="extractionlist">
						<h3>Merkmalextraktion</h3>
						{myfeatures.map((extraction, index) => {
							return (
								<div key={index}>
									<input type="checkbox" value={index} checked={extraction.checked} onChange={() => this.handleExtraction(index)} /><span>{extraction.name}</span>
								</div>
							);
						})
						}
					</div>
					<div className="classifierlist">
						<h3>Modell</h3>
						{classifiers.map((classifier, index) => {
							return (
								<div key={index}>
									<input type="checkbox" value={index} checked={classifier.checked} onChange={() => this.handleClassifier(index)} /><span>{classifier.name}</span>
								</div>
							);
						})}
					</div>
				</div>
				<br></br>

				<div className="clearfloat">
					<button onClick={() => this.handleTrain()} className="train-btn" >Train Start!</button>
				</div>
			</div>


		);
	}

}
