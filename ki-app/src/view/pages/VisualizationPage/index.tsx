import React, { Component } from 'react'
import TrainButton from '../../components/ModelCreationComponents/TrainButton'
import ImageList from '../../components/VisualizationComponents/ImageList'
import eximage1 from '../../images/exImage1.svg'
import './VisualizationPage.css'
export default class VisualizationPage extends Component {
    state = {
        imageSrc: eximage1
    }

    setImageSrc = (newSrc: string) => {
        const newState = { imageSrc: newSrc }
        this.setState(newState)
    }
    render() {
        return (
            <div className="visualizationpage">
                <img src={this.state.imageSrc} alt="2" className="showImage" ></img>
                <ImageList setImageSrc={this.setImageSrc} />
                <TrainButton />
            </div>
        )
    }
}
