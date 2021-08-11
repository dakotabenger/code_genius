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
import {fetch} from '../../store/csrf'


export default function LineComponent({line}) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
  
    const setLineStore = async (line) => {
        // console.log(line,"line component")   
        
        const res = await fetch(`/api/annotations/${line.id}`)
            const {line:updatedLine} = res.data
            // console.log(updatedLine)
           return dispatch(lineActions.giveLine(updatedLine))
    
    }        
    setLineStore(line)
    useEffect(() => {
        Prism.highlightAll()
    });


return (
<>
    <code className="language-javascript line-code" id={line.id} onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(line,"code element")
        setLineStore(line)
        setShowModal(true)
    }
    }>
        {"  " + line["line_text"]}
                
            </code><br />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnnotationComponent line={line} />
                </Modal>
                )}
                
            </>
)}