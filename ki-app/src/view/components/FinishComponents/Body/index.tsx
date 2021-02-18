import { Component } from 'react';
import PubSub from 'pubsub-js';
import body from './index.module.css';

export default class Body extends Component {
    state = { diagramSvg: "" };

    componentDidMount() {
        PubSub.subscribe('giveDiagram', (diagramSvg: string) => {
            this.setState({ diagramSvg: diagramSvg });
        }
        );
    }

    render() {
        return (
            <div>
                <h2 className={body.title}>Fertig!</h2>
                <img src={this.state.diagramSvg} alt="diagram" />
            </div>
        );
    }
}
