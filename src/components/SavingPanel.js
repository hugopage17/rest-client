import React, { Component } from 'react'
import '../stylesheets/dashboard.css'
import {connect} from 'react-redux'
import fire from '../Fire.js'
import Close from '../images/white-delete-icon.png'

class SavingPanel extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  save = () => {
    var request = this.props.request
    const user = fire.auth().currentUser
    var name = document.getElementById('req-name').value
    var desc = document.getElementById('desc-text').value
    const date = Date()
    request['name'] = name
    request['date'] = date
    request['desc'] = desc
    fire.database().ref(user.uid+'/savedRequests/'+name).set({...request})
  }

  render(){
    return(
      <div class='middle-panel-wrapper'>
        <img src={Close} onClick={this.props.close} style={{cursor:'pointer'}} alt='close'/>
        <div class='saving-panel' style={{backgroundColor:'white',padding:40,textAlign:'center',borderRadius:5}}>
          <label>Name</label>
          <input type='text' class='req-name' id='req-name'/><br/>
          <label>Description</label><br/>
          <textarea id='desc-text'/><br/>
          <button onClick={this.save}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user:state.data.user,
  request:state.data.request
})

export default connect(mapStateToProps)(SavingPanel)
