import React from 'react';
import { MainController } from '../../../../controller/MainController';
import './ConstantsText.css';

/**
 * Überschrift
 */
export default class ConstantsText extends React.Component {
    /** 
    //nur für test button auch
    props = {
        changeToDelivery: function () { },

    };
    handleCreate() {
        this.props.changeToDelivery()
    }

    <button onClick={() => this.handleCreate()} type='button'>Für test DeliveryPage</button>
*/
    /**
     * Render Methode des Komponenten
     * @returns Aufbau des Komponenten
     */
    render() {
        console.log(MainController.getInstance().getText()!.title);
        return (
            <div>
                <h1 className='explorerTitle'>{MainController.getInstance().getText().title}</h1>
            </div>
        );
    }

}
