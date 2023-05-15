import React, { useState, useEffect } from 'react'
import JobLinePosted from './JobLinePosted';
import JobLineAccepted from './JobLineAccepted';


function MySpace(props) {

    const [jobPosted, setJobPosted] = useState([]);
    const [jobAccepted, setJobAccepted] = useState([]);

    useEffect(() => {
        if (jobPosted !== [])
            fetch('/api/myjobs').then(res => res.json()).then(data => {
                setJobPosted(data.jobs);
            });
    }, []);

    useEffect(() => {
        if (jobAccepted !== [])
            fetch('/api/jobsaccepted').then(res => res.json()).then(data => {
                setJobAccepted(data.jobs);
                console.log(data);
            });
    }, []);

    return (
        <div className="flex w-full py-8 px-4 mx-auto">
            <div className="grid flex-grow card bg-base-300 rounded-box place-items-left px-4 py-4">
                <table className="table w-full">
                    <thead>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Tag</th>
                        <th>Prix</th>
                        <th>Lieu</th>
                        <th>Statut</th>
                        <th></th>
                    </thead>

                    <tbody>
                        {jobPosted === [] ? null :
                            jobPosted.map(job => (
                                <JobLinePosted user={props.user} job={job}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="grid flex-grow card bg-base-300 rounded-box place-items-left px-4 py-4">
                <table className="table w-full">
                    <thead>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Tag</th>
                        <th>Prix</th>
                        <th>Lieu</th>
                        <th>Statut</th>
                        <th></th>
                    </thead>

                    <tbody>
                        {jobAccepted === [] ? null :
                            jobAccepted.map(job => (
                                <JobLineAccepted user={props.user} job={job}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MySpace