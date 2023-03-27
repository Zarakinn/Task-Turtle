import React, {useState, useEffect} from 'react';
import logo from '../logo.svg';
import '../App.css';

function Home() {


    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        fetch('/api/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    }, []);


    return (
        <div>
            <header>

                <p>The current time is {currentTime}.</p>
            </header>
            <div className="text-3xl font-bold underline">
                <h1></h1>
            </div>
        </div>
    );
}

export default Home;
