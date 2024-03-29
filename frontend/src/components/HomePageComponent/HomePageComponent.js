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
        top:"5px",
        height:"30px"
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
    backgroundColor: "#892CDC"

}

    return (
              <>
              <div id="wrapper">
                <section id="one" class="wrapper  spotlights">
                <Table striped bordered hover variant="dark" style={{position:"relative",top:"10px",height:"100%", width:"100%"}}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Snippet</th>
                            <th style={thStyle}>User</th>
                            <th style={thStyle}># of Annotations</th>
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
                </section>
             </div>
            </>
            
    )
}