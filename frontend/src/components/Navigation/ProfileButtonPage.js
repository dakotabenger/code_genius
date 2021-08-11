import React from "react";
import "./Navigation.css";
import IconBar from "./Iconbar";
import { useDispatch,useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const logout = (e) => {
        e.preventDefault();
        console.log("in here")
        dispatch(sessionActions.logout());
      };

    return (
    <div className="outerContainer">
      <div className="agftoeusjdffc">
        <img
          src="https://avatars.githubusercontent.com/u/37643809?v=4"
          alt=""
          className="
          agftofc"
        />
      </div>
     
     
      <div className="contactcont">
        <div className="contact">
          <div className="nzpqyu">
            <IconBar nzpqyu />
            {user.email}
            
          </div>
          <div className="nzpqyu">
            <IconBar /> Mesa, AZ
          </div>
          <div className="nzpqyu">
            <IconBar />
            602-791-5938
          </div>
        </div>
      </div>
      <div className="belowheading">
        <div className="agsjdffc">
          Like this site? Have web development work? Message me on LinkedIn or send me an email!
        </div>
      </div>
      
          <button className="htmamurai" style={{backgroundColor:"#897CFF",borderRadius:"8px",border:"0.5px solid transparent",width:"10%",textAlign:"center",marginLeft:"4em"}}  onClick={(e) => logout(e)}>Log Out</button>
          
        </div>
  );
}