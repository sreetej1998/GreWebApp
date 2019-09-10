import React from 'react'
import axios from 'axios'
import { thisTypeAnnotation } from '@babel/types';
class Words extends React.Component{
    constructor(){
        super()
        this.state={data:[],info:[]}
        this.url="http://localhost:8080/words"
        this.randomWords=this.randomWords.bind(this)
    
    }
    componentDidMount(){
        axios.get(this.url)
        .then(response=>{
            this.setState({data:response.data})
        })
        .catch(err=>alert("didnt fetch"))

    }

    randomWords=()=>{
        var info=[]
        var index=Math.floor(Math.random()*10)%this.state.data.length
        for(var i=0;i<6;i++){
        info.push(this.state.data[index])
        if(index==this.state.data.length-1) index=1
        index++;
        }
        this.setState({info:info})
    }


    render(){
    
       
        return (
            <div>
                <button onClick={this.randomWords}>showWords</button>
                <div className="list-group">
                {this.state.info.map(data=>{
                    return (
                         <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{data.word}</h5>
      <small>3 days ago</small>
    </div>
    <p class="mb-1">{data.meaning}</p>
    <small>anime is life</small>
  </a>
            )
                    })}
                    </div>
            </div>
        );
    }
}

export default Words