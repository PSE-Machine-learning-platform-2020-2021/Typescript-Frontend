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

export class ModelCreationPage implements Page {
	state: State;
	observers: PageController[] = [];

	constructor () {
		this.state = new State();
	}

	update () {
		this.notify();
		const VDOM = (
			<div>
				<Train
					dataSetMetas={ this.state.dataSetMetas! }
					train={ this.train.bind( this ) }
				/>
				<NotificationContainer />
			</div>
		);
		if ( document.getElementById( 'root' ) !== null ) {
			ReactDOM.render( VDOM, document.getElementById( 'root' ) );
		}
	}

	attach ( observer: PageController ) {
		this.observers.push( observer );
	}

	detach ( observer: PageController ) {
		const index = this.observers.indexOf( observer, 0 );
		if ( index > -1 ) {
			this.observers.splice( index, 1 );
		}
	}

	notify () {
		for ( let index = 0; index < this.observers.length; index++ ) {
			const element = this.observers[ index ];
			element.update();
		}
	}

	getState () {
		return this.state;
	}

	setState ( state: any ) {
		this.state = state;
		this.update();
	}

	private train ( dataSets: number[], imputator: string, classifier: string, scaler: string, features: string[] ) {
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

}
