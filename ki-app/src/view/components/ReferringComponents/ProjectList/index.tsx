import React, { Component } from 'react'
import ModelList from '../ModelList';

export default class ProjectList extends Component {
    state = {
        value: null,
        click: false,
        //hier Beispiel in componentDidMount will projectData 
        projectData: [{
            projectID: 1,
            projectName: 'project1',
            AIModelExist: true
        }, {
            projectID: 2,
            projectName: 'project2',
            AIModelExist: false

        }]
    }

    componentDidMount() {
        /** controller noch nicht gegeben
        PubSub.subscribe('getprojectlist', (_msg: any, data: { projectID: number, projectName: string, AIModelExist: boolean; }[]) => {
            this.setState({ projectData: data })
        })
         */
    }

    handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            value: e.target.value
        })
    }
    handleChoose() {
        /* wait to change load model*/
        if (this.state.value == null) {
            alert('no choice')
        } else {
            this.state.projectData.map((projectObj) => {
                if (this.state.value == projectObj.projectID) {
                    if (projectObj.AIModelExist) {
                        PubSub.publish('loadproject', projectObj)
                        this.setState({ click: true })
                    } else {
                        this.setState({ click: false })
                        alert('Es gibt keine Model in diesem Projekt!')
                    }
                }
            })
        }

    }
    render() {
        return (
            <section>
                <label>ProjectList</label>
                <select onChange={this.handleChange}>
                    <option>choose project</option>
                    {this.state.projectData.map((projectObj) => {
                        return <option value={projectObj.projectID}>{projectObj.projectName}</option>
                    })}
                </select>
                <button onClick={() => this.handleChoose()} className="btn" >Projekt Wählen</button>
                {this.state.click ? <div> <ModelList /></div> : null}
            </section>

        )
    }
}
