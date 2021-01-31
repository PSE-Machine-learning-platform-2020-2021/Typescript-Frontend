import React, { Component } from 'react'
import ModelList from '../ModelList';

export default class ProjectList extends Component {
    state = {
            project: '',
            click : false
        }
    handleChange (e) { 
        this.setState({
            project: e.target.value
        })
    }
    handleChoose () {
        /* wait to change load model*/
        console.log(this.state.project)
        this.setState({click:true})
    }
    render () {
        return (
            <section>
                    <label>ProjectList</label>
                    <select onChange={this.handleChange.bind(this)}>
                        <option value="choose project">choose project</option>
                        <option value="project1">project1</option>
                        <option value="project2">project2</option>
                        <option value="project3">project3</option>
                        <option value="project4">project4</option>
                    </select>
                    <button onClick={()=> this.handleChoose()} className="btn" >Project choose</button>
                {this.state.click?<div> <ModelList/></div>:null}
            </section>
        )
    }
}
