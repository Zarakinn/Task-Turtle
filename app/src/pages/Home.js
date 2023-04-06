import React, {useState, useEffect} from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Link} from "react-router-dom";

function Home() {

    return (
        <div>
            <Link className="btn" to="/job/create-job">J'ajoute ma tâche sur l'application</Link>
        </div>
    );
}

export default Home;
