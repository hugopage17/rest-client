import React, { Component } from 'react'
import Parameters from './Parameters.js'
import Response from './Response.js'
import ExpandedResponse from './ExpandedResponse.js'
import '../stylesheets/dashboard.css'
import Send from '../images/send-icon.png'
import Save from '../images/save.png'
import fire from '../Fire.js'
import {connect} from 'react-redux'
import {saveRequest} from '../actions/dataActions.js'
import SavingPanel from  './SavingPanel.js'
import Intro from  './Intro.js'
import Swal from 'sweetalert2'

class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      status:'',
      res:'',
      fullScreen:false,
      savingPanel:false,
      intro:false
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      const user = fire.auth().currentUser
      const id = user.uid
      try{
        fire.database().ref(id+'/intro').on('value', (snap) => {
          const intro = snap.val()
          this.setState({intro})
        })
      }
      catch(err){}
    }, 50)
  }

  runRequest = () => {
    const url = document.getElementById('url-placer').value
    const method = document.getElementById('request-type').value
    let statusCode
    let statusText
    const user = this.props.user
    const date = Date()
    const headersData = this.props.headers
    var headers = {}
    headersData.map((head)=>{
      const name = head.name
      const value = head.value
      headers[name] = value
      return head
    })
    fetch(url, {
      method:method,
      headers: headers
    })
      .then((response) => {
        this.setState({status:'Status: '+response.status+' '+response.statusText})
        statusCode = response.status
        statusText = response.statusText
        return response.text()
      })
      .then((res) => {
        res = JSON.stringify(JSON.parse(res),null,2);
        this.setState({res})
      }).then(()=>{
        let uniqueKey = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
         for ( var i = 0; i < 7; i++ ) {
            uniqueKey += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
        fire.database().ref(user.uid+'/history/'+uniqueKey).set({
          method:method.toUpperCase(),
          url:url,
          status:statusCode,
          res:statusText,
          id:uniqueKey,
          date:date,
          headers:headers
        })
      }).catch((err)=>{
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: err.toString()
        })
      })
  }

  newRequest = () => {
    this.setState({savingPanel:!this.state.savingPanel})
    const url = document.getElementById('url-placer').value
    let method = document.getElementById('request-type').value
    method = method.toUpperCase()
    const body = this.props.body
    const headersData = this.props.headers
    var headers = {}
    headersData.map((head)=>{
      const name = head.name
      const value = head.value
      headers[name] = value
    })
    var requestObject = {
      url:url,
      method:method,
      body:body,
      headers:headers
    }
    this.props.saveRequest(requestObject)
  }

  closeIntro = () => {
    const user = fire.auth().currentUser
    fire.database().ref().child(user.uid).update({intro:false})
  }

  render(){
    const toggleFull = ()=> {this.setState({fullScreen:!this.state.fullScreen})}
    return(
      <div class='dash-wrapper'>
        <div class='request-setter'>
          <select class='request-type' id='request-type'>
            <option value='get'>Get</option>
            <option value='post'>Post</option>
            <option value='patch'>Patch</option>
            <option value='delete'>Delete</option>
          </select>
          <input type='text' class='url-placer' id='url-placer'/>
          <button onClick={this.runRequest}><img src={Send} style={{width:'70%'}}/></button>
          <button style={{borderRadius:5, marginLeft:10}} onClick={this.newRequest}><img src={Save} style={{width:'70%'}}/></button>
        </div>
        <div>
          <Parameters/>
        </div>
        <div>
          <Response status={this.state.status} res={this.state.res} full={toggleFull}/>
        </div>
        <div>
          {this.state.fullScreen ? (<ExpandedResponse res={this.state.res} close={toggleFull}/>):(null)}
          {this.state.savingPanel ? (<SavingPanel close={()=>this.setState({savingPanel:!this.state.savingPanel})}/>):(null)}
          {this.state.intro ? (<Intro close={this.closeIntro}/>):(null)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user:state.data.user,
  headers:state.data.headers,
  body:state.data.body
})

export default connect(mapStateToProps, {saveRequest})(Dashboard)
