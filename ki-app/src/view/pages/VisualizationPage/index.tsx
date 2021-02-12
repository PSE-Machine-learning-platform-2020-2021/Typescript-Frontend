import React, { Component } from 'react'
import TrainButton from '../../components/ModelCreationComponents/TrainButton'
import ImageList from '../../components/VisualizationComponents/ImageList'
import eximage1 from '../../images/exImage1.svg'
import './VisualizationPage.css'
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { MainController } from '../../../controller/MainController';
import ReactDOM from 'react-dom';

type Props = {
};

export class VisualizationPage extends React.Component<Props, State> implements Page {
    state = new State()

    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);
        const VDOM = (
            <div className="visualizationpage">
                <img src={this.state.imageSrc} alt="2" className="showImage" ></img>
                <ImageList setImageSrc={this.setImageSrc} />
                <TrainButton />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
    }


    attach(observer: PageController) {
        this.observers.push(observer);
    }

    detach(observer: PageController) {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify() {
        for (let index = 0; index < this.observers.length; index++) {
            const element = this.observers[index];
            element.update();
        }
    }

    getState() {
        return this.state;
    }


    setImageSrc = (newSrc: string) => {
        const newState = { imageSrc: newSrc }
        this.setState({ imageSrc: newSrc })
    }

}
