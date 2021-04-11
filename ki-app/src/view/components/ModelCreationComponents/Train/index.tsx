import React, { Component } from 'react';
import NewWindow from 'react-new-window';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Train.css';
export default class Train extends Component {
	private static readonly T_IMPUTER_MEAN_DE: string = "Arithmetischer Mittelwert";
	private static readonly T_SCALER_STANDARD_DE: string = "Standard Scaler";
	private static readonly T_SCALER_ROBUST_DE: string = "Robust Scaler";
	private static readonly T_SCALER_MIN_MAX_DE: string = "Min-Max Scaler";
	private static readonly T_SCALER_NORMALIZER_DE: string = "Normalizer";
	private static readonly T_FEATURE_MIN_DE: string = "Minimum";
	private static readonly T_FEATURE_MAX_DE: string = "Maximum";
	private static readonly T_FEATURE_VARIANCE_DE: string = "Varianz";
	private static readonly T_FEATURE_ENERGY_DE: string = "Energie";
	private static readonly T_FEATURE_FOURIER_TRANSFORM_DE: string = "Fourier-Transformation";
	private static readonly T_FEATURE_MEAN_DE: string = "Mittelwert";
	private static readonly T_FEATURE_AUTOREGRESSIVE_DE: string = "Autoregression";
	private static readonly T_FEATURE_SKEWNESS_DE: string = "Abweichung";
	private static readonly T_FEATURE_KURTOSIS_DE: string = "Wölbung";
	private static readonly T_FEATURE_IQR_DE: string = "Quantil-Regression";
	private static readonly T_CLASSIFIER_MLP_DE: string = "Multi-Level-Perceptron (Neurales Netz)";
	private static readonly T_CLASSIFIER_RANDOM_FOREST_DE: string = "Random-Forest-Klassifizierer";
	private static readonly T_CLASSIFIER_K_NEIGHBORS_DE: string = "K-nächster-Nachbar-Methode";
	private static readonly T_CLASSIFIER_SVM_DE: string = "Stützvektor-Maschine";
	private static readonly Q_DATASET_DELETE_DE: string = 'Sind Sie sich sicher, den gewählten Datensatz löschen zu wollen?';
	private static readonly E_DATASET_EMPTY_SELECTION_DE: string = "Kein Datensatz ausgewählt!";
	private static readonly E_IMPUTER_MULTI_SELECTION_DE: string = "Es darf nur ein Imputer ausgewählt werden.";
	private static readonly E_SCALER_MULTI_SELECTION_DE: string = "Es darf nur ein Scaler ausgewählt werden.";
	private static readonly E_CLASSIFIER_MULTI_SELECTION_DE: string = "Es darf nur ein Klassifizierer ausgewählt werden.";
	private static readonly E_DATASET_NO_SELECTION_DE: string = "Kein Datensatz ausgewählt!";
	private static readonly E_IMPUTER_NO_SELECTION_DE: string = "Kein Imputer ausgewählt!";
	private static readonly E_SCALER_NO_SELECTION_DE: string = "Kein Scaler ausgewählt!";
	private static readonly E_FEATURE_NO_SELECTION_DE: string = "Keine Merkmale zur Extraktion ausgewählt!";
	private static readonly E_CLASSIFIER_NO_SELECTION_DE: string = "Kein Klassifizierer ausgewählt!";
	private static readonly T_DATASET_TITLE_DE: string = "Verwendete Datensätze";
	private static readonly T_DATASET_DELETE_DE: string = "Löschen";
	private static readonly T_DATASET_LIST_TITLE_DE: string = "Datensatzliste";
	private static readonly T_DATASET_LIST_DROPDOWN_DE: string = "Datensatz auswählen";
	private static readonly T_DATASET_LIST_ADD_DE: string = "Hinzufügen";
	private static readonly T_DATASET_ADD_DE: string = "Datensatz hinzufügen";
	private static readonly T_IMPUTER_TITLE_DE: string = "Imputation";
	private static readonly T_SCALER_TITLE_DE: string = "Normalisierung (Scaling)";
	private static readonly T_FEATURE_TITLE_DE: string = "Merkmalsextraktion";
	private static readonly T_CLASSIFIER_TITLE_DE: string = "Klassifizierer";
	private static readonly T_BUTTON_START_DE: string = "KI-Modell trainieren";
	private static readonly T_BUTTON_HOME_DE: string = "Zurück zur Verweisseite";

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
			{ name: Train.T_IMPUTER_MEAN_DE,  checked: true,  tag: 'MEAN'    },
			/*			NOT IMPLEMENTED
			{ name: "Letze Werte fortführen", checked: false, tag: 'FORWARD' },
			{ name: "Bewegter Durchschnitt",  checked: false, tag: 'MOVING'  },
			{ name: "Lineare Interpolation",  checked: false, tag: 'LINEAR'  },
			{ name: "Spline Interpolation",   checked: false, tag: 'SPLINE'  }*/
		],
		scalers: [
			{ name: Train.T_SCALER_STANDARD_DE,   checked: false, tag: 'STANDARD'   },
			{ name: Train.T_SCALER_ROBUST_DE,     checked: false, tag: 'ROBUST'     },
			{ name: Train.T_SCALER_MIN_MAX_DE,    checked: false, tag: 'MIN_MAX'    },
			{ name: Train.T_SCALER_NORMALIZER_DE, checked: false, tag: 'NORMALIZER' },
		/*	{ name: "Anteilstransformator",       checked: false, tag: 'SHARE'      }	NOT IMPLEMENTED */
		],
		myfeatures: [
			{ name: Train.T_FEATURE_MIN_DE,               checked: false, tag: 'MIN'               },
			{ name: Train.T_FEATURE_MAX_DE,               checked: false, tag: 'MAX'               },
			{ name: Train.T_FEATURE_VARIANCE_DE,          checked: false, tag: 'VARIANCE'          },
			{ name: Train.T_FEATURE_ENERGY_DE,            checked: false, tag: 'ENERGY'            },
			{ name: Train.T_FEATURE_FOURIER_TRANSFORM_DE, checked: false, tag: 'FOURIER_TRANSFORM' },
			{ name: Train.T_FEATURE_MEAN_DE,              checked: false, tag: 'MEAN'              },
			{ name: Train.T_FEATURE_AUTOREGRESSIVE_DE,    checked: false, tag: 'AUTOREGRESSIVE'    },
			{ name: Train.T_FEATURE_SKEWNESS_DE,          checked: false, tag: 'SKEWNESS'          },
			{ name: Train.T_FEATURE_KURTOSIS_DE,          checked: false, tag: "KURTOSIS"          },
			{ name: Train.T_FEATURE_IQR_DE,               checked: false, tag: "IQR"               }
		],
		classifiers: [
			{ name: Train.T_CLASSIFIER_MLP_DE,           checked: false, tag: 'MLP'           },
			{ name: Train.T_CLASSIFIER_RANDOM_FOREST_DE, checked: false, tag: 'RANDOM_FOREST' },
			{ name: Train.T_CLASSIFIER_K_NEIGHBORS_DE,   checked: false, tag: 'K_NEIGHOBORS'  },
			{ name: Train.T_CLASSIFIER_SVM_DE,           checked: false, tag: 'SVM'           }
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
		if (window.confirm(Train.Q_DATASET_DELETE_DE)) {
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
		this.setState({ openNewWindow: !this.state.openNewWindow });
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
			NotificationManager.error(Train.E_DATASET_EMPTY_SELECTION_DE, "", 3000);
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
			NotificationManager.error(Train.E_IMPUTER_MULTI_SELECTION_DE, "", 3000);
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
			NotificationManager.error(Train.E_SCALER_MULTI_SELECTION_DE, "", 3000);
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
			NotificationManager.error(Train.E_CLASSIFIER_MULTI_SELECTION_DE, "", 3000);
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
			NotificationManager.error(Train.E_DATASET_NO_SELECTION_DE, "", 3000);
			nochoice = true;
		}
		if (imputatorsflag) {
			NotificationManager.error(Train.E_IMPUTER_NO_SELECTION_DE, "", 3000);
			nochoice = true;
		}
		if (classifiersflag) {
			NotificationManager.error(Train.E_CLASSIFIER_NO_SELECTION_DE, "", 3000);
			nochoice = true;
		}
		if (scalersflag) {
			NotificationManager.error(Train.E_SCALER_NO_SELECTION_DE, "", 3000);
			nochoice = true;
		}
		if (featuresflag) {
			NotificationManager.error(Train.E_FEATURE_NO_SELECTION_DE, "", 3000);
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
				<h3  className="text">{Train.T_DATASET_TITLE_DE}</h3>
				{datasets.map(dataset => {
					return (

						<li style={{ backgroundColor: mouse ? '#ddd' : '#fff' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)} className='list' >
							<label>
								<input type="checkbox" checked={dataset.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheck(dataset.dataSetID, e.target.checked)} />
								<span>{dataset.dataSetName}</span>
							</label>
							<button onClick={() => this.handleDelete(dataset.dataSetID)} type='button' className="btn-item" style={{ display: mouse ? 'block' : 'none' }}>{Train.T_DATASET_DELETE_DE}</button>
						</li>
					);
				})}

				<div className="adddatasetbutton">
					{this.state.openNewWindow && (
						<NewWindow>
							<div className="login-window">
								<h1  className="text">{Train.T_DATASET_LIST_TITLE_DE}</h1>
								<select onChange={this.handleChange} className="text2" >
									<option value=""  className="text2">{Train.T_DATASET_LIST_DROPDOWN_DE}</option>
									{this.options()}
								</select >
								<button onClick={this.handleChoose} className="choose-btn" type='button' >{Train.T_DATASET_LIST_ADD_DE}</button>
							</div>
						</NewWindow>
					)}
					<button onClick={() => this.handleCreate()} className="create-btn" type='button' >{Train.T_DATASET_ADD_DE}</button>
				</div>
				<div className="list">
					<div className="imputationlist">
						<h3  className="text">{Train.T_IMPUTER_TITLE_DE}</h3>
						{imputators.map((imputator, index) => {
							return (
								<div key={index}>
									<input className='imputationcheck' type="checkbox" value={index} checked={imputator.checked} onChange={() => this.handleImputation(index)} /><span>{imputator.name}</span>
								</div>
							);
						})}
					</div>
					<div className="scalerlist">
						<h3   className="text">{Train.T_SCALER_TITLE_DE}</h3>
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
						<h3  className="text">{Train.T_FEATURE_TITLE_DE}</h3>
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
						<h3  className="text">{Train.T_CLASSIFIER_TITLE_DE}</h3>
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
					<button onClick={() => this.handleTrain()} className="train-btn" type='button' >{Train.T_BUTTON_START_DE}</button>
					<button onClick={() => this.handleChangePage()} className="changepage-btn" type='button' >{Train.T_BUTTON_HOME_DE}</button>
				</div>
			</div>


		);
	}


}
