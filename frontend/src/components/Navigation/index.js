import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  let sessionLinks;
  const NavLinkStyle = {
    // padding:"8px",
    // border: "3px solid black",
    // borderRadius:"15%",
    // padding:"5px",
    marginRight:"10px",
    // top:"4px",
    // position:"relative",
    // backgroundColor:"#892CDC",
    color:"#89CDFF",
    fontWeight:"bold"
  }

  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      <a href="https://github.com/dakotabenger"></a>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink style={NavLinkStyle} to="/signup">Sign Up</NavLink>
        <a href="https://github.com/dakotabenger"></a>
      </>
    );
  }

  const liStyle = {
    float:"left",
    // display:"flex",
    alignItems:"center",
    marginBottom:"10px"
  }


  

  const ulStyle = {
    listStyleType:"none",
    margin:"0px",
    padding:"0px",
    width: "100%",
    display:"flex",
    justifyContent:"flex-end",
    backgroundColor:"#52057b"
  }

  const flexDivStyle = {
    display: "flex",
    width:"100%",
    height: "40px",
    backgroundColor:"#52057b"
  }

  const siteNameStyle = {
    fontWeight:"bold",
    position:"relative",
    top:"6px",
    left:"3px",
    fontSize:"15pt",
    color:"#bc6ff1"
  }

  
  return (
    <>
    <section id="sidebar">
				<div class="inner">
					<nav>
          <ul>
            <li>
              
            <img className="navLogo" onClick={() => {history.push("/")}}src="./logo.png"></img>

              <NavLink  exact to="/home">Our Snippets</NavLink>
              <NavLink exact to="/snippet-form">Create Snippet</NavLink>
                {isLoaded && sessionLinks}
            </li>
          </ul>
					</nav>
				</div>
			</section>
    <div>
    
   
    </div>
    </>
  );
}

export default Navigation;