import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { Redirect } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";
import { isUserLoggedIn, login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/user";

const useStyles = makeStyles((theme) => ({
  subheading: {
    fontWeight: 500,
    fontSize: 18,
    marginTop: 50,
    fontFamily: "Montserrat, sans-serif",
  },
  button: {
    textAlign: "center",
  },
  text: {
    marginBottom: 30,
    fontFamily: "Montserrat, sans-serif",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);


  if (auth.authenticate) {
    return <Redirect to={"/"}></Redirect>;
  }

  

  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      password2,
    };
    console.log(user);
    dispatch(signup(user));
  };
  return (
    <Container maxWidth="xs" style={{ marginTop: 100 }}>
      <Box
        p="24px"
        mt="50px"
        bgcolor="black"
        boxShadow="10"
        borderRadius="15px"
      >
        <form onSubmit={registerUser}>
          <Typography
            align="center"
            variant="body1"
            color="secondary"
            className={classes.subheading}
          >
            Sign up your account
          </Typography>
          <br />
          <Typography variant="caption" color="secondary">
            Email
          </Typography>
          <br />

          <TextField
            id="outlined-size-small"
            value={email}
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            inputProps={{ style: { background: "#fff" } }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography variant="caption" color="secondary">
            Username
          </Typography>
          <br />

          <TextField
            id="outlined-size-small"
            value={username}
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            inputProps={{ style: { background: "#fff" } }}
            onChange={(e) => setUsername(e.target.value)}
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
            inputProps={{ style: { background: "#fff" } }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Typography variant="caption" color="secondary">
            Confirm Password
          </Typography>
          <TextField
            id="outlined-size-small"
            value={password2}
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            inputProps={{ style: { background: "#fff" } }}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            size="large"
            type="submit"
            className={classes.button}
          >
            Sign Up
          </Button>
          <br />
          <br />

          {user.error ? (
            <Typography
              variant="subtitle1"
              style={{ color: "red", fontSize: 14, fontFamily: "Montserrat, sans-serif" }}
            >{`${Object.values(user.error)[0]}`}</Typography>
          ) : null}
        </form>

        <Typography
          variant="body2"
          color="secondary"
          align="center"
          className={classes.text}
        >
          Already registered.{" "}
          <span style={{ color: "#fff" }}>
            <a
              href="/#/login"
              style={{ textDecoration: "none", color: "#116535" }}
            >
              Login
            </a>
          </span>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
