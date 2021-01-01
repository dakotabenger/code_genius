import React, { useEffect, useState } from 'react';
import { fetch } from '../../store/csrf';
import SnippetFormPage from '../SnippetFormPage';
import { useParams } from "react-router-dom";
import Prism from "prismjs";
import './prism.css'
import SnippetCode from './SnippetCode';



export default function SnippetPage() {
    const { id } = useParams();
    const fetchCall = async (id) => {return await fetch(`/api/snippets/${id}`) }
    let [snippet,setSnippet] = useState(false);
    useEffect(() => {
        setSnippet(fetchCall(id))
      }, [fetchCall,id,snippet]);
    if (snippet) {
        return (
        <div>
            <h3>{snippet.titles}</h3>
            <SnippetCode lines={snippet.lines} />
        </div>
    )
    } else {
        return (
        <div>
            <h3>Uh Oh....</h3>
            <p>We can't seem to find this snippet!</p>
        </div>
        )    
}

}