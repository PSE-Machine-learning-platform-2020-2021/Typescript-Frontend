import React, { Component } from 'react'
import { Imputation } from '../../../../model/Imputation'

export default class FeatureList extends Component {
    state = {
        features: [
            { name: "Minimum", checked: false },
            { name: "Maximum", checked: false },
            { name: "Varianz", checked: false },
            { name: "Energie", checked: false },
            { name: "Fourier-T", checked: false },
            { name: "Mittelwert", checked: false },
            { name: "Autoregressiv", checked: false },
            { name: "Abweichung", checked: false },
            { name: "Wölbung", checked: false },
            { name: "IQR", checked: false }
        ]
    }
    handleCheck = (index: number) => {
        var newList = [...this.state.features]
        newList[index].checked = !newList[index].checked
        this.setState({ features: newList })
    }

    render() {
        const { features } = this.state
        return (
            <div className="featurelist">
                <h3>Feature</h3>
                {features.map((feature, index) => {
                    return (
                        <div key={index}>
                            <input type="checkbox" value={index} checked={feature.checked} onChange={() => this.handleCheck(index)} /><span>{feature.name}</span>
                        </div>
                    )
                })
                }
            </div>
        );
    }
}
