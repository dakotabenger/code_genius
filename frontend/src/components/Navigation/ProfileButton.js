import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfilePage from "./ProfileButtonPage";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
 const ulStyle = {
  padding:"0px",
  backgroundColor:"darkgray",
  listStyleType:"none",
  borderRadius: "8px",
  borderLeft: "10px solid #894CFF",
  borderRight: "10px solid #894CFF",
  borderBottom: "10px solid #894CFF",
  minHeight:"px",
  zIndex:"1"
 }

 const spanStyle = {
  //  padding:"0px",
  //  display:"inline",
  //  position:"relative",
  //  top:"2px",
  //  :"5px"
  zIndex:"1"
 }
 const buttonStyle = {
  backgroundColor: "#312450",
  // marginTop:"5px",
  marginRight:"10px",
  borderRadius:"33px",
  border:"1px solid white",
  marginLeft:"5px",
  zIndex:"1",
  height:"20px",
  width:"10vw",
  maxWidth:"10vw",
  border:"0px"

 }
  return (
    <span style={spanStyle}>
      <button style={buttonStyle} onClick={openMenu}>
        <i className="fas fa-user-circle" /> 
      </button>
      {showMenu && (
          <ProfilePage />
       )}
    </span>
  );
}

export default ProfileButton;
