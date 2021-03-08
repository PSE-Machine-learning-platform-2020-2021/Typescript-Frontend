import { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Countdown extends Component {
    state = { countdownNumber: 5, startCounting: false, chosenSensors: "" };

    componentDidMount() {
        PubSub.unsubscribe('startCounting');
        PubSub.subscribe('startCounting', (_msg: any, leadTime: number) => {
            this.setState({ countdownNumber: leadTime, startCounting: true });
        }
        );
        PubSub.unsubscribe('nextCount');
        PubSub.subscribe('nextCount', (_msg: any, waitTime: number) => {
            this.setState({ countdownNumber: waitTime, startCounting: true });
        }
        );
    }

    render() {
        return (
            <div>
                <h2>Bereit machen zur Aufnahme!</h2>
                <h2>{this.state.startCounting ? this.state.countdownNumber : ""}</h2>
                <h2>Verwendete Sensoren:<br />{this.state.chosenSensors}</h2>
            </div>
        );
    }

}




