import React from 'react'
import {  Box } from '@material-ui/core';
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import '../App.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




class Auth extends React.Component{
    
    constructor(props){
        super(props)
        this.state={}
        this.submit=this.submit.bind(this)
        this.url="http://localhost:8080/verify"
        
    }

    submit=()=>{
     
        this.props.rememberUserName(this.state.username)
        console.log(this.state.username)
       fetch(this.url+"/"+this.state.username+"/"+this.state.password)
       .then((response)=>response.json())
       .then((data)=>{
           if(data)
           this.props.callBack()
           
    })
}

    hanldleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        return (
            <div>
            <AppBar color="inherit">
            <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            GRE PREP
          </Typography>
        </Toolbar>

            </AppBar>
            <div align="Center">
            <Box m={20}/>
            <Box boxShadow={3} style={{ width: '25rem', height: '20rem' }}>
            <br/><br/>
            <br></br>
            <TextField name="username"
             onChange={this.hanldleChange}
             helperText="enter your username"
             variant="filled"
             required="true"
             label="username" /><br/><br/>

            <TextField name="password" onChange={this.hanldleChange}
            helperText="enter your password"
            variant="filled"
            required="true"
            label="password"
            /><br/><br/>
            <Button variant="outlined" color="inherit" onClick={this.submit}>
            submit
            </Button>
            </Box>

            </div>
            </div>
       
        );
    }
}

export default Auth;