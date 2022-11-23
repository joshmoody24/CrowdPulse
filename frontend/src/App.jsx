import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
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
        <div style={{ display: "contents" }}>
          
          <div>
            <Link to="/"><img src={ logo } style={{ height:104 }} ></img></Link>
          </div>
          <div>
            <Link to="/">Home</Link>
            <Link style={{marginLeft:"1rem"}} to="/request-song">Request</Link>
          </div>
          <div>
            <Link to="/"><h1>CROWDPULSE</h1></Link>
          </div>
        </div>
        <div></div>
      </nav>
      <div className="page-content">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
