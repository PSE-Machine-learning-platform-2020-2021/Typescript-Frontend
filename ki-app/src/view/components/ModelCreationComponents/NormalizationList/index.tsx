import React, { Component } from 'react'

export default class NormalizationList extends Component {
    state = {
        normalizations: [
            { name: "Standard Scaler", checked: false },
            { name: "Robust Scaler", checked: false },
            { name: "Min-Max Scaler", checked: false },
            { name: "Normalizer", checked: false },
            { name: "Anteilstrafo", checked: false }
        ]
    }
    handleCheck = (index: number) => {
        var newList = [...this.state.normalizations]
        newList[index].checked = !newList[index].checked
        this.setState({ normalizations: newList })
    }

    render() {
        const { normalizations } = this.state
        return (
            <div className="normalizationlist">
                <h3>Normalization</h3>
                {normalizations.map((normalization, index) => {
                    return (
                        <div key={index}>
                            <input type="checkbox" value={index} checked={normalization.checked} onChange={() => this.handleCheck(index)} /><span>{normalization.name}</span>
                        </div>
                    )
                })
                }
            </div>
        );
    }
}
