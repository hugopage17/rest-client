import React, { Component } from 'react'

class ExtendedResponse extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div class='middle-panel-wrapper'>
        <button onClick={this.props.close}>Close</button>
        <div class='middle-panel'>
          <textarea value={this.props.res} class='panel-textarea'/>
        </div>
      </div>
    )
  }
}

export default ExtendedResponse
