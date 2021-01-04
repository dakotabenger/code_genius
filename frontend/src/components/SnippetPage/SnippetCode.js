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

    const deleteSnippet = async (id) => {
        await fetch(`/api/snippets/${id}`,{method:"DELETE"})
        history.push(`/home`)
    }
  if (lines) {
    return (
    <>
    <pre className="line-numbers">
{
    lines.map((line,i) => {
        return (
            <LineComponent line={line} />
);
    })}
  </pre>
  <button onClick={(e) => {
      e.preventDefault()
      deleteSnippet(lines[0].snippet_id)
  }}>Delete Snippet</button>
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
