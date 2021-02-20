import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import ImageList from '../../components/VisualizationComponents/ImageList'
import eximage1 from '../../images/exImage1.svg'
import './VisualizationPage.css'
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import { MainController } from '../../../controller/MainController';
import ReactDOM from 'react-dom';
import ShowImage from '../../components/VisualizationComponents/ShowImage';
import { States } from '../State';
import FinishButton from '../../components/VisualizationComponents/FinishButton';

type Props = {
};

export class VisualizationPage extends React.Component<Props, State> implements Page {
    state = new State()
    observers: PageController[] = [];
    constructor(props: Props) {
        super(props);

        const VDOM = (
            <div className="visualizationpage">
                <ShowImage />
                <ImageList />
                <FinishButton />
            </div>
        );
        ReactDOM.render(VDOM, document.getElementById('root'));
        this.getimagelist()
        this.changeimg()
        this.changetonextpage()
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

    getimagelist() {
        this.state.currentState = States.NeedImageList
        this.notify()
        PubSub.publish('getimagelist', this.state.imageList)
    }
    changeimg() {
        PubSub.subscribe('changeimg', (_msg: any, data: string) => {
            this.state.currentImg = data
            //console.log(this.state.currentImg)
        })
    }
    changetonextpage() {
        PubSub.subscribe('changepage', (_msg: any) => {
            this.state.currentState = States.ChangeToCreation
            this.notify()

        })
    }
}
