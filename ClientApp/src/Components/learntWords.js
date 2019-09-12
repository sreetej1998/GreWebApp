import React from 'react'
import axios from 'axios'
import '../App.css'
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class LearntWords extends React.Component{
    constructor(props){
        super(props)
        this.url="http://localhost:8080/"
        this.state={LearntWords:[],flag:false}
        this.username=this.props.username
    }
    componentDidMount(){
        fetch(this.url+this.username)
        .then(response=>response.json())
        .then(data=>{
            this.setState({LearntWords:data})
        })
    }


    render(){
        return (
            <Table>
                     <TableHead className="bod">
                        <TableCell style={{color:"white"}}>word</TableCell>
                        <TableCell style={{color:"white"}}>meaning</TableCell>
                    </TableHead> 
                    {this.state.LearntWords.map(data=>{
                       return (<TableRow>
                            <TableCell>{data.word}</TableCell>
                            <TableCell>{data.meaning}</TableCell>
                            <TableCell>
                             <Button variant="outlined" color="inherit">learnt</Button>
                               
                            </TableCell>
                        </TableRow>)
                    })}
                </Table>
        )

    }
}

export default LearntWords;