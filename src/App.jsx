import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Dashboard from './pages/Dashboard';


function App() {

    return (
    
        <Router>
            <Routes>
                <Route path='/' element = {<Home/>}/>
                <Route path='/dash' element = {<Dashboard/>}/>
                {/* <Route path='/stock/:slug' element = {<Dashboard/>}/> */}
            </Routes>
        </Router>
  );
}

export default App
