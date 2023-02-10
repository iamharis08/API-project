import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import FilterBar from "./components/FilterBar/FilterBar";
import Spots from "./components/Spots/Spots";
import SpotDetails from "./components/SpotDetailsPage";
import ComingSoon from "./components/Navigation/ComingSoon";
import Account from "./components/AccountComponent/Account";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails isLoaded={isLoaded} />
          </Route>
          <Route path='/comingsoon'>
            <ComingSoon />
          </Route>
          <Route path='/user/account'>
            <Account />
          </Route>
          <h1> 404: page not found</h1>
        </Switch>
      )}
    </>
  );
}

export default App;
