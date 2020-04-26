import React, { Component } from 'react'
import '../stylesheets/dashboard.css'
import FullScreen from '../images/full-screen.png'

class Response extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div>
        <div class='res-top-menu'>
          <label>Response</label>
          <img onClick={this.props.full} src={FullScreen} style={{float:'right',cursor:'pointer'}}/>
          <label style={{float:'right', fontSize:16, marginRight:10}}>{this.props.status}</label>        
        </div>
        <div>
          <textarea class='res-content' value={this.props.res}/>
        </div>
      </div>
    )
  }
}


export default Response
