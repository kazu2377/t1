import { useState } from 'react'
import './App.css'
import { Calculator } from './components/Calculator/Calculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h2>Calculator Demo</h2>
      <Calculator />
    </>
  )
}

export default App
