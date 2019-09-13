import React from 'react'
import axios from 'axios'
import '../App.css'
import Button from '@material-ui/core/Button';
import LearntWords from './learntWords';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Quiz from '../Components/Quiz'
class Words extends React.Component{
    constructor(){
        super()
        this.state={data:[],info:[],flag:[false,false,false,false,false,false],
            index:0,word:"",quiz:false}
        this.url="http://localhost:8080/"
        this.randomWords=this.randomWords.bind(this)
    
    }
    componentDidMount(){
        axios.get(this.url+"words")
        .then(response=>{
            this.setState({data:response.data})
        })
        .catch(err=>alert("didnt fetch"))

    }

    componentDidUpdate(){
        if(this.state.flag[this.state.index]){
        axios.post(this.url+"learnt",{username:this.props.username,word:this.state.word})
        .then((response)=>{console.log("rahul")})
        .catch((err)=>alert(err))
        var flag;
        flag=this.state.flag;
        flag[this.state.index]=false
        this.setState({flag:flag})
        }  
    }

    randomWords=()=>{
        this.setState({learnt:false})
        var info=[]
        var index=Math.floor(Math.random()*10)%this.state.data.length
        for(var i=0;i<6;i++){
        info.push(this.state.data[index])
        if(index==this.state.data.length-1) index=1
        index++;
        }
        this.setState({info:info})
    }
    learntWords=()=>{
        this.setState({learnt:true})
    }
    learn=(word,index)=>{
        var flag;
        flag=this.state.flag
        flag[index]=true
        this.setState({flag:flag})
        this.setState({index:index})
        this.setState({word:word})   
    }

    quiz=()=>{
        this.setState({quiz:true})
        
    }

    render(){
        var words=null
        if(this.state.learnt){
            words=<LearntWords username={this.props.username}/>
        }
        else{

            words=(
                <Table>
                    <TableHead className="bod">
                        <TableCell style={{color:"white"}}>word</TableCell>
                        <TableCell style={{color:"white"}}>meaning</TableCell>
                    </TableHead>
                    {this.state.info.map((data,index)=>{
                       return (<TableRow>
                            <TableCell>{data.word}</TableCell>
                            <TableCell>{data.meaning}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="inherit" onClick={()=>this.learn(data.word,index)}>learnt</Button>
                            </TableCell>
                        </TableRow>)
                    })}
                </Table>

            )
        }
        if(this.state.quiz===true)
        words=<Quiz username={this.props.username}/>
        
    
       
        return (
            <div >
            <AppBar color="inherit">
            <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            GRE PREP
          </Typography>
        </Toolbar>

            </AppBar>
            <br/><br/><br></br>
                <Button onClick={this.randomWords} variant="outlined" color="inherit">showWords</Button>
                <Button onClick={this.quiz} variant="outlined" color="inherit">Take a Quiz</Button>
                <Button onClick={this.learntWords} variant="outlined" color="inherit">learntWords</Button>
                <div align="right">
                <Button onClick={this.props.callBack} variant="outlined" color="inherit" align="right">logout</Button>
               
                 </div>   
                    {words}
               
            </div>
        );
    }
}

export default Words