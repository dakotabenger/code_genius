import React, { useEffect, useState } from 'react';
import SnippetCode from './SnippetCode';
import {useDispatch, useSelector} from 'react-redux'


export default function SnippetPage() {
    const snippet = useSelector((state) => state.snippet.snippet);
    
    
   if (snippet) {
        return (
        <div className="snippet-component">
            <h1 className="snippet-title">{snippet.title}</h1>
            <SnippetCode lines={snippet.Lines} />
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