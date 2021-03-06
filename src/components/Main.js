import React, { useState } from "react"
import Editor from "./Editor"
import Display from "./Display"

const url = "http://localhost:3000/projects"

function Main({ darkMode }){
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [js, setJs] = useState("")

const srcDoc = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
    </html>
    `

function handleSave(html, css, js){
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({html, css, js}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
  }

return (
    <div className="main-container">
        <button className="save-button" onClick={() => handleSave(html, css, js)}>
        Save
        </button>
        <div className="editor-panel">
        <Editor 
            mode="xml"
            language="HTML"
            value={html}
            onChange={setHtml}
            darkMode={darkMode}
        />
        <Editor 
            mode="css"
            language="CSS"
            value={css}
            onChange={setCss}
            darkMode={darkMode}
        />
        <Editor 
            mode="javascript"
            language="JAVASCRIPT"
            value={js}
            onChange={setJs}
            darkMode={darkMode}
        />
        </div>
        <div className="display-panel">
        <Display
            srcDoc={srcDoc}
        />
        </div>
    </div>
    )
}

export default Main