import { Component } from 'react';
import title from './index.module.css';

export default class Title extends Component {

    /**
     * Give a Warning when the user tries closing or refreshing the page.
     */
    componentDidMount() {
        window.onbeforeunload = function (e: any) {
            e = e || window.event;
            if (e) {
                e.returnValue = ''; //the broser will show the message automatically based on user's setting
            }
            return ''; //the broser will show the message automatically based on user's setting
        };
    }
    componentWillUnmount() {
        window.onbeforeunload = null;
    }
}