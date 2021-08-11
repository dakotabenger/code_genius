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
import { useHistory } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory()
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
        <>
        <section id="sidebar">
				    <div class="inner">
               <Navigation isLoaded={isLoaded} />
            </div>
        </section>
        <div id="wrapper">
        <section id="intro" class="fullscreen style1  fade-up details">
						<div class="inner details">
            <img className="navLogo" onClick={() => {history.push("/")}}src="./logo.png"></img>

							  <p style={{textAlign:"center"}}>A collection of code snippets and their respective annotations<br /></p>
						</div>
          </section>
        {isLoaded ? (
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
                  </Switch>		
        ) : (<p>Log in or sign up!</p>)}
        <footer id="footer" class="wrapper alt">
      <div class="inner copy-text">
        &copy; Benger Consulting Company. All rights reserved. Template by: <a className="copy-link" href="http://html5up.net">HTML5 UP</a>
      </div>
    </footer>
        </div>
      </> 
    
  )
}

export default App;