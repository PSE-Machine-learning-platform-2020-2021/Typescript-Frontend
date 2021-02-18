import React, { Component } from 'react'

export default class ModelList extends Component {
    state = {
        value: null,
        modelList: [1, 2],
        currentProject: {
            projectID: 1,
            projectName: 'project1',
            chosenmodelID: 0
        }
    }

    componentDidMount() {
        /** controller noch nicht gegeben
        PubSub.subscribe('getmodellist', (_msg: any, data: { projectID: number, projectName: string, AIModelID: number[]; }) => {
            this.setState({ modelList: data.AIModelID })
            this.setState({ currentProject: { projectID: data.projectID, projectName: data.projectName } })
        })*/

    }
    handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            value: e.target.value,
            currentProject: { chosenmodelID: e.target.value }
        })

    }
    handleChoose() {
        /* wait to change load model*/
        if (this.state.value == null) {
            alert('Sie haben noch kein Modell gewählt!')
        } else {
            const num = this.state.currentProject.chosenmodelID
            alert('Laden Modell' + num)
            PubSub.publish('loadmodel', this.state.currentProject)
        }
    }
    render() {
        return (
            <section>
                <label>ModellList</label>
                <select onChange={this.handleChange}>
                    <option>Modell Wählen</option>
                    {this.state.modelList.map((modelObj) => {
                        return <option value={modelObj}>Modell{modelObj}</option>
                    })}
                </select>
                <button onClick={() => this.handleChoose()} className="btn" >Laden das gewählte Modell(zu Auslieferungsseite)</button>
            </section>
        )
    }
}
