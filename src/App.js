import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Containers/Login.jsx';


const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/LOGIN' component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;

