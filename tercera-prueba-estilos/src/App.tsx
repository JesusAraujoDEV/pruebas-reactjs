import { useState } from 'react'
import './App.css'
import Card from './components/Card/Card'
import Button from './components/Button/Button'
import TailwindText from './components/Text/Text'

function App() {

  return (
    <>
      <TailwindText />
      <Button >Click Me</Button>
      <Card />
    </>
  )
}

export default App
