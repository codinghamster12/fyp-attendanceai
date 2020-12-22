import React, { Component } from "react";
import { TextField, Button } from '@material-ui/core'
import StudentService from './Student-Services';
const studentService= new StudentService();
class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      enrollment_no : "",
      registration_no : "",
      semester : "",
      year : "",
      course_name : "",
      course_code: "",
      images: "",

      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
 
    console.log(this.state.images)
    // const data={
    //   'Name': this.state.name,
    //   'Enrollment_No': this.state.enrollment_no,
    //   'Registration_No':this.state.registration_no,
    //   'Semester': this.state.semester,
    //   'Year': this.state.year,
    //   'Course_Name': this.state.course_name,
    //   'Course_Code': this.state.course_code,
    //   'images': this.state.images




    // }
    const data = new FormData()
     data.append('Name', this.state.name)

     data.append('Enrollment_No', this.state.enrollment_no)
     data.append('Registration_No', this.state.registration_no)
     data.append('Semester', this.state.semester)
     data.append('Year', this.state.year)
     data.append('Course_Name', this.state.course_name)
     data.append('Course_Code', this.state.course_code)
     data.append('images', this.state.images)
     console.log(data)
    
    // axios
    studentService.createStudent(data).then(result => {
      console.log(result);
    })
    .catch(err => {
      this.setState({ errors: err.response })
    });
};
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });

  };
  handleImage=e=>{
    e.preventDefault();
    this.setState({ images: e.target.files[0] });
  };

  render() {
    return (
        <>
        <form onSubmit={this.handleForm}>
        <TextField
            id="outlined-size-small"
            type="text"
            variant="outlined"
            size="small"
            margin="normal"
            label="Name"
            name="name"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleInput}
            
          />
          <TextField
            id="outlined-size-small"
            type="text"
            variant="outlined"
            size="small"
            margin="normal"
            label="Enrollment_No"
            name="enrollment_no"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleInput}

            
          />
          <TextField
            id="outlined-size-small"
            type="text"
            variant="outlined"
            size="small"
            margin="normal"
            label="Registration_No"
            name="registration_no"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleInput}

            
          />
          <TextField
            id="outlined-size-small"
            type="text"
            variant="outlined"
            size="small"
            margin="normal"
            label="Semester"
            name="semester"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleInput}

            
          />
          <TextField
            id="outlined-size-small"
            type="text"
            variant="outlined"
            size="small"
            margin="normal"
            label="Year"
            name="year"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleInput}

            
          />
          <TextField
            id="outlined-size-small"
            type="text"
            variant="outlined"
            size="small"
            margin="normal"
            label="Course Name"
            name="course_name"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleInput}

          />
          <TextField
            id="outlined-size-small"
            type="text"
            variant="outlined"
            size="small"
            margin="normal"
            label="Course Code"
            name="course_code"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleInput}

            
          />
          <TextField
            id="outlined-size-small"
            type="file"
            variant="outlined"
            size="small"
            margin="normal"
            name="images"
            inputProps={{ style: { background: "#fff" } }}
            onChange={this.handleImage}

            
          />
          <Button variant="contained" color="primary" disableElevation size="large" type="submit" >
          Add Student
        </Button>


        </form>

        
        </>
        
     
                
          
    );
  }
}


export default AddStudent;