import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "./prism.css";
import "./SnippetCode.css"
import { useDispatch, useSelector } from "react-redux";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { Modal } from "../../context/Modal";
import AnnotationComponent from "./AnnotationComponent";
import * as lineActions from '../../store/line'
import LineComponent from "./LineComponent"
import { fetch } from "../../store/csrf";
import { useHistory } from "react-router-dom";

export default function SnippetCode({ lines }) {
    const history = useHistory()

   
  if (lines) {
    return (
    <>
    <pre style={{height:"500px"}} className="line-numbers">
{
    lines.map((line,i) => {
        return (
            <LineComponent line={line} />
);
    })}
    <code className="language-javascript line-code" ></code><br></br>
    <code className="language-javascript line-code" ></code><br ></br>
    <code className="language-javascript line-code" ></code><br/>
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    
    <code className="language-javascript line-code" ></code><br />
    <code className="language-javascript line-code" ></code><br />
    
    <code className="language-javascript line-code" ></code><br />
    
    <code className="language-javascript line-code" ></code><br />
    
    <code className="language-javascript line-code" ></code><br />
    
    <code className="language-javascript line-code" ></code><br />
    
    <code className="language-javascript line-code" ></code><br />
    
    <code className="language-javascript line-code" ></code><br />
    

    
  </pre>
 
  </>
  
    )
} else {
    return (
      <div>
        <p>We couldn't find that Snippet</p>
      </div>
    );
  }
}
