import React from 'react';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from 'react-dom';
import './ModelCreationPage.css';
import { States } from '../State';
import Train from '../../components/ModelCreationComponents/Train';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//Modellerstellungsseite
export class ModelCreationPage implements Page {
	private state: State;
	private observers: PageController[] = [];

	private static readonly T_PAGE_TITLE_DE = "Modellerstellung"

	/**
	* Konstruktor der Modellerstellungsseite.
	*/
	constructor() {
		this.state = new State();
		this.update()
	}

	/**
	* Update Methode der Modellerstellungsseite. Diese Methode wird nach jeder Änderung, die kein Seitenwechsel ist, aufgerufen. 
	* Die Methode enthält den Aufbau der Seite und wird von ihr gerendert.
	* Es werden durch notify() alle controller über ein Update informiert und alle Seiten Elemente werden aktualisiert und erneut gerendert. 
	*/
	update() {
		this.notify();
		const VDOM = (
			<div>
				<h1 className="title">{ModelCreationPage.T_PAGE_TITLE_DE}</h1>
				<Train
					dataSetMetas={this.state.dataSetMetas!}
					train={this.train.bind(this)}
					changeToReferring={this.changeToReferring.bind(this)}
				/>
				<NotificationContainer />
			</div>
		);
		if (document.getElementById('root') !== null) {
			ReactDOM.render(VDOM, document.getElementById('root'));
		}
	}
	/**
	* Durch diese Methode kann sich ein Controller als Beobachter anmelden.
	* @param oberver neuer Beobachter
	*/
	attach(observer: PageController) {
		this.observers.push(observer);
	}

	/**
	* Durch diese Methode kann sich ein Controller als Beobachter abmelden.
	* @param oberver Beobachter der zu entfernen ist
	*/
	detach(observer: PageController) {
		const index = this.observers.indexOf(observer, 0);
		if (index > -1) {
			this.observers.splice(index, 1);
		}
	}

	/**
	* Durch diese Methode werden alle Beobachter über eine Änderung auf der Seite informiert.
	*/
	notify() {
		for (let index = 0; index < this.observers.length; index++) {
			const element = this.observers[index];
			element.update();
		}
	}

	/**
	* Gibt den Status der Seite zurück
	*/
	getState() {
		return this.state;
	}

	/**
	 * Setzt einen neuen Zustand für die Seite und aktualisiert sie
	 * @param state neuer Zustand für die Seite
	 */
	setState(state: any) {
		this.state = state;
		this.update();
	}

	/**
	 * Trainierung
	 * @param dataSets               - Die zum Training zu verwendenden Datensätze.
	 * @param imputator              - Der zur Vervollständigung der Daten zu verwendende Imputer.
	 * @param classifier             - Der Klassifizierer, der das Herzstück des zu erstellenden KI-Modells darstellt.
	 * @param scaler                 - Der Scaler, der die Daten für den Klassifizierer aufbereitet.
	 * @param features               - Die Merkmale, die aus den gegebenen Datensätzen herausgearbeitet werden sollen.
	 */
	private train(dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[]) {
		// eslint-disable-next-line
		this.state.currentState = States.NeedKiTraining;
		// eslint-disable-next-line
		this.state.trainingParameter!.dataSets = dataSets;
		this.state.trainingParameter!.imputator = imputator;
		this.state.trainingParameter!.classifier = classifier;
		this.state.trainingParameter!.scaler = scaler;
		this.state.trainingParameter!.features = features;
		this.notify();
	}

	/**
	 * Wechsel der Seite zur Darstellungsseite.
	 */
	private changeToReferring() {
		this.state.currentState = States.ChangeToRefferring
		this.notify()
	}
}
