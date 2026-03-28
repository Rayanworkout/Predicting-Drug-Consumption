import './assets/index.css'
import Home from './view/Home';
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Dashboard = lazy(() => import('./view/Dashboard'));
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    return (
        <div className = {`flex flex-col min-h-screen`}>
            <BrowserRouter>
                <NavBar/>
                <Suspense fallback={<div className="flex-grow flex items-center justify-center text-white">Loading...</div>}>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='statistics' element={<Dashboard/>}/>
                    </Routes>
                </Suspense>
                <Footer/>
            </BrowserRouter>
        </div>
    )

}

export default App
