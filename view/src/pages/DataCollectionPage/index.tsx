import React, { Component } from 'react'
import Title from '../../components/DataCollectionComponents/Title'
import Countdown from '../../components/DataCollectionComponents/Countdown'

export default class DataCollectionPage extends Component {
        state = {needDiagram:false, instantDiagram:new Image()}
    render() {
        return (
            <div>
                <Title/>
                <Countdown/>
            </div>
        )
    }
}
