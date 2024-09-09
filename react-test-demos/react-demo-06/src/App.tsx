import React, { useEffect } from 'react';

import './App.css';

function App() {

  useEffect(() => {
    console.log(123456)
    console.log(window)
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
