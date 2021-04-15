import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import ChangeToVisuBtn from '../ChangeToVisuBtn';
import LinkText from '../LinkText';
import ModelList from '../ModelList';
import QRImage from '../QRImage';

/**
 * Projektliste
 */
export default class ProjectList extends Component {

    /**
     * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
     */
    props = {
        projectData: [{ projectID: -1, projectName: "null", AIModelID: [-1], }],
        pageSetCurrentprojekt: function (currentProject: { projectID: number; projectName: string; AIModelID: number[]; }) { },
        pageLoadModel: function (chosenmodelID: number) { },
        pageLoadProjekt: function (currentProject: { projectID: number; projectName: string; AIModelID: number[]; }) { },
        pageChangeToVisu: function () { },
        qr: '',
        link: ''
    };

    /**
     * Status für diese Komponente
     */
    state = {
        value: null,
        click: false,
        loadclick: false,
        currentProject: { projectID: -1, projectName: "", AIModelID: [] }
    };

    /**
     * Selektieren in Modelliste
     * @param e ChangeEvent
     */
    private handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            value: e.target.value
        });
    };

    /**
     * Wenn es gibt, erstellt Modelliste nach Klicken
     */
    private handleChoose() {
        if (this.state.value === null) {
            NotificationManager.error("Sie haben noch kein Projekt gewählt", "", 3000);
        } else {
            this.props.projectData.map((projectObj) => {
                if (Number(this.state.value) === projectObj.projectID) {
                    console.log(projectObj)
                    if (projectObj.AIModelID.length !== 0) {
                        for (let index = 0; index < this.props.projectData!.length; index++) {
                            if (projectObj.projectID === this.props.projectData![index].projectID) {
                                ;
                                this.setState({ currentProject: projectObj });
                                this.props.pageSetCurrentprojekt(projectObj);
                                break;
                            }
                        }
                        this.setState({ click: true });
                    } else {
                        this.setState({ click: false });
                        NotificationManager.error('Es gibt noch kein KI-Modell in diesem Projekt!', "", 3000);
                    }
                }
                return projectObj;
            });
        }
    }

    /**
     * Methode für Projekt laden
     */
    private handleLoad() {
        if (this.state.value === null) {
            NotificationManager.error("Sie haben noch kein Projekt ausgewählt", "", 3000);
        } else {
            this.props.projectData.map((projectObj) => {
                if (Number(this.state.value) === projectObj.projectID) {
                    //let id: number = projectObj.projectID;
                    this.props.pageLoadProjekt(projectObj);
                    this.setState({ loadclick: true });
                }
                return projectObj;
            });
        }
    }

    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        return (
            <section className='projectlist'>
                <div className="view-section">
                    <label>Projektliste</label>
                    <select onChange={this.handleChange}>
                        <option>Projekt wählen</option>
                        {this.props.projectData.map(projectObj => <option value={projectObj.projectID} key={projectObj.projectID}>{projectObj.projectName}</option>)}
                    </select>
                    <button onClick={() => this.handleChoose()} className="pl-btn" type="button" >Modellliste laden</button>
                    <button onClick={() => this.handleLoad()} className="pl-btn" type="button" >Projekt laden</button>
                </div>
                {this.state.loadclick ?
                <div className="view-section">
                    <div className="view-section">
                        <QRImage qr={this.props.qr} />
                        <LinkText link={this.props.link}/>
                    </div>
                    <ChangeToVisuBtn pageChangeToVisu={this.props.pageChangeToVisu} /> 
                </div>
                 : null}
                
                {this.state.click ? <div className="view-section"> <ModelList pageLoadModel={this.props.pageLoadModel} currentProject={this.state.currentProject} /></div> : null}
            </section>
        );
    }
}
