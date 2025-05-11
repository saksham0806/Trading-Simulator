import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';


function App() {

    return (
    
        <Router>
            <Routes>
                <Route path='/' element = {<Home/>}/>
                <Route path='/dash' element = {<Dashboard/>}/>
                <Route path='/stock/:slug' element = {<Stock/>}/>
            </Routes>
        </Router>
  );
}

export default App
