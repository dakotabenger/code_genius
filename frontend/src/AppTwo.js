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
      <div id="wrapper">
        <section id="sidebar">
				    <div class="inner">
               <Navigation isLoaded={isLoaded} />
            </div>
        </section>
        <section id="intro" class="wrapper style1 fullscreen fade-up">
						<div class="inner">
							<h1>Code Genius</h1>
							  <p>A collection of code snippets and their respective annotations<br /></p>
						</div>
          </section>
        {isLoaded ? (
          <section id="one" class="wrapper style2 spotlights">
						<section>
							<div class="content">
								<div class="inner">
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
								</div>
							</div>
						</section>
					</section>
        ) : (<p>Log in or sign up!</p>)}
      </div> 
    
  )
}

export default App;
