import React from 'react';
import axios from 'axios';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Button } from '@material-ui/core';
import Result from '../Components/result'
class Quiz extends React.Component{
    constructor(props){
        super(props)
        this.state={questions:[],answers:new Map(),correctAnswers:new Map(),submit:false}
        this.url="http://localhost:8080/generateQuiz/"

        // this.handleChange = this.handleChange.bind(this)

    }

    componentDidMount(){
        axios.get(this.url+this.props.username)
        .then(response=>{this.setState({questions:response.data})})
        .catch(err=>alert(err))
    }

     handleChange(index,event){
         var answers
         answers=this.state.answers
         answers.set(index,event.target.value)
         this.setState({answers:answers})
         
      }

      result=()=>{
          var correctAnswers= new Map()
          var size=this.state.questions.length;
          var marks=0;
          this.state.questions.map((question,index)=>{
              correctAnswers.set(index,question.answer)
          })
          for(var i=0;i<size;i++){
              if(this.state.answers.has(i)){
                  if(this.state.answers.get(i)===correctAnswers.get(i))
                  marks=marks+1;
              }

          }

          this.setState({marks:marks,score:size,submit:true})
          

      }

    render(){
        var content=null;
        if(!this.state.submit){
            content=(  <div>
                {
                    this.state.questions.map(  (question,index)=>
                    <div>
                    <h5><b>{index+1} .whats the meaning of </b> {question.question}</h5>
                    <RadioGroup  name={index}>
                    {question.options.map( (option)=>
                            <FormControlLabel  onChange={this.handleChange.bind(this,index)} value={option} control={<Radio />} label={option} />     
                        )}
                    </RadioGroup> 
                    </div>
                )}
                 <Button color="inherit" variant="outlined" onClick={this.result}>submit</Button>
            </div>)
        }
        else{
            content=<Result marks={this.state.marks} score={this.state.score}/>
        }
        
        return (
            <div>
                {content}
            </div>
        
        );
    }
}

export default Quiz;