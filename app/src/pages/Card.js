import React,{useState, useEffect} from 'react'
import Badge from './Badge'

function Card (props) {
    
    const [poster,setPoster] = useState({});

    useEffect(() => {
        fetch('/api/utilisateur/'.concat(props.props.idUtilisateurPoster)).then(res => res.json()).then(data => {
            setPoster(data);
        });
    },[]);

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{props.props.title}</h2>
                <p>{props.props.textDescription}</p>

                <div className='container-card-user'>
                    <div className='container-card-user-child'>Poster par :</div> 
                    {poster != null? 
                    <div className='container-card-user-child'>{poster.pseudo}</div>
                    :<div className='container-card-user-child'><div className='dot-spin'></div></div> }
                </div>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Détails</button>
                </div>
            </div>
        </div>
    )
}

export default Card