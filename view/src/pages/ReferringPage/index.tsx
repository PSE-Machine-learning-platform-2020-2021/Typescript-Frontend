import React, { Component } from 'react'
import ConstantsText from '../../components/ReferringComponents/ConstantsText'
import NewProjectButton from '../../components/ReferringComponents/NewProjectButton'
import LoginButton from '../../components/ReferringComponents/LoginButton'

export default class ReferringPage extends Component {
    render() {
        return (
            <div>
                <ConstantsText/>
                <NewProjectButton/>
                <LoginButton/>
            </div>
        )
    }
}
