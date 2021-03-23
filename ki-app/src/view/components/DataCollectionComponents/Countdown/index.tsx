import { Component } from 'react';
import { NotificationManager } from 'react-notifications';

export default class Countdown extends Component {

    props = {
        countdownNumber: 5, chosenSensors: [1]
    }

    render() {
        let countdown
        if (this.props.countdownNumber > 0) {
            countdown = this.props.countdownNumber
        } else if (this.props.countdownNumber != 0) {
            countdown = " "
        } else {
            countdown = "Aufnahme gestartet"
        }
        
        let sensornames: string[] = []
        for (let sensor in this.props.chosenSensors) {
            switch(sensor){
                case "0":
                    sensornames.push("Accelerometer")
                    break;
                case "1":
                    sensornames.push("Gyroscope")
                    break;
            }
        }

        return (
            <div>
                <h2>Bereit machen zur Aufnahme!</h2>
                <h2>{ countdown }</h2>
                <h2>Verwendete Sensoren:</h2>
                {
                   sensornames.map((x) => {
                        return <h4>{x}</h4>;
                    })
                }
            </div>
        );
    }

}




