import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login/Login';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Layout from "./pages/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Browse from './pages/Browse';
import Signup from "./pages/login/Signup";
import CreateJob from "./pages/job/CreateJob";
import JobDetail from './pages/job/JobDetail';


export default function App() {
    const [user, setuser] = useState({ pseudo: "pseudo", id: "", isLogged: false });
    const [updateUser, setupdateUser] = useState(0);

    useEffect(() => {
        fetch('/api/utilisateur').then(res => res.json()).then(data => {
            setuser(data);
        });
    }, [updateUser]);

    function doUpdateUser() {
        setupdateUser(updateUser + 1);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout user={user} updateUser={doUpdateUser} />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login updateUser={doUpdateUser} />} />
                    <Route path="signup" element={<Signup updateUser={doUpdateUser} />} />
                    <Route path="explorer" element={<Browse />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="job/create-job" element={<CreateJob user={user} />} />
                    <Route path="job/:id" element={<JobDetail user={user} />} />
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
