import React, { useState, useEffect } from "react";
import "./SnippetCode.css"
import { useDispatch, useSelector } from "react-redux";
import {fetch} from '../../store/csrf'
import * as snippetActions from '../../store/snippet'
import * as lineActions from '../../store/line'
export default function AnnotationForn({existingAnnotation,type}) {
    const line = useSelector((state) => state.line.Line);
    console.log(line)
    const [annotation,setAnnotation] = useState(existingAnnotation ? existingAnnotation.annotation : "" )
    const dispatch = useDispatch()

  
    const setLineStore = async (line) => {
        
        const res = await fetch(`/api/annotations/${line.id}`)
            const {line:updatedLine} = res.data
            // console.log(updatedLine)
           return dispatch(lineActions.giveLine(updatedLine))
    
    }        
    
    useEffect(() => {
        // setLineStore(line)
    },[setLineStore]);
        return (
            <form className="annotation-form" onSubmit={(e) => {
                if (type === "edit") {
                    const editSubmit = async (e,line) => {
                        e.preventDefault()
                        const reqBody = {
                            annotation:annotation
                             }
                         const res = await fetch(`/api/annotations/${existingAnnotation.id}`,{
                            method:"PUT",
                             body: JSON.stringify(reqBody)
                              })
                         const {updatedLine} = res.data
                        console.log(updatedLine)
                        return dispatch(lineActions.giveLine(updatedLine))
        } 
               editSubmit(e,line) } else {
                const newAnontation = async (e,line,annotation) => {
                    e.preventDefault()
                    const reqBody = {
                        lineId:line.id,
                        annotation:annotation,
                        voteTotal:0
                    }
                    const res = await fetch(`/api/annotations`, {
                        method: "POST",
                        body: JSON.stringify(reqBody),
                    });
                    const {newAnnotation} = res.data
                    console.log({newAnnotation})
                    // dispatch(annotationActions.giveAnnotation(newAnnotation.Annotations))
                    dispatch(lineActions.giveLine(newAnnotation))
                } 
                newAnontation(e,line,annotation) }
            }}>
                    <h4 style={{textAlign:"center"}}htmlFor="annotation">Have something else to add about this snippet? Add an annotation below:</h4>
                <div style={{display:'flex',alignItems:"center"}}>
                    <textarea style={{width:"1000px",height:"200px",backgroundColor:"whitesmoke"}}name="annotation" id="annotation-input" value={annotation} onChange={(e) => {
                        console.log(e.target.value,"event",annotation,"annotation",existingAnnotation,"existing")
                        setAnnotation(e.target.value)}} />
                </div>
                <button style={{height:"80px",width:"66%",backgroundColor:"#897CFF",borderRadius:"8px",marginRight:"0",textAlign:"center",marginLeft:"150px"}}className="form-button">Create New Annotation</button>
            </form>
)
        }