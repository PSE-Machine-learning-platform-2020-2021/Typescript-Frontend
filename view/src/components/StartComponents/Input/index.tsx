import React, { Component } from 'react'
import input from './index.module.css'
import startlogo from './startlogo.jpg'

export default class Input extends Component {
    render() {
        return (
            <div className="input" >
                <form>
                    Aufnahmeparameter einstellen<br/>
					Vorlaufzeit: <input type="leadtime" name="leadtime"/>s<br/>
					Aufnahmedauer: <input type="leadtime" name="collectiontime"/>s<br/>
                    Sensoren...
                    <label>
                        <select>
                             <option value="bs">Beschleunigungssensor</option>
                             <option value="rs">Rotationssensor</option>
                             <option value="mk">Mikrofon</option>
                             <option value="ns">Neigungssensor</option>
                        </select>
                    </label>
                    <br/>
					<img src={startlogo} alt="" style={{width:'auto'}} />
				</form>
            </div>
        )  
    }
}
