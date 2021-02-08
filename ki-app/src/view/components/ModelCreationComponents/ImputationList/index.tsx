import React, { Component } from 'react'

export default class ImputationList extends Component {
  state = {
    imputations: [
      { name: "Mittel", checked: false },
      { name: "Letzer Wert fortgeführt", checked: false },
      { name: "Bewegter Durchschnitt", checked: false },
      { name: "Lineare Interpolation", checked: false },
      { name: "Spline Interpolation", checked: false }
    ]
  }
  handleCheck = (index: number) => {
    var newList = [...this.state.imputations]
    newList[index].checked = !newList[index].checked
    this.setState({ imputations: newList })
  }

  render() {
    const { imputations } = this.state
    return (
      <div className="imputationlist">
        <h3>Imputation</h3>
        {imputations.map((imputation, index) => {
          return (
            <div key={index}>
              <input type="checkbox" value={index} checked={imputation.checked} onChange={() => this.handleCheck(index)} /><span>{imputation.name}</span>
            </div>
          )
        })
        }
      </div>
    );
  }
}
