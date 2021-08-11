import React, { useState } from 'react';
// import Prism from "prismjs";
import "./prism.css"
import { useDispatch} from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { fetch } from '../../store/csrf';
import { useHistory } from 'react-router-dom';
import * as snippetActions from '../../store/snippet'

export default function SnippetForm() {
    const dispatch = useDispatch()
    const [title,setTitle] = useState("")
    const [code,setCode] = useState("")
    const history = useHistory()
    const onSubmit = async (e) => {
        e.preventDefault()
        const linesArr = code.split(/\r?\n/)
        const lines = linesArr.map((line,number) => {
            return {lineText:line,number}
        })
        const reqBody = {title,lines}
        const res = await fetch(`/api/snippets`, {
            method: "POST",
            body: JSON.stringify(reqBody),
        });
        // const json = await res.json()
        console.log(res)
        dispatch(snippetActions.giveSnippet(res.data.snippet))
        
       history.push(`/snippet/`)
        
    }   
    const clearClick = (e) => {
        e.preventDefault()
        setCode("")
    }
    return (
        <>
         <div className="inner "style={{textAlign:"center",justifySelf:"center",alignSelf:'center'}}>
                <label style={{textAlign:"center",marginTop:"33px",paddingRight:"1%",width:"100%"}}htmlFor="title">Enter A Title For Your Snippet:</label>
                <input style={{width:"50%",textAlign:"center",display:"flex",alignItems:"center",float:"inline-end",margin:"auto", backgroundColor:"whitesmoke"}} name="title" value={title} type="text" onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="form-div" style={{display:"flex", alignContent:"center",justifyContent:"center",paddingLeft:"10%",flexWrap:"wrap",flexDirection:"column"}}>

        <form style={{height:"100%",display:"flex",alignSelf:"center",flexWrap:"wrap",flexDirection:"row",flexBasis:"1 1 40px"}}>
            <div style={{height:"100%",paddingLeft:"20px", marginTop:"30px"}}>
                <h3 style={{textAlign:"center",}}>Enter Code Below:</h3>
                <Editor value={code}  onValueChange={code => setCode(code)} highlight={code => highlight(code,languages.js)} padding={12} style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                backgroundColor: "grey",
                color:"red",
                height: "60vh",
                width:"60vw",
                minHeight: "60vh",
                minWidth:"60vw",
                border: "4px solid black",
                borderRadius: "",
                overflow:"scroll",
                }}
                />
            </div>
            <div style={{width:"100%"}}></div>
            <div style={{display:"flex",alignSelf:"flex-end",justifyContent:"center",paddingLeft:"35%",margin:"8px" }}>
            <button style={{height:"60px",justifyItems:"center",borderRadius:"8%",backgroundColor:"#897CFF",width:"140px",   flexBasis: "10px",letterSpacing:"0",padding:"0px", padding: "8px",alignItems:
            "center"
 
}}> Create Snippet </button><br></br>
            </div>
        </form>
        </div>


        </>
    )
}