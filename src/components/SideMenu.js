import React, { Component } from 'react'
import '../stylesheets/sidemenu.css'
import History from './History.js'
import Export from '../images/export.png'
import Delete from  '../images/delete.png'
import SavedRequests from './SavedRequests.js'
import {json2excel} from 'js2excel'
import fire from '../Fire.js'

class SideMenu extends Component{
  constructor(props) {
    super(props)
    this.state = {
      saved:true
    }
  }

  export = () => {
    let exporting
    if(this.state.saved === true){
      exporting = 'savedRequests'
    }else{exporting = 'history'}
    const user = fire.auth().currentUser
    const id = user.uid
    fire.database().ref(id+'/'+exporting).once('value').then((snapshot)=>{
      const snap = snapshot.val()
      var data = []
      Object.keys(snap).map((key, index)=> {
        data.push(snap[key])
      })
      try {
        json2excel({
          data,
          name:exporting,
          formateDate: 'yyyy/mm/dd'
        });
      }
      catch (e) {
        console.log(e);
      }
      return data
    })
  }

  deleteAll = () => {
    const user = fire.auth().currentUser
    if(this.state.saved === true){
      fire.database().ref().child(user.uid).update({savedRequests:0})
    }else{
      fire.database().ref().child(user.uid).update({history:0})
    }
  }

  render(){
    let activeSaved
    let activeHistory
    if(this.state.saved === true){
      activeSaved = '0 4px 2px -2px #00c5db'
      activeHistory = null
    }
    else if(this.state.saved === false){
      activeHistory = '0 4px 2px -2px #00c5db'
      activeSaved = null
    }
    const change = () => {this.setState({saved:!this.state.saved})}
    return(
      <div class='sidemenu'>
        <div style={{textAlign:'center'}}>
          <input type='text' class='filter-bar' placeholder='search'/><br/>
        </div>
        <div style={{width:'80%', margin:'auto'}}>
          <label class='side-menu-tear' style={{float:'left', boxShadow:activeSaved}} onClick={change}>Saved Requests</label>
          <label class='side-menu-tear' style={{float:'right', boxShadow:activeHistory}} onClick={change}>History</label><br/><br/><br/>
          {this.state.saved ? (<SavedRequests/>):(<History/>)}
        </div>
        <div class='menu-bottom'>
          <button onClick={this.export} style={{borderRight:'1px solid #828282'}}>Export <img src={Export} alt='export'/></button>
          <button onClick={this.deleteAll}>Delete All <img src={Delete} alt='delete'/></button>
        </div>
      </div>
    )
  }
}


export default SideMenu
