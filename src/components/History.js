import React, { Component } from 'react'
import '../stylesheets/sidemenu.css'
import fire from '../Fire.js'
import {connect} from 'react-redux'
import Delete from '../images/white-delete-icon.png'

class History extends Component{
  constructor(props) {
    super(props)
    this.state = {
      history:{}
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      const user = fire.auth().currentUser
      const id = user.uid
      try{
        fire.database().ref(id+'/history').on('value', (snap) => {
          const history = snap.val()
          this.setState({history})
        })
      }
      catch(err){}
    }, 50)
  }

  delete = (id) => {
    const user = fire.auth().currentUser
    fire.database().ref(user.uid+'/history/'+id).remove()
  }

  returnHistory(){
    const history = this.state.history
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
      return Object.keys(history).map((key, index)=>{
        const his = history[key]
        let color
        let resColor
        if(his.method == 'GET'){
          color = '#00ff1a'
        }
        else if (his.method == 'POST'){
          color = '#00c5db'
        }
        else if (his.method == 'DELETE'){
          color = '#ff0000'
        }
        else if (his.method == 'PATCH'){
          color = '#ffc400'
        }
        if(his.status == 200){
          resColor = '#00ff1a'
        }
        else if(his.status == 201){
          resColor = '#00c5db'
        }
        else if(his.status == 404){
          resColor = '#ff0000'
        }
        const url = his.url.slice(0, 26)+'......'
        return(
          <div style={style.main}>
            <div style={style.left}>
              <label style={{color:color,border:'1px solid '+color, borderRadius:5, padding:5, fontSize:18}}>{his.method.toUpperCase()}</label><br/><br/>
            </div>
            <div style={style.right}>
              <label style={{color:resColor}}>{his.status+' '}</label><label style={{fontSize:16,color:resColor}}>{his.res}</label><br/>
            </div>
            <div>
              <label style={{marginTop:10, color:'white',cursor:'pointer'}} class='his-url'>{url}</label>
              <img src={Delete} style={{cursor:'pointer', float:'right'}} onClick={this.delete.bind(this, his.id)}/>
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
        {this.returnHistory()}
      </div>
    )
  }
}

const mapStateToProps = state => ({user:state.data.user})

export default connect(mapStateToProps)(History)
