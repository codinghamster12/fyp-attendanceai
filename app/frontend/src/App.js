import { HashRouter, Route } from "react-router-dom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import AddStudent from "./components/Students/Add-Student";
import TakeAttendance from "./components/Students/Take-Attendance";
import PrivateRoute from './components/HOC/PrivateRoute'
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn }from './actions';
import React, { useEffect } from 'react'


import "./App.css";
import "./index.css";

function App() {
  const dispatch= useDispatch()
  const auth= useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    
  }, [])
  return (
    <HashRouter>
      <PrivateRoute exact path="/" component={Home}></PrivateRoute>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Signup}></Route>
      <Route exact path="/add-student" component={AddStudent}></Route>
      <Route exact path="/attendance" component={TakeAttendance}></Route>

    </HashRouter>
  );
}

export default App;
