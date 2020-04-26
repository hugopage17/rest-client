import React, { Component } from 'react'
import '../stylesheets/sidemenu.css'
import fire from '../Fire.js'
import {connect} from 'react-redux'
import Delete from '../images/white-delete-icon.png'

class SavedRequests extends Component{
  constructor(props) {
    super(props)
    this.state = {
      requests:{}
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      const user = fire.auth().currentUser
      const id = user.uid
      try{
        fire.database().ref(id+'/savedRequests').on('value', (snap) => {
          const requests = snap.val()
          if(requests === 0 || requests === null){
            this.setState({requests:{}})
          }
          else{
            this.setState({requests})
          }
        })
      }
      catch(err){}
    }, 50)

  }

  delete = (name) => {
    const user = fire.auth().currentUser
    fire.database().ref(user.uid+'/savedRequests/'+name).remove()
  }

  returnRequests(){
    const requests = this.state.requests
    const style = {
      main:{
        borderBottom:'1px solid #00c5db',
        overflow:'auto',
        width:'100%',
        padding:10
      },
      left:{
        float:'left',
        marginRight:24,
        color:'white'
      },
      right:{
        color:'white',
        fontSize:20,
        float:'right'
      }
    }
    try{
      return Object.keys(requests).map((key, index)=>{
        const req = requests[key]
        let color
        let resColor
        if(req.method === 'GET'){color = '#00ff1a'}
        else if (req.method === 'POST'){color = '#00c5db'}
        else if (req.method === 'DELETE'){color = '#ff0000'}
        else if (req.method === 'PATCH'){color = '#ffc400'}
        return(
          <div style={style.main}>
            <div style={style.left}>
              <label style={{color:color,border:'1px solid '+color, borderRadius:5, padding:5, fontSize:18}}>{req.method.toUpperCase()}</label><br/><br/>
            </div>
            <div style={style.right}>
              <label style={{fontSize:16,color:resColor}}>{req.res}</label><br/>
            </div>
            <div>
              <label style={{marginTop:10, color:'white',cursor:'pointer'}}>{req.name}</label>
              <img src={Delete} style={{cursor:'pointer', float:'right'}} onClick={this.delete.bind(this, req.name)} alt='delete'/>
            </div>
          </div>
        )
      })
    }
    catch(err){
      return err
    }
  }

  render(){
    return(
      <div>
        {this.returnRequests()}
      </div>
    )
  }
}

const mapStateToProps = state => ({user:state.data.user})

export default connect(mapStateToProps)(SavedRequests)
