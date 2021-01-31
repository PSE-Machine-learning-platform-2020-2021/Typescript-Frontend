import React, { Component } from 'react'
import Title from '../../components/FinishComponents/Title'
import Body from '../../components/FinishComponents/Body'
import Input from '../../components/FinishComponents/Input'

export default class FinishPage extends Component {
    state = {needDiagram:true, gotDiagram:new Image()}
    render() {
        return (
            <div>
                <Title/>
                <Body/>
                <Input/>
            </div>
        )
    }
}
