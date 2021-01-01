import React, { Suspense, useState } from 'react';
// import Prism from "prismjs";
import "./prism.css"
import { useSelector } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { fetch } from '../../store/csrf';
import { useHistory } from 'react-router-dom';


export default function SnippetForm() {
    const [title,setTitle] = useState("")
    const [code,setCode] = useState("")
    const user = useSelector((state) => state.session.user);
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
    //    history.push(`/snipppet/${res.data.newSnippet.id}`)
        const snippet = await fetch(`/api/snippets/${res.data.newSnippet.id}`)
        console.log(snippet)
    }   
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="title">Snippet Title:</label>
                <input name="title" value={title} type="text" onChange={e => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Code Snippet:</label>
                <Editor value={code} onValueChange={code => setCode(code)} highlight={code => highlight(code,languages.js)} padding={12} style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                backgroundColor:"grey",
                }}
                />
            </div>
            <button> Create Code Snippet </button>
        </form>
    )
}