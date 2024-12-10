import React, { createContext, useEffect } from 'react';

import './App.css';

import TestComp2 from './components/TestComp2';


// ---

interface ThemeProps {
  theme: string | undefined
}

export const ThemeContext = React.createContext<ThemeProps>({
  theme: undefined
});


function App() {

  return (
    <ThemeContext.Provider value={{theme: 'light'}}>
      <TestComp2></TestComp2>
    </ThemeContext.Provider>
  );
}

export default App;
