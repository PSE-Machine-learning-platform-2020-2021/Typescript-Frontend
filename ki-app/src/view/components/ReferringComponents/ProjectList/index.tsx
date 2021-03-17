import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications';
import ChangeToVisuBtn from '../ChangeToVisuBtn';
import ModelList from '../ModelList';
import QRImage from '../QRImage';
import './ProjectList.css'


export default class ProjectList extends Component {

    props = {
        projectData: [{ projectID: -1, projectName: "null", AIModelID: [-1], }],
        pageSetCurrentprojekt: function (currentProject: { projectID: number; projectName: string; choosenAIModelID: number; }) {},
        pageLoadModel: function(chosenmodelID: number){},
        pageLoadProjekt: function(currentProject: { projectID: number; projectName: string; choosenAIModelID: number; }){},
        pageChangeToVisu: function() {},
        qr: ''
      }

    state = {
        value: null,
        click: false,
        loadclick: false,
        currentProject: { projectID: -1, projectName: "", AIModelID: [] }
    }

    handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            value: e.target.value
        })
    }

    handleChoose() {
        /* wait to change load model*/
        if (this.state.value == null) {
            NotificationManager.error("Sie haben noch kein Projekt gewählt", "", 3000)
        } else {
            // eslint-disable-next-line
            this.props.projectData.map((projectObj) => {
                // eslint-disable-next-line
                if (this.state.value == projectObj.projectID) {
                    // eslint-disable-next-line
                    if (projectObj.AIModelID.length != 0) {
                        for (let index = 0; index < this.props.projectData!.length; index++) {
                            // eslint-disable-next-line
                            if (projectObj.projectID == this.props.projectData![index].projectID) {
                                this.setState({currentProject: this.props.projectData[index]})
                                break;
                            }
                        }
                        
                        this.setState({ click: true })
                    } else {
                        this.setState({ click: false })
                        NotificationManager.error('Es gibt keine Model in diesem Projekt!', "", 3000)
                    }
                }
            })
        }

    }
    handleLoad() {
        if (this.state.value == null) {
            NotificationManager.error("Sie haben noch kein Projekt gewählt", "", 3000)
        } else {
            // eslint-disable-next-line
            this.props.projectData.map((projectObj) => {
                // eslint-disable-next-line
                if (this.state.value == projectObj.projectID) {
                    let id: number = projectObj.projectID
                    this.props.pageLoadProjekt({projectID: id, projectName: projectObj.projectName, choosenAIModelID: -1})
                    this.setState({ loadclick: true })
                }
            })
        }
    }

    render() {
        return (
            <section className='projectlist'>
                <label>ProjektList</label>
                <select onChange={this.handleChange}>
                    <option>Projekt Wählen</option>
                    {this.props.projectData.map((projectObj) => {
                        return <option value={projectObj.projectID}>{projectObj.projectName}</option>
                    })}
                </select>
                <button onClick={() => this.handleChoose()} className="pl-btn" >Modellliste ladent </button>
                <button onClick={() => this.handleLoad()} className="pl-btn" >Projekt laden</button>
                {this.state.loadclick ? <div> <QRImage qr = {this.props.qr} /><ChangeToVisuBtn pageChangeToVisu = {this.props.pageChangeToVisu} /></div> : null}
                {this.state.click ? <div> <ModelList pageLoadModel = {this.props.pageLoadModel} currentProject = {this.state.currentProject}/></div> : null}
            </section>

        )
    }
}
