import React from 'react';
import './app.css';
import NavContainer from './components/nav/nav_container';
import SplashPage from './components/main/main';
import Onboarding from './components/session/onboarding';
import Modal from './components/modal/modal'
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <Modal />
      {/* <Switch> */}
        <Route exact path="/" component={NavContainer} />
        <Route exact path="/" component={SplashPage} />
        <Route exact path="/onboarding" component={Onboarding}/>
        {/* <Route exact to="/" component={Main} /> */}
        {/* <Route to="/signin" component={Session} />
        <Route to="/signup" component={Session} /> */}
        {/* <Onboarding /> */}
      {/* </Switch> */}
    </div>
  );
}

export default App;
