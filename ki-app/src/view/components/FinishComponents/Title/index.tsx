import { Component } from 'react';
import title from './index.module.css';

export default class Title extends Component {
    private static readonly T_TITLE_DE: string = "Datenerfassung";

    /**
     * Enthält den Titel "Datenerfassungsanwendung"
     */
    render() {
        return (
            <div>
                <h1 className={title.title}>{Title.T_TITLE_DE}</h1>
            </div>
        );
    }
}