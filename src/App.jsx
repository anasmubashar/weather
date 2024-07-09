import { useState } from 'react'
import React from 'react'
import Weather from './weather.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Weather />
    </>
  )
}

export default App
