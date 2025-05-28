import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import Login from './pages/Login'
import Register from './pages/Register';


function App() {

    return (
    
        <Router>
            <Routes>
                <Route path='/' element = {<Home/>}/>
                <Route path='/dash' element = {<Dashboard/>}/>
                <Route path='/stock/:slug' element = {<Stock/>}/>
                <Route path='/login' element = {<Login/>}/>
                <Route path='/register' element = {<Register/>}/>
            </Routes>
        </Router>
  );
}

export default App
