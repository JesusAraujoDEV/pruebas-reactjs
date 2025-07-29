import { useState } from 'react'
import './App.css'
import StaticComponent from './components/StaticComponent/StaticComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StaticComponent />
    </>
  )
}

export default App
