import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useState, useCallback, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";

function App() {

  const [value, setValue] = useState("");

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(); // 编辑器实例
  const monacoRef = useRef<typeof monaco>(); // monaco 实例
  
  // 获取编辑器实例
  const editorDidMountHandle = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor, monacoIns: typeof monaco) => {
      editorRef.current = editor;
      monacoRef.current = monacoIns;
    },[]);

  const clickButton = () => {
    if(monacoRef.current) {
      console.log(monacoRef.current.editor.getModel)
    }

  }


  return (
    <div style={{'margin':'100px auto', 'width': '800px'}}>
    <MonacoEditor
      width="800"
      height="400"
      language="javascript"
      theme="vs-dark"
      value={value}
      onChange={setValue}
      options={{
        roundedSelection: false,
        cursorStyle: "line",
        wordWrap: "on",
      }}
      editorDidMount={editorDidMountHandle}
    />

      <button onClick={clickButton}>点击</button>
    </div>
  );
}

export default App;
