import { Component } from 'react';
import title from './index.module.css';

export default class Title extends Component {


    /**
     * Include the title "Datenerfassungsanwendung" and the warning 
     * when the user tries visiting another page of this app.
     */
    render() {
        return (
            <div>
                <h1 className={title.title}>Datenerfassungsanwendung</h1>
            </div>
        );
    }
}
