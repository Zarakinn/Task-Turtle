import React, { useState, useEffect } from 'react'
//import Badge from './Badge'
import { Link } from "react-router-dom";

function Card(props) {

    const [poster, setPoster] = useState({});

    useEffect(() => {
        fetch('/api/utilisateur/'.concat(props.props.idUtilisateurPoster)).then(res => res.json()).then(data => {
            setPoster(data);
        });
    }, []);

    return (
        <div className="w-96 m-3 bg-base-100 shadow-xl p-4">
            <div className="card-body">
                <h2 className="card-title">{props.props.title}</h2>
                <p>{props.props.textDescription}</p>

                <div className='container-card-user'>
                    <div className='container-card-user-child'>Posté par :</div>
                    {poster != null ?
                        <div className='container-card-user-child'>{poster.pseudo}</div>
                        : <div className='container-card-user-child'><div className='dot-spin'></div></div>}
                </div>
                <div className="card-actions justify-end">
                    <Link className="btn btn-primary" to={`/job/${props.props.idJob}`}>Détails</Link>
                </div>
            </div>
        </div>
    )
}

export default Card