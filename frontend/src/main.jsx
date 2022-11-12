import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SongRequest from "./pages/SongRequest"
import "./index.css"

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  //StrictMode causes components to be rendered twice in dev
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          {/* pages routes go here */}
          <Route path="/" element={<Home/>} />
          <Route path="/request-song" element={<SongRequest/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);