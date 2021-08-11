import React, { useState } from "react";
import "./prism.css";
import "./SnippetCode.css"
import AnnotationForm from './AnnotationForm'
import { useSelector,useDispatch } from "react-redux";
import { fetch } from "../../store/csrf";
import * as lineActions from "../../store/line"
import * as annotationActions from '../../store/annotation'
export default function AnnotationComponent() {
    const line = useSelector((state) => state.line.Line);
    const annotations = useSelector((state) => state.line.Line.Annotations)
    // console.log(annotations)
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const [showForm,setShowForm] = useState(false)
    
    const deleteThisAnnotation = async (annotation) => {
        const res = await fetch(`/api/annotations/${annotation}`,{
            method:"DELETE"
        })
    }

    const editThisAnnotation = async (annotation) => {
        return
    }
    const handleVote = async (vote,id) => {
        const reqBody = {
            vote
        }
        const res = await fetch(`/api/annotations/vote/${id}`,{
            method: "PUT",
            body: JSON.stringify(reqBody),
        }
        )        
        const {line} = res.data
                return dispatch(lineActions.giveLine(line))
    }
 if (annotations && annotations.length > 0) {
        return (
            <div className="annotation-component">
                <h1 style={{textAlign:"center",color:"whitesmoke"}}>Annotations</h1>
                <h3 style={{textAlign:"center",color:"whitesmoke"}}>View existing annotations from our users or submit your own! </h3>
                <div className={"line-number-annotation"}><p style={{textAlign:"center",color:"whitesmoke",backgroundColor:"#892CDC"}}>{"   " + (line.number + 1)}{" " + line.line_text}</p></div>
                {annotations.map(annotation => {
                    console.log(annotation)
                    return (
                        <>
                        <p style={{textAlign:"center",color:"whitesmoke"}} className="annotation-text"><p style={{fontSize:"12pt"}}>This User Says: </p>{annotation.annotation}</p>
                     <span style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <button style={{display:"inline",margin:"5px",borderRadius:"8px",backgroundColor:"#897CFF"}} onClick={(e) => {
                            e.preventDefault()
                            handleVote(true,annotation.id)}}>
                                Upvote
                        </button>
                        <p style={{display:'inline',marginTop:"15px",color:"whitesmoke"}}>No. Of Votes: {annotation.vote_total}</p>
                        <button style={{display:"inline",margin:"5px",borderRadius:"8px",backgroundColor:"#897CFF"}} onClick={(e) => {
                            e.preventDefault()
                            handleVote(false,annotation.id)}}>
                                Downvote
                        </button></span><br></br>

                        {(annotation.user_id === sessionUser.id) && (
                        <>
                        <div style={{display:"flex",alignItems:"center",justifyContent:'center'}}>

                        {annotation.user_id ===sessionUser.id && 
                        (<>
                        <button style={{display:"inline",margin:"5px",borderRadius:"8px",backgroundColor:"#897CFF"}} onClick={(e) => {
                            e.preventDefault()
                            deleteThisAnnotation(annotation.id)
                        }}>Delete Annotation</button>
                        <button style={{display:"inline",margin:"5px",borderRadius:"8px",backgroundColor:"#897CFF"}} onClick={(e) => {
                            e.preventDefault()
                            setShowForm(!showForm)
}}>Edit Annotation</button></>)}
                    </div>
                    {showForm && (
                        <AnnotationForm existingAnnotation={annotation} message={"Edit Annotation"} type={"edit"}/>)}
                        </>
                        )
                    }
                        </>
                    )
                })}
                {!showForm && (
                <AnnotationForm message={"Add Annotation"}onSubmit={async (e,line,annotation) => {
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
        dispatch(annotationActions.giveAnnotation(newAnnotation.Annotations))
        dispatch(lineActions.giveLine(newAnnotation))
    }}/>)}
            </div>
)
} else {
    return (
      <div className="no-annotations">
        <p style={{textAlign:"center"}}><big>Can you explain this line?</big> <br />Annotate This Snippet.</p>
        <big><pre><div className={"line-number-annotation"}>{line.number + 1}<code>{" " + line.line_text}</code></div></pre></big>
        <AnnotationForm onSubmit={async (e,line,annotation) => {
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
        console.log(newAnnotation)
        console.log("annotations",newAnnotation.Annotations)
        // const {Line} = newAnnotation
        // console.log(Line)
        dispatch(annotationActions.giveAnnotation(newAnnotation.Annotations))
        dispatch(lineActions.giveLine(newAnnotation))
    }}/>
      </div>
    );
  }
}
