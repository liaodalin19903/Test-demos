import React, { useContext } from 'react'

import { ThemeContext } from '../../App'

export default function TestComp2() {

  const themeContext = useContext(ThemeContext)

  return (
    <>
      <div>TestComp2</div>
      {themeContext.theme}
    </>
  )
}
