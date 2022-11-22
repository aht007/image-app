import React from 'react';
import Header from '../src/components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Auth from './components/Auth'
import './App.css'

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <>
                    <Routes>
                        <Route exact path="/auth" element={<Auth/>} />
                        <Route exact path="/home" />
                        <Route exact path='signup' />
                    </Routes>
                </>
            </BrowserRouter>
        </div>
    );
}

export default App;