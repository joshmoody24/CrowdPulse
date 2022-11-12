import { useState } from 'react'
import './App.css'
import {Outlet, Link} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* temp inline styles */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Link to="/"><h1>CrowdPulse</h1></Link>
        <div>
          <Link to="/">Home</Link>
          <Link style={{marginLeft:"1rem"}} to="/request-song">Request Song</Link>
        </div>
      </nav>
      <div className="page-content">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
