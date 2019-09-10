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
  }
  setLogin()
  {
    this.setState({logged:true})
  }

  render(){
    if(this.state.logged)
    {
    return (
      <div>
        <Words />
      </div>
     );
    }
    return <Auth callBack={this.setLogin} />
  }
}

export default App;
