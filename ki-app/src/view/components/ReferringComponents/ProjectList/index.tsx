import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import ChangeToVisuBtn from '../ChangeToVisuBtn';
import ModelList from '../ModelList';
import QRImage from '../QRImage';
import './ProjectList.css';


export default class ProjectList extends Component {

    props = {
        projectData: [ { projectID: -1, projectName: "null", AIModelID: [ -1 ], } ],
        pageSetCurrentprojekt: function ( currentProject: { projectID: number; projectName: string; AIModelID: number[]; } ) { },
        pageLoadModel: function ( chosenmodelID: number ) { },
        pageLoadProjekt: function ( currentProject: { projectID: number; projectName: string; AIModelID: number[]; } ) { },
        pageChangeToVisu: function () { },
        qr: ''
    };

    state = {
        value: null,
        click: false,
        loadclick: false,
        currentProject: { projectID: -1, projectName: "", AIModelID: [] }
    };

    private handleChange = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
        this.setState( {
            value: e.target.value
        } );
    };

    private handleChoose () {
        if ( this.state.value == null ) {
            NotificationManager.error( "Sie haben noch kein Projekt gewählt", "", 3000 );
        } else {
            this.props.projectData.map( ( projectObj ) => {
                if ( this.state.value == projectObj.projectID ) {
                    if ( projectObj.AIModelID.length != 0 ) {
                        for ( let index = 0; index < this.props.projectData!.length; index++ ) {
                            if ( projectObj.projectID == this.props.projectData![ index ].projectID ) {
                                ;
                                this.setState( projectObj );
                                this.props.pageSetCurrentprojekt( projectObj );
                                break;
                            }
                        }
                        this.setState( { click: true } );
                    } else {
                        this.setState( { click: false } );
                        NotificationManager.error( 'Es gibt keine Model in diesem Projekt!', "", 3000 );
                    }
                }
            } );
        }
    }

    private handleLoad () {
        if ( this.state.value == null ) {
            NotificationManager.error( "Sie haben noch kein Projekt gewählt", "", 3000 );
        } else {
            this.props.projectData.map( ( projectObj ) => {
                if ( this.state.value == projectObj.projectID ) {
                    let id: number = projectObj.projectID;
                    this.props.pageLoadProjekt( projectObj );
                    this.setState( { loadclick: true } );
                }
            } );
        }
    }

    render () {
        return (
            <section className='projectlist'>
                <label>ProjektList</label>
                <select onChange={ this.handleChange }>
                    <option>Projekt Wählen</option>
                    { this.props.projectData.map( ( projectObj ) => {
                        return <option value={ projectObj.projectID } key={ projectObj.projectID }>{ projectObj.projectName }</option>;
                    } ) }
                </select>
                <button onClick={ () => this.handleChoose() } className="pl-btn" type="button" >Modellliste ladent </button>
                <button onClick={ () => this.handleLoad() } className="pl-btn" type="button" >Projekt laden</button>
                {this.state.loadclick ? <div> <QRImage qr={ this.props.qr } /><ChangeToVisuBtn pageChangeToVisu={ this.props.pageChangeToVisu } /></div> : null }
                {this.state.click ? <div> <ModelList pageLoadModel={ this.props.pageLoadModel } currentProject={ this.state.currentProject } /></div> : null }
            </section>

        );
    }
}
