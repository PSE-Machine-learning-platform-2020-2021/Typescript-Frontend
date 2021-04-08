import { Component } from 'react';
import title from './index.module.css';

export default class Title extends Component {


    /**
     * Enthält den Titel "Datenerfassungsanwendung"
     */
    render() {
        return (
            <div>
                <h1 className={title.title}>Datenerfassungsanwendung</h1>
            </div>
        );
    }
}
