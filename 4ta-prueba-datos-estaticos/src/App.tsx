import { useState } from 'react'
import './App.css'
import StaticComponent from './components/StaticComponent/StaticComponent'
import UserList from './components/UserList/UserList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-black text-white">
      <UserList />
    </div>
  )
}

export default App
