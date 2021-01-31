import React, { Component } from 'react'
import ConstantsText from '../../components/ReferringComponents/ConstantsText'

import NewProjectButton from '../../components/ReferringComponents/NewProjectButton'

export default class ReferringPage extends Component {
    render() {
        return (
            <div>
                <ConstantsText/>
                <NewProjectButton/>
            </div>
        )
    }
}
