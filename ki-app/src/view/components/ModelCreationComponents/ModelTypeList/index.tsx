import React, { Component } from 'react'

export default class ModelTypeList extends Component {
    state = {
        modeltypes: [
            { name: "MLPClassifier", checked: false },
            { name: "RandomForestClassifier", checked: false },
            { name: "KNeighborsClassifier", checked: false },
            { name: "Support Vector Machine", checked: false }
        ]
    }
    handleCheck = (index: number) => {
        var newList = [...this.state.modeltypes]
        newList[index].checked = !newList[index].checked
        this.setState({ modeltypes: newList })
    }

    render() {
        const { modeltypes } = this.state
        return (
            <div className="modeltypelist">
                <h3>ModelType</h3>
                {modeltypes.map((modeltype, index) => {
                    return (
                        <div key={index}>
                            <input type="checkbox" value={index} checked={modeltype.checked} onChange={() => this.handleCheck(index)} /><span>{modeltype.name}</span>
                        </div>
                    )
                })
                }
            </div>
        );
    }
}
