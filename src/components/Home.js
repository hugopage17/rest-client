import React, { Component } from 'react'
import fire from '../Fire.js'
import firebase from 'firebase'
import '../stylesheets/home.css'
import {GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons"


class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  signupGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
    }).then(()=>{
      const user = fire.auth().currentUser
      var storageRef = fire.storage().ref();
      var fileRef = storageRef.child(user.uid+'-original.png')
      fetch(user.photoURL).then(response => response.blob()).then((image)=>{
        var profilePic = new Blob([image], {type : 'image/png'})
        fileRef.put(profilePic)
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  signupGithub = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    fire.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
    }).then(()=>{
      const user = fire.auth().currentUser
      var storageRef = fire.storage().ref();
      var fileRef = storageRef.child(user.uid+'-original.png')
      fetch(user.photoURL).then(response => response.blob()).then((image)=>{
        var profilePic = new Blob([image], {type : 'image/png'})
        fileRef.put(profilePic)
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
    return(
      <div>
        <div class='home-nav'>
          <a>Home</a>
          <a>News</a>
          <a>Contact</a>
        </div>
        <div class='social-logins'>
          <GoogleLoginButton onClick={this.signupGoogle} style={{marginBottom:20}}/>
          <GithubLoginButton onClick={this.signupGithub} style={{marginBottom:20}}/>
        </div>
      </div>
    )
  }
}


export default Home
