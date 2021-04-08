import React, { Component } from 'react';
import NewWindow from 'react-new-window';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Train.css';
export default class Train extends Component {

	/**
	 * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
	 */
	props = {
		dataSetMetas: [] as { dataSetID: number, dataSetName: string; }[],
		train: function (dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[]) { },
		changeToReferring: function () { }
	};

	/**
	 * Status für diese Komponente
	 */
	state = {
		mouse: false,
		openNewWindow: false,
		value: '' as string,
		databaseList: [] as { dataSetID: number, dataSetName: string, chosen: boolean; }[],
		datasets: [] as { dataSetID: number, dataSetName: string, chosen: boolean; }[],
		imputators: [
			{ name: "Mittel", checked: true, tag: 'MEAN' },
			/*			NOT IMPLEMENTED
						{ name: "Letzer Wert fortgeführt", checked: false, tag: 'FORWARD' },
						{ name: "Bewegter Durchschnitt", checked: false, tag: 'MOVING' },
						{ name: "Lineare Interpolation", checked: false, tag: 'LINEAR' },
						{ name: "Spline Interpolation", checked: false, tag: 'SPLINE' }*/
		],
		scalers: [
			{ name: "Standard Scaler", checked: false, tag: 'STANDARD' },
			{ name: "Robust Scaler", checked: false, tag: 'ROBUST' },
			{ name: "Min-Max Scaler", checked: false, tag: 'MIN_MAX' },
			{ name: "Normalizer", checked: false, tag: 'NORMALIZER' },
			{ name: "Anteilstransformator", checked: false, tag: 'SHARE' }
		],
		myfeatures: [
			{ name: "Minimum", checked: false, tag: 'MIN' },
			{ name: "Maximum", checked: false, tag: 'MAX' },
			{ name: "Varianz", checked: false, tag: 'VARIANCE' },
			{ name: "Energie", checked: false, tag: 'ENERGY' },
			{ name: "Fourier-Transformation", checked: false, tag: 'FOURIER_TRANSFORM' },
			{ name: "Mittelwert", checked: false, tag: 'MEAN' },
			{ name: "Autoregressiv", checked: false, tag: 'AUTOREGRESSIVE' },
			{ name: "Abweichung", checked: false, tag: 'SKEWNESS' },
			{ name: "Wölbung", checked: false, tag: 'KURTOSIS' },
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

	/**
	 * Befüllt die beiden state-Variablen, die so aussehen, als müssten da die Datensätze des aktuellen Projekts rein, 
	 * mit den Daten aus der props-Variable dataSetMetas.
	 */
	componentWillReceiveProps(): void {
		this.setState({ databaseList: [] })
		for (const x of this.props.dataSetMetas) {
			this.state.databaseList.push({ dataSetName: x.dataSetName, dataSetID: x.dataSetID, chosen: false });
		}
	}

	/** 
		componentDidMount() {
			let newDatabaseList: { dataSetID: number, dataSetName: string, chosen: boolean; }[] = [];
			this.props.dataSetMetas?.map((dataset) => {
				newDatabaseList.push({ dataSetID: dataset.dataSetID, dataSetName: dataset.dataSetName, chosen: false });
				return dataset;
			});
			this.setState({ databaseList: newDatabaseList });
		}*/

	/**
	 * Wechseln Mausstatus
	 * @param flag Maus darauf
	 * @returns 
	 */
	handleMouse = (flag: boolean) => {
		return () => {
			this.setState({ mouse: flag });
		};
	};

	/**
	 * Klicken für checkbox von Datensätze
	 * @param id Gewählte ID
	 * @param chosen checked oder nicht
	 */
	handleCheck = (id: number, chosen: boolean) => {
		const { datasets } = this.state;
		const newDatasets = datasets.map((dataset) => {
			// eslint-disable-next-line
			if (dataset.dataSetID === id) return { ...dataset, chosen };
			else return dataset;
		});
		this.setState({ datasets: newDatasets });
	};

	/**
	 * Löschen Methode
	 * @param id löscht DatasetID
	 */
	handleDelete = (id: number) => {
		if (window.confirm('Sind Sie sicher, den gewählten Datensatz löschen zu wollen?')) {
			const { datasets } = this.state;
			const newDatasets = datasets.filter((dataset) => {
				return dataset.dataSetID !== id;
			});
			//update emailList
			this.setState({ datasets: newDatasets });
		}
	};

	/**
	 * Erstellung neue Fenster für Datensätze wählen
	 */
	handleCreate = () => {
		//if (this.state.databaseList == []) {
		//	}
		const flag = !this.state.openNewWindow;
		this.setState({ openNewWindow: flag });
	};

	/**
	 * Selektieren von DatabaseList
	 * @param e ChangeEventSelect
	 */
	handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({
			value: e.target.value
		});
	};

	/**
	 * Diese Methode verarbeitet die Events, die ausgelöst werden, wenn im Datensatz-Auswahlfenster ein Datensatz
	 * ausgewählt wird und diese Auswahl durch Drücken des zugehörigen Knopfes bestätigt wird.
	 */
	handleChoose = (): void => {
		if (this.state.value === '') {
			NotificationManager.error("Keine Option ausgewählt!", "", 3000);
			this.setState({ "openNewWindow": false });
			return;
		}
		let dataSets = this.state.datasets;
		this.props.dataSetMetas.map((entry): boolean => {
			if (entry.dataSetName == this.state.value) {
				dataSets.push({ dataSetID: entry.dataSetID, dataSetName: entry.dataSetName, chosen: true });
				return true;
			}
			return false;
		});
		this.setState({ "datasets": dataSets, "openNewWindow": false, "value": undefined });
	};

	/**
	 * Erzeugt die Dropdown-Liste im Datensatz-Auswahlfenster.
	 * Bereits ausgewählte Datensätze werden zwar angezeigt, sind aber ausgegraut.
	 * 
	 * @returns Ein Array aus JSX-DOM-Elementen
	 */
	options = (): JSX.Element[] => {
		return this.props.dataSetMetas.map(dataset => {
			if (this.state.datasets.map(entry => entry.dataSetID).includes(dataset.dataSetID)) {
				return <option key={dataset.dataSetID} value={dataset.dataSetName} disabled={true}>{dataset.dataSetName}</option>;
			}
			else {
				return <option key={dataset.dataSetID} value={dataset.dataSetName}>{dataset.dataSetName}</option>;
			}
		});
	};

	/**
	 * Check Imputation
	 * @param index Imputationindex
	 * @returns 
	 */
	handleImputation = (index: number) => {
		var newList = [...this.state.imputators];
		var newChosen = this.state.chosenImputator;
		if (newList[index].checked) { newChosen--; }
		else { newChosen++; }
		if (newChosen <= 1) {
			newList[index].checked = !newList[index].checked;
			this.setState({ chosenImputator: newChosen, imputators: newList });
		} else {
			NotificationManager.error("Es darf nur ein Imputer ausgewählt werden.", "", 3000);
			return;
		}
	};

	/**
	 * Check Scaler
	 * @param index Scalerindex 
	 * @returns 
	 */
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
			NotificationManager.error("Es darf nur ein Scaler ausgewählt werden.", "", 3000);
			return;
		}

	};

	/**
	 * Check Extraction
	 * @param index Extractionindex
	 */
	handleExtraction = (index: number) => {
		var newList = [...this.state.myfeatures];
		newList[index].checked = !newList[index].checked;
		this.setState({ features: newList });
	};

	/**
	 * Check Classifier
	 * @param index Classifierindex
	 * @returns 
	 */
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
			NotificationManager.error("Es darf nur ein Klassifizierer ausgewählt werden", "", 3000);
			return;
		}
	};

	/**
	 * Trainieren Methode
	 * @returns 
	 */
	handleTrain = () => {
		var dataSets: number[] = [], imputator = "", classifier = '', scaler = '', features: string[] = [];
		const { datasets, imputators, classifiers, scalers, myfeatures } = this.state;
		let datasetsflag = true, imputatorsflag = true, classifiersflag = true, scalersflag = true, featuresflag = true, nochoice = false;
		datasets.map((datasetObj) => {
			if (datasetObj.chosen) {
				datasetsflag = false;
				dataSets.push(datasetObj.dataSetID);
			}
			return datasetObj;
		});
		imputators.map((imputatorObj) => {
			if (imputatorObj.checked) {
				imputatorsflag = false;
				imputator = imputatorObj.tag;
			}
			return imputatorObj;
		});
		classifiers.map((classifierObj) => {
			if (classifierObj.checked) {
				classifiersflag = false;
				classifier = classifierObj.tag;
			}
			return classifierObj;
		});
		scalers.map((scalerObj) => {
			if (scalerObj.checked) {
				scalersflag = false;
				scaler = scalerObj.tag;
			}
			return scalerObj;
		});
		myfeatures.map((featureObj) => {
			if (featureObj.checked) {
				featuresflag = false;
				features.push(featureObj.tag);
			}
			return featureObj;
		});
		if (datasetsflag) {
			NotificationManager.error("Kein Datensatz ausgewählt!", "", 3000);
			nochoice = true;
		}
		if (imputatorsflag) {
			NotificationManager.error("Kein Imputer ausgewählt!", "", 3000);
			nochoice = true;
		}
		if (classifiersflag) {
			NotificationManager.error("Kein Klassifizierer ausgewählt!", "", 3000);
			nochoice = true;
		}
		if (scalersflag) {
			NotificationManager.error("Kein Scaler ausgewählt!", "", 3000);
			nochoice = true;
		}
		if (featuresflag) {
			NotificationManager.error("Keine Merkmale zur Extraktion ausgewählt!", "", 3000);
			nochoice = true;
		}
		if (nochoice) return;
		//console.log(chosendataSets, chosenImputator, chosenclassifier, chosenscaler, chosenFeatures)
		this.props.train(dataSets, imputator, classifier, scaler, features);
	};

	/**
	 * Wechseln zu Darstellungsseite
	 */
	handleChangePage() {
		this.props.changeToReferring();
	}

	/**
	 * Render Methode des Komponenten
	 * @returns Aufbau des Komponenten
	 */
	render() {
		const { mouse, datasets, imputators, scalers, myfeatures, classifiers } = this.state;
		return (
			<div className="train">
				<h3>Datasets</h3>
				{datasets.map(dataset => {
					return (

						<li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)} className='list' >
							<label>
								<input type="checkbox" checked={dataset.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheck(dataset.dataSetID, e.target.checked)} />
								<span>{dataset.dataSetName}</span>
							</label>
							<button onClick={() => this.handleDelete(dataset.dataSetID)} type='button' className="btn-item" style={{ display: mouse ? 'block' : 'none' }}>Löschen</button>
						</li>
					);
				})}

				<div className="adddatasetbutton">
					{this.state.openNewWindow && (
						<NewWindow>
							<div className="login-window">
								<h1>DatabaseList</h1>
								<select onChange={this.handleChange}>
									<option value="">choose dataset</option>
									{this.options()}
								</select>
								<button onClick={this.handleChoose} className="choose-btn" type='button' >Add!</button>
							</div>
						</NewWindow>
					)}
					<button onClick={() => this.handleCreate()} className="create-btn" type='button' >Add new Dataset</button>
				</div>
				<div className="list">
					<div className="imputationlist">
						<h3>Imputation</h3>
						{imputators.map((imputator, index) => {
							return (
								<div key={index}>
									<input className='imputationcheck' type="checkbox" value={index} checked={imputator.checked} onChange={() => this.handleImputation(index)} /><span>{imputator.name}</span>
								</div>
							);
						})}
					</div>
					<div className="scalerlist">
						<h3>Normalisierung</h3>
						{scalers.map((scaler, index) => {
							return (
								<div key={index}>
									<input className='scalercheck' type="checkbox" value={index} checked={scaler.checked} onChange={() => this.handleScaler(index)} /><span>{scaler.name}</span>
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
									<input className='featurecheck' type="checkbox" value={index} checked={extraction.checked} onChange={() => this.handleExtraction(index)} /><span>{extraction.name}</span>
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
									<input className='classifiercheck' type="checkbox" value={index} checked={classifier.checked} onChange={() => this.handleClassifier(index)} /><span>{classifier.name}</span>
								</div>
							);
						})}
					</div>
				</div>
				<br></br>

				<div className="clearfloat">
					<button onClick={() => this.handleTrain()} className="train-btn" type='button' >Train Start!</button>
					<button onClick={() => this.handleChangePage()} className="changepage-btn" type='button' >Zur Verweisseite zurück</button>
				</div>
			</div>


		);
	}


}
