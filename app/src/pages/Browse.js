import { useEffect, useState } from "react";
import Card from './Card'

const Browse = () => {

    const [jobs, setJobs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (jobs != null) {
            loadJobs();
        }
    }, []);

    const loadJobs = () => {
        setIsLoading(true);
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => {
                console.log(data.jobs);
                setJobs(data.jobs);
                setIsLoading(false);
            });

    }

    return (
        <div style={{ margin: 10, padding: 10 }}>
            {isLoading ?
                <div>
                    Loading ....
                </div> :

                <div className="grid grid-cols-4 gap-4">
                    {jobs.map((job, index) => (
                        <Card key={index} props={job} />
                    ))}
                </div>
            }
        </div>

    )
}



export default Browse