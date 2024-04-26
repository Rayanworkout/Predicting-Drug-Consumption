import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import Router from "@/router/router.jsx";
import Header from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
        <Header/>
        <Router/>
        <Footer/>
  </React.StrictMode>,
);
