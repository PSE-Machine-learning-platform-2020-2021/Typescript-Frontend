import { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Countdown extends Component {
    state = { countdownNumber: 5, startCounting: false, chosenSensors: [] };

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

        PubSub.unsubscribe('usedsensors');
        PubSub.subscribe('usedsensors', (_msg: any, sensorTypes: number[]) => {
            console.log(sensorTypes)
            let sensors: string[] = []
            for (let index = 0; index < sensorTypes.length; index++) {
                switch (sensorTypes[index]) {
                    case 2:
                        sensors.push('Accelerometer')
                        break;
                    case 3:
                        sensors.push('Gyroscope')
                        break;
                    case 4:
                        sensors.push('Magnetometer')
                        break;
                    default:
                        break;
                }
            }
            console.log(sensorTypes)
            this.setState({ chosenSensors: sensors });
        }
        );
    }

    render() {
        return (
            <div>
                <h2>Bereit machen zur Aufnahme!</h2>
                <h2>{this.state.startCounting ? this.state.countdownNumber : ""}</h2>
                <h2>Verwendete Sensoren:</h2>
                {
                    this.state.chosenSensors.map((sensor) => {
                        return <h2>{sensor}</h2>
                    })
                }
            </div>
        );
    }

}




