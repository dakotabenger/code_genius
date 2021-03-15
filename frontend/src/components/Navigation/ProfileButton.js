import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

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
  minHeight:"250px",
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
  backgroundColor: "#897CFF",
  marginTop:"5px",
  marginRight:"10px",
  borderRadius:"33px",
  border:"1px solid white",
  marginLeft:"5px",
  zIndex:"1"

 }
  return (
    <span style={spanStyle}>
      <button style={buttonStyle} onClick={openMenu}>
        <i className="fas fa-user-circle" /> 
      </button>
      {showMenu && (
        <>
      <div style={{...ulStyle}}>
        <div style={{display:"flex",alignContent:"space-between",justifyContent:"center"}}>
      <p style={{textAlign:"center",fontWeight:"bold"}}>Profile:<br></br><br></br></p><br></br>
        </div>
        <p style={{textAlign:"center"}}>
          Usermame: {user.username}<br></br>
          Email: {user.email}
          </p>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <button style={{backgroundColor:"#897CFF",borderRadius:"8px",border:"0.5px solid transparent",}}onClick={logout}>Log Out</button>
          </div>
          </div>
        </>
      )}
    </span>
  );
}

export default ProfileButton;
