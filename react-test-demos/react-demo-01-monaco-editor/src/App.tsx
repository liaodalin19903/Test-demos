import React from 'react';
import logo from './logo.svg';
import './App.css';

import MonacoEditor, { monaco } from 'react-monaco-editor';
import { useRef, useState,useEffect }  from 'react';

function App() {

  const editorRef = useRef(null);
  //const monacoRef = useRef(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef = useRef([]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Add an event listener for cursor position changes
    editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection();
      // if (selection.isEmpty()) {
      //   // Remove decorations if selection is empty
      //   editor.deltaDecorations(decorationsRef.current, []);
      //   return;
      // }
      
      const lineNumber = selection.positionLineNumber;
      const lineContent = editor.getModel().getLineContent(lineNumber);

      if (lineContent !== "") {
        // Add decoration if the line starts with 'var'
        const newDecorations = editor.deltaDecorations(decorationsRef.current, [
          {
            range: new monaco.Range(lineNumber, 1, lineNumber, 1),
            options: {
              isWholeLine: true,
              afterContentClassName: 'myAfterContentDecoration'
            }
          }
        ]);
        decorationsRef.current = newDecorations;
      } else {
        // Remove decorations if the line does not start with 'var'
        editor.deltaDecorations(decorationsRef.current, []);
      }
    });
  };
  useEffect(() => {
    // Define custom styles for the decorations
    const style = document.createElement('style');
    style.innerHTML = `
      .myAfterContentDecoration::after {
        content: ' // 备注';
        color: green;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const clickButton = () => {
    if(monacoRef.current) {
      console.log(monacoRef.current.getModel())
    }

  }


  return (
    <div style={{'margin':'100px auto', 'width': '800px'}}>
    <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={"112233"}
        editorDidMount={handleEditorDidMount}
      />

      <button onClick={clickButton}>点击</button>
    </div>
  );
}

export default App;
