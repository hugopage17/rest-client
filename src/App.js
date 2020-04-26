import React from 'react';
import './App.css';
import fire from './Fire.js'
import TopNav from './components/TopNav.js'
import SideMenu from './components/SideMenu.js'
import Dashboard from './components/Dashboard.js'
import Home from './components/Home.js'
import SplashScreen from './components/SplashScreen.js'
import {setUser} from './actions/dataActions.js'
import {connect} from 'react-redux'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:null,
      loading:true
    }
  }

  componentDidMount(){
    alert('New Push')
    this.authListener()
    setTimeout(()=>{
      this.setState({loading:false})
    }, 2000)
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        const user = fire.auth().currentUser
        this.setState({user:user})
        this.props.setUser(user)
      }
      else{
        this.setState({user:null})
      }
    })
  }

  render(){
    return (
      <div>
        {this.state.loading ? (
          <div class='loading-wrapper'>
            <div class='loading-panel'>
              <SplashScreen/>
            </div>
          </div>
        ):(
          <div>
          {this.state.user ?(
            <div className="App">
              <div>
                <SideMenu/>
              </div>
              <div style={{width:'80%', float:'right'}}>
                <TopNav/><br/>
                <Dashboard/>
              </div>
            </div>
          ):(<Home/>)
          }
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user:state.data.user
})

export default connect(mapStateToProps, {setUser})(App);
