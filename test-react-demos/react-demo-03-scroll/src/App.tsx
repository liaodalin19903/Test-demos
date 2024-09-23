import React from 'react';
import './App.css';

function App() {

  const scrollDiv3 = () => {

    const container = document.querySelector("#container")
    const div3: HTMLDivElement | null = document.querySelector("#div3")

    console.log(container, div3)
    if(container) {
      container.scrollTo({
        top: div3!.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  return (
   <>
   <div id="container" style={{ height: '600px', width: '400px', overflow: 'auto' }}>
  
      <div style={{ height: '300px', backgroundColor: 'antiquewhite' }}>
        div1
      </div>
      <div style={{ height: '300px', backgroundColor: 'red' }}>
        div2
      </div>
      <div id="div3" style={{ height: '300px',  backgroundColor: 'antiquewhite' }}>
        div3
      </div>
      <div style={{ height: '300px', backgroundColor: 'green' }}>
        div4
      </div>
    </div>

    <button onClick={scrollDiv3}>点击滚动</button>
   </> 
  )
}

export default App;
