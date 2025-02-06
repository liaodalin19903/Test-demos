import React from 'react';
import ReactFrameComponent from 'react-frame-component';

export default function App() {
  //const url = 'https://www.notion.so/markleo/TypeScript-14adeaa8cb4b80bf94bed5dcdb4f977c'; 

  //const url = 'https://www.notion.so/markleo/page-01-182deaa8cb4b80aa98b7dd9769a6df02'

  const url = 'https://markleo.notion.site/page-01-182deaa8cb4b80aa98b7dd9769a6df02'
  return (
    <>
      <iframe src={url} title='001'></iframe>
    </>
  );
}