import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import {Outlet, Link} from "react-router-dom"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App2">
      <nav>
        <div className="display-contents">
          <div className="empty-width-left"></div>
          <div className="logo-container">
            {/* .logo-container img {} for logo styling */}
            <Link to="/"><img src={ logo } ></img></Link>
          </div>
          <div className="crowdpulse-navlinks">
            <div className="crowdpulse-container">
              <Link to="/"><h1>CROWDPULSE</h1></Link>
            </div>
            <div className="navlinks-container">
              <Link to="/">Home</Link>
              <Link to="/request-song">Request</Link>
              <Link to="/">Vote</Link>
            </div>
          </div>
          <div className="empty-width-right"></div>
        </div>
      </nav>
      <div className="page-content">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App

{/*
<div className="App">
      {/* temp inline styles */} /*
      <nav>
      <div style={{ display: "contents" }}>
        <div className='logo'>
          <Link to="/"><img src={ logo } ></img></Link>
        </div>
        <div className='for-phone'>
          <div className='nav-links'>
            <Link to="/">Home</Link>
            <Link style={{marginLeft:"1rem"}} to="/request-song">Request</Link>
            <Link style={{marginLeft:"1rem"}} to="/">Vote</Link>
          </div>
          <div className='crowdpulse'>
            <Link to="/"><h1>CROWDPULSE</h1></Link>
          </div>
        </div>
      </div>
      <div></div>
    </nav>
  <div className="page-content">
    <Outlet></Outlet>
  </div>
</div>}
*/