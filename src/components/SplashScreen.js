import React, { Component } from 'react'
import '../stylesheets/dashboard.css'
import FullScreen from '../images/full-screen.png'
import '../stylesheets/loader.css'

class SplashScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div style={{textAlign:'center'}}>
        <div class="loader"></div>
        <label style={{color:'#00c5db'}}>Please wait...</label>
      </div>
    )
  }
}


export default SplashScreen
