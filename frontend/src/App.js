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
            {/* <FilterBar /> */}
            <Spots />
          </Route>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/spots/:spotId">
            <SpotDetails isLoaded={isLoaded} />
          </Route>
          <Route path='/comingsoon'>
            <ComingSoon />
          </Route>
          <h1> 404: page not found</h1>
        </Switch>
      )}
    </>
  );
}

export default App;
