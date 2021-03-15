import React, { useEffect, useState } from 'react';
import SnippetCode from './SnippetCode';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import SnippetForm from '../SnippetFormPage/SnippetForm';


export default function SnippetPage() {
    const snippet = useSelector((state) => state.snippet.snippet);
    const user = useSelector((state => state.session.user.id))
    const history = useHistory()
    const deleteSnippet = async (e) => {
        e.preventDefault()
        await fetch(`/api/snippets/${snippet.id}`,{method:"DELETE"})
        history.push(`/home`)
    }
   if (snippet) {
        return (
            <div>
                <h2 className="snippet-title" style={{textAlign:"center"}}>Snippet Title: {snippet.title}</h2>
                <h3 style={{textAlign:"center"}}>Click On A Line To See Annotations</h3>
            <div style={{justifyContent:"center", display:"flex"}}>
            <div className="snippet-component" style={{alignSelf:"center",paddingLeft:"180px"}}>
            <SnippetCode lines={snippet.Lines} />
        </div>
        {user === snippet.user_id && (
            <div style={{display:"flex",alignItems:"flex-end"}}>
            <button style={{height:"78px",padding:"20px",borderRadius:"10px",marginLeft:"20px",marginBottom:"10px",backgroundColor:"#897CFF"}}onClick={(e) => deleteSnippet(e)}>Delete Snippet</button>
            </div>
        )}</div>
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