import React, { useEffect } from 'react';

import './App.css';

import { UserProfileExample } from './components/ReactQueryExample'

function App() {

  useEffect(() => {
    console.log(123456)
    console.log(window)
  }, [])

  return (
    <div className="App">
      <UserProfileExample />
    </div>
  );
}

export default App;
