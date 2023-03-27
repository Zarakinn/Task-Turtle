import {useEffect, useState} from "react";

function Login() {


    const [currentTime, setCurrentTime] = useState("server unavailable");

    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    }, []);


    return (
        <div>
            <h1>Login </h1>
            <p> Current time is <i>{currentTime}</i></p>
        </div>
    );
}


export default Login;
