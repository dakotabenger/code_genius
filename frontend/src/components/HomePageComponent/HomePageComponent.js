import React, { useState } from 'react';

import { useDispatch} from 'react-redux';

import { fetch } from '../../store/csrf';
import { useHistory } from 'react-router-dom';
import * as snippetActions from '../../store/snippet'
import { useTable, usePagination } from 'react-table' 

export default function HomePageComponent() {
    const [snippets,setSnippets] = useState([])
    const dispatch = useDispatch();
    const history = useHistory()
    const getTenSnippets = async () => {
        const res = await fetch('/api/snippets')
        const {snippets} = res.data
        console.log(snippets)
        return setSnippets(snippets)
    }
    const setSnippetStore = async (snippet) => {
        
        const res = await fetch(`/api/snippets/${snippet.id}`)
            const {snippet:selectedSnippet} = res.data
           return dispatch(snippetActions.giveSnippet(selectedSnippet))
    
    }   


    if (snippets.length < 1) {
     (async () => { 
         console.log("inhere")
        await getTenSnippets()
    })()
}
    console.log(snippets)
    
    

     

    return (
              <>
                <table >
                    <thead>
                        <tr >
                            <th>Title</th>
                            <th>User</th>
                            <th>Annotations</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {snippets.length > 0 && (snippets.map(snippet => {
                                return (
                                    <tr onClick={(e) => {
                                        e.preventDefault()

                                        setSnippetStore(snippet)
                                        history.push("/snippet")
                                    }}>
                                        <td>{snippet.title}</td>
                                        <td>{snippet.User.username}</td>
                                        <td>{snippet.Lines.reduce((numOfAnnotations,line)=> {
                                            console.log(line.Annotations.length)
                                            return numOfAnnotations += line.Annotations.length
                                        },0)}</td>
                                    </tr>
                                    
                                )
                            }))}
                    </tbody>

                </table>        
            </>
    )
}