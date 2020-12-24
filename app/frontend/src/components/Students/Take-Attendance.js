import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, TextField, Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    
    subheading:{
        fontWeight: 500,
        fontSize: 18,
        marginTop: 50,
        fontFamily: 'Montserrat, sans-serif'
    },
    button:{
        textAlign: 'center',
        display: 'block',
        margin: '0 auto'
    },
   text:{
     marginBottom: 50,
     fontFamily: 'Montserrat, sans-serif'

   }


}))


const TakeAttendance = () => {
    const [course, setCourse] = useState('')
    const [semester, setSemester] = useState('')
    const [section, setSection] = useState('')
    const [period, setPeriod] = useState('')
    const classes= useStyles()

    const attendanceDetails = (e) => {
        e.preventDefault()
        const attendance= {
            course, semester, section, period
        }
        console.log(attendance)
    }
    
    

    return (
       <>
       <Container maxWidth="md" style={{marginTop:100}}>
      <Box
        p="24px"
        mt="50px"
        bgcolor="#fff"
        boxShadow="10"
      >

        
        <form onSubmit={attendanceDetails}>
        <Typography align="center" variant="body1" color="textPrimary" className={classes.subheading}>
          Take Attendance
        </Typography>
        <br/>
        <Typography variant="caption" color="textSecondary">
          Course Name
        </Typography>
        <br/>

        <TextField
          id="outlined-size-small"
          value={course}
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          inputProps={{style:{ background: '#fff' }}}
          onChange= {(e) => setCourse(e.target.value)}
          

        />
        <Typography variant="caption" color="textSecondary">
          Semester
        </Typography>
        <TextField

          id="outlined-size-small"
          value={semester}
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          inputProps={{style:{ background: '#fff' }}}
          onChange= {(e) => setSemester(e.target.value)}
          
        />
        
        <Typography variant="caption" color="textSecondary">
          Section
        </Typography>
        <TextField

          id="outlined-size-small"
          value={section}
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          inputProps={{style:{ background: '#fff' }}}
          onChange= {(e) => setSection(e.target.value)}
          
        />
        <Typography variant="caption" color="textSecondary">
          Period
        </Typography>
        <TextField

          id="outlined-size-small"
          value={period}
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          inputProps={{style:{ background: '#fff' }}}
          onChange= {(e) => setPeriod(e.target.value)}
          
        />
        <br/>
        <br/>



        <Button variant="contained" color="primary" disableElevation size="large" type="submit" className={classes.button}>
          Take Attendance
        </Button>
        <br/>
        <br/>

        </form>
        
        <br/>
      
        
        
        
      </Box>
    </Container>

       </>
    )
}

export default TakeAttendance
