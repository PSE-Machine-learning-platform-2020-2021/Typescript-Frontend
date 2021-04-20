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
	private static readonly E_IMPUTER_MULTI_SELECTION_DE: string = "Es darf nur ein Imputer ausgewählt werden.";
	private static readonly E_SCALER_MULTI_SELECTION_DE: string = "Es darf nur ein Scaler ausgewählt werden.";
	private static readonly E_CLASSIFIER_MULTI_SELECTION_DE: string = "Es darf nur ein Klassifizierer ausgewählt werden.";
	private static readonly E_DATASET_NO_SELECTION_DE: string = "Kein Datensatz ausgewählt!";
	private static readonly E_IMPUTER_NO_SELECTION_DE: string = "Kein Imputer ausgewählt!";
	private static readonly E_SCALER_NO_SELECTION_DE: string = "Kein Scaler ausgewählt!";
	private static readonly E_FEATURE_NO_SELECTION_DE: string = "Keine Merkmale zur Extraktion ausgewählt!";
	private static readonly E_CLASSIFIER_NO_SELECTION_DE: string = "Kein Klassifizierer ausgewählt!";
	private static readonly T_DATASET_TITLE_DE: string = "Verwendete Datensätze";
	private static readonly T_IMPUTER_TITLE_DE: string = "Imputation";
	private static readonly T_SCALER_TITLE_DE: string = "Normalisierung (Scaling)";
	private static readonly T_FEATURE_TITLE_DE: string = "Merkmalsextraktion";
	private static readonly T_CLASSIFIER_TITLE_DE: string = "Klassifizierer";
	private static readonly T_BUTTON_START_DE: string = "KI-Modell trainieren";
	private static readonly T_BUTTON_HOME_DE: string = "Zurück zur Verweisseite";
	private static readonly T_DATASET_CHOOSEALL_DE: string = "Alle Datensätze wählen";
	private static readonly T_FEATURE_CHOOSEALL_DE: string = "Alle Merkmale wählen";


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
		value: '' as string,
		dataSets: [] as number[],
		imputators: [
			{ name: Train.T_IMPUTER_MEAN_DE, checked: true, tag: 'MEAN' },
			/*			NOT IMPLEMENTED
			{ name: "Letze Werte fortführen", checked: false, tag: 'FORWARD' },
			{ name: "Bewegter Durchschnitt",  checked: false, tag: 'MOVING'  },
			{ name: "Lineare Interpolation",  checked: false, tag: 'LINEAR'  },
			{ name: "Spline Interpolation",   checked: false, tag: 'SPLINE'  }*/
		],
		scalers: [
			{ name: Train.T_SCALER_STANDARD_DE, checked: false, tag: 'STANDARD' },
			{ name: Train.T_SCALER_ROBUST_DE, checked: false, tag: 'ROBUST' },
			{ name: Train.T_SCALER_MIN_MAX_DE, checked: false, tag: 'MIN_MAX' },
			{ name: Train.T_SCALER_NORMALIZER_DE, checked: false, tag: 'NORMALIZER' },
			/*	{ name: "Anteilstransformator",       checked: false, tag: 'SHARE'      }	NOT IMPLEMENTED */
		],
		myfeatures: [
			{ name: Train.T_FEATURE_MIN_DE, checked: false, tag: 'MIN' },
			{ name: Train.T_FEATURE_MAX_DE, checked: false, tag: 'MAX' },
			{ name: Train.T_FEATURE_VARIANCE_DE, checked: false, tag: 'VARIANCE' },
			{ name: Train.T_FEATURE_ENERGY_DE, checked: false, tag: 'ENERGY' },
			{ name: Train.T_FEATURE_FOURIER_TRANSFORM_DE, checked: false, tag: 'FOURIER_TRANSFORM' },
			{ name: Train.T_FEATURE_MEAN_DE, checked: false, tag: 'MEAN' },
			{ name: Train.T_FEATURE_AUTOREGRESSIVE_DE, checked: false, tag: 'AUTOREGRESSIVE' },
			{ name: Train.T_FEATURE_SKEWNESS_DE, checked: false, tag: 'SKEWNESS' },
			{ name: Train.T_FEATURE_KURTOSIS_DE, checked: false, tag: "KURTOSIS" },
			{ name: Train.T_FEATURE_IQR_DE, checked: false, tag: "IQR" }
		],
		classifiers: [
			{ name: Train.T_CLASSIFIER_MLP_DE, checked: false, tag: 'MLP' },
			{ name: Train.T_CLASSIFIER_RANDOM_FOREST_DE, checked: false, tag: 'RANDOM_FOREST' },
			{ name: Train.T_CLASSIFIER_K_NEIGHBORS_DE, checked: false, tag: 'K_NEIGHOBORS' },
			{ name: Train.T_CLASSIFIER_SVM_DE, checked: false, tag: 'SVM' }
		],
		chosenScaler: 0,
		chosenclassifier: 0,
		chosenImputator: 0,
		chooseDataSetsFlag: false,
		chooseFeatureFlag: false
	};

	/**
	 * Diese Methode fertigt das Ereignis ab, das ausgelöst wird, wenn eine der Datensatz-Checkboxen angeklickt wird.
	 * @param id Datasetindex
	 */
	handleDataset = (id: number): void => {
		let dataSets = this.state.dataSets;
		if (dataSets.includes(id)) {
			this.setState({ dataSets: dataSets.filter(value => value != id) });
		}
		else {
			dataSets.push(id)
			this.setState({ dataSets: dataSets});
		}
	};

	/**
	 * Choose all Dataset
	 * @param e InputEvent
	 */
	chosenAllDatasets = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const chosen = e.target.checked;
		const newflag = !(this.state.chooseDataSetsFlag);
		if(chosen) {
			this.setState({ dataSets: this.props.dataSetMetas.map(dataSet => dataSet.dataSetID), chooseDataSetsFlag: newflag });
		}
		else {
			this.setState({dataSets: [], chooseDataSetsFlag: newflag})
		}
	}

	/**
	 * Check Imputation
	 * @param index Imputationindex
	 * @returns 
	 */
	handleImputation = (index: number): void => {
		let newList = [...this.state.imputators];
		let newChosen = this.state.chosenImputator;
		if (newList[index].checked) { newChosen--; }
		else { newChosen++; }
		if (newChosen <= 1) {
			newList[index].checked = !newList[index].checked;
			this.setState({ chosenImputator: newChosen, imputators: newList });
		} else {
			NotificationManager.error(Train.E_IMPUTER_MULTI_SELECTION_DE, "", 3000);
		}
	};

	/**
	 * Check Scaler
	 * @param index Scalerindex 
	 * @returns 
	 */
	handleScaler = (index: number): void => {
		let newList = [...this.state.scalers];
		let newChosen = this.state.chosenScaler;
		if (newList[index].checked) { newChosen--; }
		else { newChosen++; }
		if (newChosen <= 1) {
			newList[index].checked = !newList[index].checked;
			this.setState({ chosenScaler: newChosen, scalers: newList });
		}
		else {
			NotificationManager.error(Train.E_SCALER_MULTI_SELECTION_DE, "", 3000);
		}
	};

	/**
	 * Check Extraction
	 * @param index Extractionindex
	 */
	handleExtraction = (index: number): void => {
		let newList = [...this.state.myfeatures];
		newList[index].checked = !newList[index].checked;
		this.setState({ features: newList });
	};

	/**
	 * Choose all Extraction
	 * @param e InputEvent
	 */
	chosenAllExtraction = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const checked = e.target.checked;
		const { myfeatures, chooseFeatureFlag } = this.state;
		const newflag = !chooseFeatureFlag
		const newList = myfeatures.map(myfeature => { return { ...myfeature, checked }; });
		this.setState({ myfeatures: newList, chooseFeatureFlag: newflag })
	}

	/**
	 * Check Classifier
	 * @param index Classifierindex
	 * @returns 
	 */
	handleClassifier = (index: number): void => {
		let newList = [...this.state.classifiers];
		let newChosen = this.state.chosenclassifier;
		if (newList[index].checked) { newChosen--; }
		else { newChosen++; }
		if (newChosen <= 1) {
			newList[index].checked = !newList[index].checked;
			this.setState({ chosenclassifier: newChosen, classifiers: newList });
		}
		else {
			NotificationManager.error(Train.E_CLASSIFIER_MULTI_SELECTION_DE, "", 3000);
		}
	};

	/**
	 * Trainieren Methode
	 * @returns 
	 */
	handleTrain = (): void => {
		let imputator = "", classifier = '', scaler = '', features: string[] = [];
		const { dataSets, imputators, classifiers, scalers, myfeatures } = this.state;
		let imputatorsflag = true, classifiersflag = true, scalersflag = true, featuresflag = true, nochoice = false;
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
		if (dataSets.length == 0) {
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
	render(): JSX.Element {
		const { imputators, scalers, myfeatures, classifiers, chooseDataSetsFlag, chooseFeatureFlag } = this.state;
		return (
			<div className="train view-section">
				<div className="view-section">
					<div className="list">
						<h3 className="text">{Train.T_DATASET_TITLE_DE}</h3>
						{this.props.dataSetMetas.map((dataSet, index) => {
							return (
								<div key={index}>
									<input className='datasetscheck' type="checkbox" id={"D" + index.toString()} value={index} checked={this.state.dataSets.includes(dataSet.dataSetID)} onChange={() => this.handleDataset(dataSet.dataSetID)} />
									<label htmlFor={"D" + index.toString()}>{dataSet.dataSetName}</label>

								</div>
							);
						})}
						<input className='chooseall' type="checkbox" id={"D"} onChange={this.chosenAllDatasets} checked={chooseDataSetsFlag} />
						<label htmlFor={"D"}>{Train.T_DATASET_CHOOSEALL_DE}</label>
					</div>
					<div className="list">
						<div className="imputationlist">
							<h3 className="text">{Train.T_IMPUTER_TITLE_DE}</h3>
							{imputators.map((imputator, index) => {
								return (
									<div key={index}>
										<input className='imputationcheck' type="checkbox" id={"I" + index.toString()} value={index} checked={imputator.checked} onChange={() => this.handleImputation(index)} />
										<label htmlFor={"I" + index.toString()}>{imputator.name}</label>
									</div>
								);
							})}
						</div>
						<div className="scalerlist">
							<h3 className="text">{Train.T_SCALER_TITLE_DE}</h3>
							{scalers.map((scaler, index) => {
								return (
									<div key={index}>
										<input className='scalercheck' type="checkbox" id={"S" + index.toString()} value={index} checked={scaler.checked} onChange={() => this.handleScaler(index)} />
										<label htmlFor={"S" + index.toString()}>{scaler.name}</label>
									</div>
								);
							})
							}
						</div>
						<div className="classifierlist">
							<h3 className="text">{Train.T_CLASSIFIER_TITLE_DE}</h3>
							{classifiers.map((classifier, index) => {
								return (
									<div key={index}>
										<input className='classifiercheck' type="checkbox" id={"C" + index.toString()} value={index} checked={classifier.checked} onChange={() => this.handleClassifier(index)} />
										<label htmlFor={"C" + index.toString()}>{classifier.name}</label>
									</div>
								);
							})}
						</div>
					</div>
					<div className="list">
						<div className="extractionlist">
							<h3 className="text">{Train.T_FEATURE_TITLE_DE}</h3>
							{myfeatures.map((extraction, index) => {
								return (
									<div key={index}>
										<input className='featurecheck' type="checkbox" id={"F" + index.toString()} value={index} checked={extraction.checked} onChange={() => this.handleExtraction(index)} />
										<label htmlFor={"F" + index.toString()}>{extraction.name}</label>
									</div>
								);
							})
							}
							<input className='chooseall' type="checkbox" id={"F"} onChange={this.chosenAllExtraction} checked={chooseFeatureFlag} />
							<label htmlFor={"F"}>{Train.T_FEATURE_CHOOSEALL_DE}</label>
						</div>

					</div>
					<div className="clearfloat"></div>
				</div>
				<div className="view-section">
					<button onClick={() => this.handleTrain()} className="train-btn" type='button' >{Train.T_BUTTON_START_DE}</button>
					<button onClick={() => this.handleChangePage()} className="changepage-btn" type='button' >{Train.T_BUTTON_HOME_DE}</button>
				</div>
			</div>


		);
	}


}
