import React from 'react'
import axios from 'axios'
class Auth extends React.Component{
    constructor(props){
        super(props)
        this.state={username:"",password:""}
        this.submit=this.submit.bind(this)
        this.url="http://localhost:8080/verify"
    }

    submit=()=>{
     
        //verification code
       fetch(this.url+"/"+this.state.username+"/"+this.state.password)
       .then((response)=>response.json())
       .then((data)=>{
           if(data)
           this.props.callBack()
           
    })
}

    user=(event)=>{
this.setState({username:event.target.value})
    }
    pass=(event)=>{
        this.setState({password:event.target.value})
    }
    render(){
        return (
            <div>
            <input type="text" onChange={this.user} value={this.state.username}></input><br/>
            <input type="text" onChange={this.pass} value={this.state.password}></input><br/><br/>
            <button onClick={this.submit}>submit</button>
            </div>
        );
    }
}

export default Auth;