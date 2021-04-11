import React from 'react';
import { MainController } from '../../../../controller/MainController';
import './ConstantsText.css';

/**
 * Überschrift
 */
export default class ConstantsText extends React.Component {

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
