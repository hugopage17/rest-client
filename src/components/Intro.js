import React, { Component } from 'react'
import '../stylesheets/dashboard.css'

class Intro extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }


  render(){
    const butStyle = {
      backgroundColor: '#363636',
      color:'#00c5db',
      border:'1px solid #00c5db',
      padding:10,
      fontSize:20,
      borderRadius:5,
    }

    return(
      <div class='middle-panel-wrapper'>
        <div class='middle-panel-intro' style={{backgroundColor:'white',padding:10,borderRadius:5,boxShadow:'3px 3px 8px #c4c4c4'}}>
          <h1>Thank You For Signing Up</h1>
          <p>Welcome to Request App</p>
          <button onClick={this.props.close} style={butStyle}>Continue</button>
        </div>
      </div>
    )
  }
}


export default Intro
