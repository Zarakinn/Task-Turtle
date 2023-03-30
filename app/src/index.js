import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Layout from "./pages/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Browse from './pages/Browse';


export default function App() {
    const [user, setuser] = useState({pseudo: "", id: "", isLogged: false});

    useEffect(() => {
        fetch('/api/utilisateur').then(res => res.json()).then(data => {
            setuser(data);
        });
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout user={user}/>}>
                    <Route index element={<Home/>} />
                    <Route path="login" element={<Login />} />
                    <Route path="explorer" element={<Browse/>}/>
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
