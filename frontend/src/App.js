import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
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
  const sessionUser = useSelector(state => state.session.user);

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

							  <p style={{textAlign:"center",color:"whitesmoke"}}>A collection of code snippets and their respective annotations<br /></p>
						</div>
          </section>
       
                  <Switch>
                    <Route path="/sign-in" >
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
                        {sessionUser ? (<HomePageComponent></HomePageComponent>) : (<LoginFormPage />)}
                      </Route>
                  </Switch>		
      
        <footer id="footer" class="wrapper alt" >
      <div class="inner copy-text">
         Dak Benger <a href="https://github.com/dakotabenger">| Github </a> <a href="https://www.linkedin.com/in/dakota-benger/">| LinkedIn</a>  <a href="https://dakotabenger.github.io/portfolio-page"> | Portfolio Site</a> <a href="http://html5up.net"> | Design: HTML5 UP</a>
      </div>
    </footer>
        </div>
      </> 
    
  )
}

export default App;