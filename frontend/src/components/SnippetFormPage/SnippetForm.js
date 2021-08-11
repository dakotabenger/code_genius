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
         <div style={{textAlign:"center",justifySelf:"center",alignSelf:'center'}}>
                <label style={{textAlign:"center",marginTop:"33px",paddingRight:"20px",width:"100%"}}htmlFor="title">Enter A Title For Your Snippet:</label>
                <input style={{width:"50%",textAlign:"center",display:"flex",alignItems:"center",float:"inline-end",margin:"auto"}} name="title" value={title} type="text" onChange={e => setTitle(e.target.value)}/>
        </div>
        <form style={{height:"100%",display:"flex"}}>
           
            <div style={{height:"100%",paddingLeft:"20px", marginTop:"30px"}}>
                <h3 style={{textAlign:"center",}}>Enter Code Below:</h3>
                <Editor value={code}  onValueChange={code => setCode(code)} highlight={code => highlight(code,languages.js)} padding={12} style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                backgroundColor: "grey",
                color:"red",
                height: "500px",
                border: "45px solid black",
                borderRadius: "8%",
                overflow:"scroll",
                width:"100%"
                }}
                />
            </div>
            <div style={{display:"flex",alignSelf:"flex-end"}}>
            <button style={{height:"70px",justifyContent:"center",borderRadius:"8%",padding:"10px",marginLeft:"20px",backgroundColor:"#897CFF"}}> Create Snippet </button>
            </div>
        </form>

        </>
    )
}