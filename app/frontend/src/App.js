import { HashRouter, Route } from "react-router-dom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import "./App.css";
import "./index.css";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Signup}></Route>

    </HashRouter>
  );
}

export default App;
