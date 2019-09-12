import React from 'react';
import Words from './Components/words'
import Auth from './Components/Auth'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      logged:false
    }
    this.setLogin = this.setLogin.bind(this);
    this.rememberUserName=this.rememberUserName.bind(this);
  }
  
  setLogin()
  {
    this.setState({logged:!this.state.logged});
    
  }

  rememberUserName(username){
this.setState({username:username})
  }

  render(){
    if(this.state.logged)
    {
    return (
      <div>
        <Words callBack={this.setLogin} username={this.state.username}/>
      </div>
     );
    }
    return <Auth callBack={this.setLogin} rememberUserName={this.rememberUserName}/>
  }
}

export default App;
