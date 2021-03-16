import { Method } from '@testing-library/dom'
import React, { Component } from 'react'
import './ConstantsText.css'

interface Props {
}

export default class ConstantsText extends  React.Component<Props, {}> {
    render() {
        return (
            <h1 className='title'>Explorer </h1>
        )
    }
}
