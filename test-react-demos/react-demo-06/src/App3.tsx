import React from 'react'
import _ from 'lodash'
export default function App3() {

  const throttledClick = _.throttle(() => {
    console.log('Button clicked!');
  }, 5000)

  const handleClick = () => {
    throttledClick();
  };

  return (
    <div>
      <button onClick={handleClick}>点击</button>

    </div>
  )
}
