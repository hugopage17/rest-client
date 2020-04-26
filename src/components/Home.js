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
    let profileURL
    var provider = new firebase.auth.GoogleAuthProvider();
    var exists = false
    fire.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
    }).then(()=>{
      const user = fire.auth().currentUser
      var storageRef = fire.storage().ref();
      var fileRef = storageRef.child(user.uid+'-original.png')
      fetch(user.photoURL).then(response => response.blob()).then((image)=>{
        var profilePic = new Blob([image], {type : 'image/png'})
        var uploadTask = fileRef.put(profilePic)
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    })
  }

  signupGithub = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    var exists = false
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).then(()=>{
      const user = fire.auth().currentUser
      var storageRef = fire.storage().ref();
      var fileRef = storageRef.child(user.uid+'-original.png')
      fetch(user.photoURL).then(response => response.blob()).then((image)=>{
        var profilePic = new Blob([image], {type : 'image/png'})
        var uploadTask = fileRef.put(profilePic)
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
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
