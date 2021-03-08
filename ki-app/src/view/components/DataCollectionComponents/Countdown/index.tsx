import { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Countdown extends Component {
    state = { countdownNumber: 5, startCounting: false, chosenSensors: "" };

    componentDidMount() {
        PubSub.subscribe('startCounting', (_msg: any, leadTime: number) => {
            this.setState({ countdownNumber: leadTime, startCounting: true });
        }
        );

        setInterval(() => {
            this.updateCounting();
        }, 1000);
    }

    updateCounting() {
        this.setState({ countdownNumber: this.state.countdownNumber - 1 });
        if (this.state.countdownNumber == 0) {
            this.setState({ startCounting: false });
        }
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




