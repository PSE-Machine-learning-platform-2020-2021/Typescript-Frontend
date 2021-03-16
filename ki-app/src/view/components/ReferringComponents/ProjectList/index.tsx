import React, { Component } from 'react'
import ChangeToVisuBtn from '../ChangeToVisuBtn';
import ModelList from '../ModelList';
import QRImage from '../QRImage';
import './ProjectList.css'


export default class ProjectList extends Component {

    props = {
        projectData: [{ projectID: -1, projectName: "null", AIModelID: [-1], }],
        pageSetCurrentprojekt: function (currentProject: { projectID: number; projectName: string; choosenAIModelID: number; }) {},
        pageLoadModel: function(chosenmodelID: number){}
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
            alert('Sie haben noch kein Projekt gewählt!')
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
                        alert('Es gibt keine Model in diesem Projekt!')
                    }
                }
            })
        }

    }
    handleLoad() {
        if (this.state.value == null) {
            alert('Sie haben noch kein Projekt gewählt!')
        } else {
            // eslint-disable-next-line
            this.props.projectData.map((projectObj) => {
                // eslint-disable-next-line
                if (this.state.value == projectObj.projectID) {
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
                <button onClick={() => this.handleChoose()} className="pl-btn" >Wählen Modell in diesem Projekt </button>
                <button onClick={() => this.handleLoad()} className="pl-btn" >Laden das Projekt!</button>
                {this.state.loadclick ? <div> <QRImage /><ChangeToVisuBtn /></div> : null}
                {this.state.click ? <div> <ModelList pageLoadModel = {this.props.pageLoadModel} currentProject = {this.state.currentProject}/></div> : null}
            </section>

        )
    }
}
