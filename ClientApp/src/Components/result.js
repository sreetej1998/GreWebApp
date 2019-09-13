import  React from 'react'
import Typography from '@material-ui/core/Typography';
class Result extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <Typography align ="center" color="primary" variant="body1">
                    congrats you got {this.props.marks}/{this.props.score}
                </Typography>
                
            </div>
        )
    }
}

export default Result