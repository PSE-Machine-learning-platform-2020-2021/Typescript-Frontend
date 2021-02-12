import React, { Component } from 'react'
import eximage1 from '../../../images/exImage1.svg'
import eximage2 from '../../../images/exImage2.svg'
import eximage3 from '../../../images/exImage3.svg'
import eximage4 from '../../../images/exImage4.svg'
import './ImageList.css'
export default class ImageList extends Component {
    state = {
        imageList: [
            { imagesrc: eximage1, checked: false },
            { imagesrc: eximage2, checked: false },
            { imagesrc: eximage3, checked: false },
            { imagesrc: eximage4, checked: false }
        ]
    }
    handleClick = (index) => {
        var newList = [...this.state.imageList]
        newList[index].checked = true
        this.setState({ imageList: newList })
        this.state.imageList.map((image) => {
            if (image.checked) this.props.setImageSrc(image.imagesrc)
            return (
                image.checked = false
            )
        })
    }
    render() {
        const { imageList } = this.state
        return (
            <div>
                {imageList.map((image, index) => {
                    return (
                        <div key={index}>
                            <img src={image.imagesrc} onClick={() => this.handleClick(index)} alt="1" className="imagelist" />
                        </div>
                    )
                })
                }
            </div>
        )
    }
}
