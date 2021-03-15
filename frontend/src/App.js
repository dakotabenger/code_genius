import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SnippetFormPage from './components/SnippetFormPage'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SnippetPage from "./components/SnippetPage/SnippetPage";
import HomePageComponent from "./components/HomePageComponent/HomePageComponent";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/snippet-form">
            <SnippetFormPage />
          </Route>
          <Route path="/snippet">
            <SnippetPage className="snippet-component"/>
          </Route>
          <Route path="/home">
            
            <HomePageComponent></HomePageComponent>
            
          </Route>
          <Route path="/">
            <img className="front-page-logo" src="./logo.png"></img>
            <div style={{display:"block"}}>
            <h1 style={{textAlign:"center",justifyContent:"center"}}>Please create an account or sign in to create snippets and annotations. Otherwise click the Home link in the Navbar to see snippets
            <br />
            <Link style={{fontSize:"32pt",padding:"15px",justifyContent:"center",alignItems:"center", color:"#89CDFF"}}to="/signup">Sign Up</Link>
            <br />
            <Link   style={{fontSize:"32pt",padding:"15px", color:"#89CDFF"}} to="/login">Log in</Link>
            <h3>Welcome To Code Genius, a code annotation site where you can post snippets and have them annotated with explanations. This is a project by Dak Benger!</h3>
            <a style={{fontSize:"32pt", color:"#89CDFF"}} href="https://github.com/dakotabenger">Check Out My GitHub For other projects!</a>
            </h1>
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
