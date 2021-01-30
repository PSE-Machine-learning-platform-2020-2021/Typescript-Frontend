import React, { Component } from 'react'
import Title from '../../components/DataCollectionComponents/Title'
import Countdown from '../../components/DataCollectionComponents/Countdown'

export default class DataCollectionPage extends Component {
    render() {
        return (
            <div>
                <Title/>
                <Countdown/>
            </div>
        )
    }
}
