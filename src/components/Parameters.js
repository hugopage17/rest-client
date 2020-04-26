import React, { Component } from 'react'
import Headers from './Headers.js'
import Body from './Body.js'
import '../stylesheets/dashboard.css'

class Parameters extends Component{
  constructor(props) {
    super(props)
    this.state = {
      headers:true,
      body:false,
    }
  }


  render(){
    const toggleH = () => {
      this.setState({headers:true})
      this.setState({body:false})
    }
    const toggleB = () => {
      this.setState({headers:false})
      this.setState({body:true})
    }
    return(
      <div class='para-wrapper'>
        <div class='para-top-menu'>
          <ul>
            <li onClick={toggleH}>Headers</li>
            <li onClick={toggleB}>Body</li>
            <li>Scripts</li>
          </ul>
        </div>
        <div class='mid-sec'>
          {this.state.headers ? (<Headers/>):(null)}
          {this.state.body ? (<Body/>):(null)}
        </div>
      </div>
    )
  }
}


export default Parameters
