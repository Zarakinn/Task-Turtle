import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function JobDetail(props) {

    const { id } = useParams();

    const [job, setJob] = useState({});

    useEffect(() => {
        fetch('/api/job/'.concat(id)).then(res => res.json()).then(data => {
            setJob(data);
            console.log(data);
        });
    }, []);

    return (
        <div>
            <div>JobDetail : {id}</div>
            { job != null ?
            <div>{job.textDescription}</div>
            :<div className='dot-spin'></div>}
        </div>
    )
}

export default JobDetail