import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications'

export default class ModelList extends Component {

    props = {
        currentProject: { projectID: -1, projectName: "null", AIModelID: [-1] },
        pageLoadModel: function (chosenmodelID: number) { }
    }

    state = {
        chosenmodelID: -1
    }

    handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            chosenmodelID: e.target.value
        })
    }

    handleChoose() {
        /* wait to change load model*/
        if (this.state.chosenmodelID == -1) {
            NotificationManager.error('Sie haben noch kein Modell gewählt!', "", 3000)
        } else {
            this.props.pageLoadModel(this.state.chosenmodelID)
        }
    }

    render() {
        return (
            <section>
                <label>ModellList</label>
                <select onChange={this.handleChange}>
                    <option>Modell Wählen</option>
                    {this.props.currentProject.AIModelID.map((modelObj) => {
                        return <option value={modelObj} key={modelObj} >Modell{modelObj}</option>
                    })}
                </select>
                <button onClick={() => this.handleChoose()} className="btn" >Laden das gewählte Modell(zu Auslieferungsseite)</button>
            </section>
        )
    }
}
