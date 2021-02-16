import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import './ImageList.css'
export default class ImageList extends Component {
    state = {
        imageList: [
            'http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuU9opaaiBZOmL50oL5BGqjLLKCfDpAjKKe086obOAIJdvvKaPkOLmvGQA-G3bK7O9a3vnFJqejJqn9BC_3oO4bC5NLqxi8aGlXaNbqDgNWh8FW00',
            'http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKhEIImkLd1EBEBYSYdAB4ijKj05yHIi5590t685EouGLqjN8JmZDJK7A9wHM9QgO08LrzLL24WjAixF0qhOAEINvnLpSJcavgM0Z0O0',
            'http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuV9FoafDBb6mgT7LLN0iAagizCaiBk622Liff1QM9kOKQsXomIM1WX3Pw5Y5r9pKtDIy4fV4aaGK1SMPLQb0FLmEgNaf85i0',
            'http://www.plantuml.com/plantuml/svg/BOqx3W8n34Jxd69Ak0BL5Yia6XguWC4c6odE8iT1GeYxawpePlJcCrKdywOvt3FLYhcfll49mCKjbGWcf-vUQsAe-B9otUt3D_ppnvpYubi1ZqsVczx4SC2fk4InGLYUuyNacbGwcicbRqnIU5p_0000',
        ]
    }
    handleClick = (index: number) => {
        const newList = this.state.imageList
        PubSub.publish('changeimg', newList[index])
    }
    componentWillUpdate() {
        PubSub.subscribe('getimagelist', (_msg: any, data: string[]) => {
            this.setState({ imageList: data })
            //console.log(this.state.img)
        })
    }

    render() {
        const { imageList } = this.state
        return (
            <div>
                {imageList.map((image, index) => {
                    return (
                        <div key={index}>
                            <img src={image} onClick={() => this.handleClick(index)} alt="1" className="imagelist" />
                        </div>
                    )
                })
                }
            </div>
        )
    }
}
