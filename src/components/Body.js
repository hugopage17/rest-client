import React, { Component } from 'react'
import '../stylesheets/sidemenu.css'
import {setBody} from '../actions/dataActions.js'
import {connect} from 'react-redux'

class Body extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  body = () => {
    const body = document.getElementById('body-content').value
    this.props.setBody(body)
  }

  render(){
    return(
      <div>
        <textarea id='body-content' onChange={this.body}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({user:state.data.user})

export default connect(mapStateToProps,{setBody})(Body)
