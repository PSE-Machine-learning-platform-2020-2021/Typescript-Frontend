import React, { Component } from 'react'

export default class ShowImage extends Component {
    state = {
        img: 'http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuU9opaaiBZOmL50oL5BGqjLLKCfDpAjKKe086obOAIJdvvKaPkOLmvGQA-G3bK7O9a3vnFJqejJqn9BC_3oO4bC5NLqxi8aGlXaNbqDgNWh8FW00'
    }
    getImgSrc() {
        PubSub.subscribe('changeimg', (_msg: any, data: string) => {
            this.setState({ img: data })
            //console.log(this.state.img)
        })
    }
    render() {
        return (
            <div>
                {this.getImgSrc()}
                <img src={this.state.img} alt="2" className="showImage" ></img>
            </div>
        )
    }
}
