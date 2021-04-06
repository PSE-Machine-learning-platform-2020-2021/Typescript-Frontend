import React from 'react';
import { MainController } from '../../../../controller/MainController';
import './ConstantsText.css';

export default class ConstantsText extends React.Component {
    render () {
        console.log( MainController.getInstance().getText()!.title );
        return (
            <h1 className='title'>{ MainController.getInstance().getText().title }</h1>
        );
    }
}
