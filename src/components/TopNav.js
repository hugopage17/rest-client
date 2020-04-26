import React, { Component } from 'react'
import '../App.css'
import {connect} from 'react-redux'
import fire from '../Fire.js'

class TopNav extends Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    const user = fire.auth().currentUser
    var storageRef = fire.storage().ref();
    storageRef.child(user.uid+'-original_300x300.png').getDownloadURL().then((url)=>{
      user.updateProfile({photoURL: url})
    })
  }

  render(){
    const user = fire.auth().currentUser
    return(
      <div class='navbar'>
        <div style={{float:'right', marginRight:60, display:'flex', alignItems:'center', cursor:'pointer'}} class='dropdown'>
          <img src={user.photoURL} class='profile-pic' style={{marginRight:10}}/>
          <label>{user.displayName}  <i class="arrow down"></i></label>
          <div class="dropdown-content">
            <p>Settings</p>
            <p onClick={()=>{fire.auth().signOut()}}>Logout</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user:state.data.user
})


export default connect(mapStateToProps)(TopNav)
