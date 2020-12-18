import { HashRouter, Route } from 'react-router-dom';
import Login from './containers/Login'
import './App.css';
import './index.css'

function App() {
  return (

    <HashRouter>
      <Route exact path="/login" component={Login}></Route>
    </HashRouter>
  );
}

export default App;
