import React, { useState } from 'react';

import { useDispatch} from 'react-redux';

import { fetch } from '../../store/csrf';
import { useHistory } from 'react-router-dom';
import * as snippetActions from '../../store/snippet'
import Table from 'react-bootstrap/Table'
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
    
    const tableStyle = {
        height: "180px",
        width: "100%",
        position:"relative",
        top:"10px"
    }
    
   

    const hThreeStyle = {
        textAlign:"center",
        position:"relative",
        top:"5px"
    }

    const thStyle = {
        width: "33%",
        textAlign:"center"
    }

    const tdStyle = {
        textAlign:"center",
        cursor:"pointer"
    }
const backgroundDivStyle = {
    backgroundColor: "#000000"
}

    return (
              <>
              <br>
              </br>
        
              <h5 style={hThreeStyle}>Code Snippets.</h5>
              <h6 style={hThreeStyle}>Click on any Snippet to see the code.</h6>
            <div> </div>
              <div style={backgroundDivStyle}>
                <Table striped bordered hover variant="dark" style={{position:"relative",top:"100px",height:"600px"}}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>User</th>
                            <th style={thStyle}>Annotations</th>
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
                                        <td style={tdStyle}>{snippet.title}</td>
                                        <td style={tdStyle}>{snippet.User.username}</td>
                                        <td style={tdStyle}>{snippet.Lines.reduce((numOfAnnotations,line)=> {
                                            console.log(line.Annotations.length)
                                            return numOfAnnotations += line.Annotations.length
                                        },0)}</td>
                                    </tr>
                                    
                                )
                            }))}
                    </tbody>

                </Table>        
            </div>
            </>
            
    )
}