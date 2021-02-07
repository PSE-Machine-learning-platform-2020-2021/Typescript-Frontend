import React, { Component } from 'react'
import NewWindow from "react-new-window";
import PropTypes from 'prop-types'


export default class AddDatasetButton extends Component {
    //limit props
	static propTypes = {
		addDataset:PropTypes.func.isRequired
	}
	state = {
		openNewWindow: false,
    value: '',
    databaseList :[
      {id:'001', name:'dataset1', chosen: false},
      {id:'002', name:'dataset2', chosen: false},
      {id:'003', name:'dataset3', chosen: false}
    ]
    
  }
  
    handleCreate = ()=> {
      this.setState({openNewWindow:true})
    }
	  handleChange =(e)=> { 
        this.setState({
            value: e.target.value
        })
    }
    handleChoose =()=>{
		    /* wait to change load model*/
		    this.setState({openNewWindow:false})
        if (this.state.value === '') {
            alert('no choice')
        } else {
          const {databaseList} = this.state
          const newDatabaseList1 = databaseList.map ((databaseObj)=>{
            if(databaseObj.name === this.state.value) {
              databaseObj.chosen = true
              const datasetObj = {id:databaseObj.id,name:databaseObj.name,chosen: false}
              this.props.addDataset(datasetObj)
            }
            return databaseObj
          }
          )
          
          const newDatabaseList2 = newDatabaseList1.filter((databaseObj)=>{
            return databaseObj.chosen === false
          })
          //update emailList
          this.setState({databaseList:newDatabaseList2})
          
        }
    }
	
	options = () => {
    const {databaseList} = this.state
    /*way to add new into list
    and wait to get databaseList
    const newdatabase = {id:'003', name:'dataset3', chosen: false}
    databaseList.push(newdatabase)
    */
		return databaseList.map(dataset =>
		  <option key={dataset.id} value={dataset.name}>{dataset.name}</option>);
	  }

	render() {
		return (
			<div className="adddatasetbutton">
            {this.state.openNewWindow && (
              <NewWindow>
                <div className="login-window">
                    <h1>DatabaseList</h1>
                    <select onChange={this.handleChange}>
                        <option value="choose dataset">choose dataset</option>
                        {this.options()}
                	</select>
                	<button onClick={this.handleChoose} className="btn" >Add!</button>
                  
                </div>
              </NewWindow>
            )}
			<button onClick={()=> this.handleCreate()} className="btn" >Add new Dataset</button>
			</div>
		)
	}
}
