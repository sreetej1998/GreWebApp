import React from 'react';
import axios from 'axios';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Button } from '@material-ui/core';
class Quiz extends React.Component{
    constructor(props){
        super(props)
        this.state={questions:[],answers:[]}
        this.url="http://localhost:8080/generateQuiz/"

        // this.handleChange = this.handleChange.bind(this)

    }

    componentDidMount(){
        axios.get(this.url+this.props.username)
        .then(response=>{this.setState({questions:response.data})})
        .catch(err=>alert(err))
    }

     handleChange(event){
         var answers
         answers=this.state.answers
         answers.push(event.target.value)
        this.setState({answers:answers})
      }

      result=()=>{

      }

    render(){
        
        return (
            <div>
                {
                    this.state.questions.map(  (question,index)=>
                    <div>
                    <h5><b>{index+1} .whats the meaning of </b> {question.question}</h5>
                    <RadioGroup onChange={()=>this.handleChange}>
                    {question.options.map( option=>
                            <FormControlLabel  value={option} control={<Radio />} label={option} />     
                        )}
                    </RadioGroup> 
                    </div>
                )}
                 <Button color="inherit" variant="outlined" onClick={this.result}>submit</Button>
            </div>
        );
    }
}

export default Quiz;