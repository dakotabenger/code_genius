import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <a href="https://github.com/dakotabenger"></a>
      </>
    );
  }

  const liStyle = {
    float:"left",
    display:"flex",
    alignItems:"center",
    marginBottom:"10px"
  }


  const NavLinkStyle = {
    // padding:"8px",
    // border: "3px solid black",
    // borderRadius:"15%",
    padding:"5px",
    margin:"10px",
    top:"4px",
    position:"relative",
    // backgroundColor:"#892CDC",
    color:"#bc6ff1",
    fontWeight:"bold"
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
    <div style={flexDivStyle}>
    <svg onClick={(e) => {console.log("I can turn this into a menu")}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#bc6ff1" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
    <img src="./logo.png"></img>
    <ul style={ulStyle}>
      <li style={liStyle}>
        {isLoaded && sessionLinks}
        <NavLink style={NavLinkStyle} exact to="/home">Home</NavLink>
      </li>
      <li style={liStyle}>
        <NavLink style={NavLinkStyle}exact to="/snippet-form">Create Snippet</NavLink>
      </li>
    </ul>
    </div>
    </>
  );
}

export default Navigation;