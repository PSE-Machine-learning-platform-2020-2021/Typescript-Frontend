import React, { Component } from 'react'
import ChangeToVisuBtn from '../ChangeToVisuBtn';
import ModelList from '../ModelList';
import QRImage from '../QRImage';
import './ProjectList.css'
export default class ProjectList extends Component {
    state = {
        value: null,
        click: false,
        loadclick: false,
        //hier Beispiel, in componentDidMount will projectData verändern
        projectData: [{
            projectID: 1,
            projectName: 'Projekt1',
            AIModelID: [1, 2]
        }, {
            projectID: 2,
            projectName: 'Projekt2',
            AIModelID: []
        }]
    }

    componentDidMount() {
        PubSub.publish("needprojectlist")
        PubSub.unsubscribe('getprojectlist')
        PubSub.subscribe('getprojectlist', (_msg: any, data: { projectID: number, projectName: string, AIModelID: number[]; }[]) => {
            this.setState({ projectData: data })
        })

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
            this.state.projectData.map((projectObj) => {
                // eslint-disable-next-line
                if (this.state.value == projectObj.projectID) {
                    // eslint-disable-next-line
                    if (projectObj.AIModelID.length != 0) {
                        PubSub.publish('needmodellist', projectObj)
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
            this.state.projectData.map((projectObj) => {
                // eslint-disable-next-line
                if (this.state.value == projectObj.projectID) {
                    PubSub.publish('loadproject', projectObj)
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
                    {this.state.projectData.map((projectObj) => {
                        return <option value={projectObj.projectID}>{projectObj.projectName}</option>
                    })}
                </select>
                <button onClick={() => this.handleChoose()} className="pl-btn" >Wählen Modell in diesem Projekt </button>
                <button onClick={() => this.handleLoad()} className="pl-btn" >Laden das Projekt!</button>
                {this.state.loadclick ? <div> <QRImage /><ChangeToVisuBtn /></div> : null}
                {this.state.click ? <div> <ModelList /></div> : null}
            </section>

        )
    }
}
