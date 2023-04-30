import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Badge from '../Badge';
import {Link} from "react-router-dom";

function JobDetail(props) {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    const [poster,setPoster] = useState(null);

    useEffect(() => {
        if (job != null)
            fetch('/api/utilisateur/'.concat(job.idUtilisateurPoster)).then(res => res.json()).then(data => {
                setPoster(data);
            });
    },[job]);

    useEffect(() => {
        fetch('/api/job/'.concat(id)).then(res => res.json()).then(data => {
            setJob(data);
        });
    }, []);

    return (
        <div>{job != null ?
            <div className="rounded-lg shadow bg-white py-8 px-4 mx-auto max-w-2xl lg:_py-16 mt-10 mb-20">
                <div className="grid place-items-center">
                    <div className="mb-4 text-xl font-bold text-gray-900">Détails du job : {job.title}</div>
                </div>
                <div className="w-full flex flex-row p-2 gap-x-2">
                    {job.tags === "" ? null :
                        (job.tags).split(",").map((tag,index) => (
                            <Badge key={index} badge={tag} />
                        ))
                    }
                </div>
                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 py-4">
                    <div className="w-full">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Récompense : <span className="text-gray-600">{job.price}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Lieu : <span className="text-gray-600">{job.locality}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Posteur : <span className="text-gray-600">{poster != null ? poster.pseudo : "loading"}</span>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="block mb-2 text-sm font-medium text-gray-900">
                            Description : <span className="text-gray-600">{job.textDescription}</span>
                        </div>
                    </div>
                </div>
                <div className="grid place-items-center">
                    <Link to="/" className="btn">Proposer vos services</Link>
                </div>
            </div> : <div className="grid h-screen place-items-center"><div className='dot-spin'></div></div>
        }
        </div>
    )
}

export default JobDetail