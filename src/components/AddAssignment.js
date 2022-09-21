import React from 'react';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../constants.js'
import { BrowserRouter, Switch, Route, Link  } from 'react-router-dom';         
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {assignmentName:'', dueDate:'', courseId:''};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${SERVER_URL}/assignment`,
          {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                assignmentName: this.state.assignmentName, 
                dueDate: this.state.dueDate, 
                courseId: this.state.courseId})
          } )
          .then(response => {
            if (response.ok) {
                this.setState({assignmentName:'', dueDate:'', courseId:''});
                toast.success("Assignment successfully added.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else {
                console.log("Failed to add assignment.");
                toast.error("Could not add assignment.", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
          })
        .catch(err => console.log(err))
        
    }
    
    render() {
        return (
            <div>
                <h3>Adding New Assignment(s) </h3>

                <p>Assingment Name:</p>
                <input type='text' name='assignmentName' value={this.state.assignmentName} onChange={this.handleChange} />

                <p>Due Date (YYYY-MM-DD):</p>
                <input type='text' name='dueDate' value={this.state.dueDate} onChange={this.handleChange} />

                <p>Course ID:</p>
                <input type='text' name='courseId' value={this.state.courseId} onChange={this.handleChange} />
                <br/><br/>  

                <Button variant="outlined" color="primary" style={{margin: 10}}         
                    onClick={this.handleSubmit} >Submit</Button> 
                <ToastContainer autoClose={1500} />
            </div>

        );
    }
}

export default AddAssignment;
