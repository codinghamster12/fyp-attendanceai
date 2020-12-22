import React, {useState, useEffect} from "react";
import { Container, Box, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import './index.css'
import { isUserLoggedIn, login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    
    subheading:{
        fontWeight: 500,
        fontSize: 18,
        marginTop: 50,
        fontFamily: 'Montserrat, sans-serif'
    },
    button:{
        textAlign: 'center'
    },
   text:{
     marginBottom: 50,
     fontFamily: 'Montserrat, sans-serif'

   }


}))



const Login = () => {
    const classes= useStyles();
    const [username, setUsername]= useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const dispatch= useDispatch();
    const auth= useSelector(state => state.auth)

   
    
    
    useEffect(() => {
      if(!auth.authenticate){
        dispatch(isUserLoggedIn())

      }
        
    }, [])

    if (auth.authenticate) {
      return <Redirect to={"/"}></Redirect>;
    }

   
    

    const userLogin = (e) => {
      e.preventDefault();
      const user={
        username, password
      }
      dispatch(login(user))

    }
  return (
    <Container maxWidth="xs" style={{marginTop:100}}>
      <Box
        p="24px"
        mt="50px"
        bgcolor="black"
        boxShadow="10"
        borderRadius="15px"
      >

        
        <form onSubmit={userLogin}>
        <Typography align="center" variant="body1" color="secondary" className={classes.subheading}>
          Sign in to your account
        </Typography>
        <br/>
        <Typography variant="caption" color="secondary">
          Email
        </Typography>
        <br/>

        <TextField
          id="outlined-size-small"
          value={username}
          type="email"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          inputProps={{style:{ background: '#fff' }}}
          onChange= {(e) => setUsername(e.target.value)}
          

        />
        <Typography variant="caption" color="secondary">
          Password
        </Typography>
        <TextField

          id="outlined-size-small"
          value={password}
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          inputProps={{style:{ background: '#fff' }}}
          onChange= {(e) => setPassword(e.target.value)}
          
        />
        <br/>
        <br/>



        <Button variant="contained" color="primary" fullWidth disableElevation size="large" type="submit" className={classes.button}>
          Login
        </Button>
        <br/>
        <br/>
        {auth.error ? <Typography variant="subtitle1" style={{color: 'red'}}>{Object.values(auth.error)[0]}</Typography> : null}

        </form>
        
        <br/>
      
        
        
        <Typography variant="body2" color="secondary" align="center" className={classes.text}>
          Don't have an account? <span style={{color: '#fff'}}><a href="/#/register" style={{textDecoration: 'none', color: '#116535'}}>Signup</a></span>
        </Typography>


      </Box>
    </Container>
  );
};

export default Login;
