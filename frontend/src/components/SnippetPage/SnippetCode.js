import React, { useState } from 'react';
import Prism from "prismjs";
import "./prism.css"
import { useSelector } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { fetch } from '../../store/csrf';
import { useHistory } from 'react-router-dom';

export default function SnippetCode({lines}) {

    if (lines) {
        return (
            <div>
                <pre>
                <code className="language-javascript">
                    {lines.map((line) => {
                        return (
                            <span id={line.id} onClick={(e) => {}}>{line.lineText}</span>
                        )
                    })}
                </code>
            </pre>
            </div>
        )
    } else {
        return (
            <div>
                <p>We couldn't find that Snippet</p>
            </div>
        )
    }
}