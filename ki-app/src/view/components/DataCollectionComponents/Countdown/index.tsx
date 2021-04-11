import { Component } from 'react';
//import { NotificationManager } from 'react-notifications';

export default class Countdown extends Component {
    
    /**
     * die Vorlaufzeit und die gewählte Sensoren, durch props übermittelt
     */
    props = {
        countdownNumber: 5, chosenSensors: [1]
    };

    render() {
        /**
         * unterscheidet, ob die Erfassung schon begonnen hat.
         */
        let countdown;
        if (this.props.countdownNumber > 0) {
            countdown = this.props.countdownNumber;
        } else {
            countdown = "Aufnahme läuft!";
        }

        /**
         * unterscheidet, welche Sensoren gewählt wurden
         */
        let sensornames: string[] = [];
        for (let sensor in this.props.chosenSensors) {
            switch (sensor) {
                case "0":
                    sensornames.push("Beschleunigungssensor");
                    break;
                case "1":
                    sensornames.push("Gyroskop");
                    break;
            }
        }

        /**
         * Rendert die Countdown-Komponente
         */
        return (
            <div>
                <h2>Bereit machen zur Aufnahme!</h2>
                <h2>{countdown}</h2>
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




