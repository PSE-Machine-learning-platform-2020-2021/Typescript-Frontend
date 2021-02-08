import React, { Component } from 'react'

export default class ModelList extends Component {
    state = {
            value: ''
        }
    handleChange =(e: React.ChangeEvent<HTMLSelectElement>)=> { 
        this.setState({
            value: e.target.value
        })
    }
    handleChoose () {
        /* wait to change load model*/
        if (this.state.value === '') {
            alert('no choice')
        } else {
            alert('load' + this.state.value);
        }
    }
    render () {
        return (
            <section>
                <label>ModelList</label>
                <select onChange={this.handleChange}>
                        <option value="choose model">choose model</option>
                        <option value="model1">model1</option>
                        <option value="model2">model2</option>
                        <option value="model3">model3</option>
                        <option value="model4">model4</option>
                </select>
                    
                <button onClick={()=> this.handleChoose()} className="btn" >Model choose</button>
            </section>
        )
    }
}
