import React, { Component } from 'react'
import '../stylesheets/dashboard.css'
import '../stylesheets/slider.css'
import Delete from '../images/x-icon.png'
import {headerNames, headerValues} from './header-data.js'
import {setHeaders} from '../actions/dataActions.js'
import {connect} from 'react-redux'

class Headers extends Component{
  constructor(props) {
    super(props)
    this.state = {
      headerNum:[{
        id:0,
        name:'',
        value:''
      }]
    }
  }

  addHeader = () => {
    var headers = this.state.headerNum
    const id = headers.length
    const object = {
      id:id,
      name:'',
      value:''
    }
    headers.push(object)
    this.setState({headerNum:headers})
    this.props.setHeaders(headers)
  }

  deleteHeader = (index) => {
    this.state.headerNum.splice(index, 1);
  }

  header(){
    const style = {
      paddingBottom:5,
      marginBottom:5,
      borderBottom:'1px solid #bdbdbd',
      width:'60%'
    }
    const inputStyle = {
      fontSize:16,
      width:'40%',
      marginRight:10,
      padding:5
    }
    return this.state.headerNum.map((header)=>{
      const index = this.state.headerNum.indexOf(header)
      var setHeaderName = (e) => {
        this.props.setHeaders(this.state.headerNum)
      }
      var setHeaderValue = (e) => {
        this.props.setHeaders(this.state.headerNum)
      }
      return(
        <div style={style} name={index}>
          <label style={{marginRight:10,color:'#696969'}}>{index+1}</label>
          <input type='text' placeholder='name' class='header-name' style={inputStyle} name='name' onChange={setHeaderName} list="name-data"/>
          <input type='text' placeholder='value' class='header-value' style={inputStyle} name='value' onChange={setHeaderValue} list='value-data'/>
          <img src={Delete} onClick={this.deleteHeader.bind(this, index)} style={{cursor:'pointer'}} alt='delete'/>
          <datalist id="name-data">{headerNames.map((name)=>{return(<option value={name}/>)})}</datalist>
          <datalist id="value-data">{headerValues.map((name)=>{return(<option value={name}/>)})}</datalist>
        </div>
      )
    })
  }

  render(){
    return(
      <div class='headers-wrapper'>
        <button class='add-header-but' onClick={this.addHeader} style={{marginBottom:10}}>add header +</button>
        <label class="switch">
          <input type="checkbox"/>
          <span class="slider round"></span>
        </label>
        <label style={{float:'right', marginRight:5, fontSize:16}}>Cors Enabled</label><br/>
        {this.header()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user:state.data.user
})

export default connect(mapStateToProps, {setHeaders})(Headers)
