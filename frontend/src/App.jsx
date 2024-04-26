import './assets/index.css'
import Home from './view/Home';
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './view/Dashboard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='statistics' element={<Dashboard/>}/>
                    </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )

}

export default App
