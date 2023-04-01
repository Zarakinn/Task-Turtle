import React from 'react'
import Badge from './Badge'

function Card (props) {
    
    // TODO - Fetch certaines donné de l'utilisateur props.props.id

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{props.props.title}</h2>
                <p>{props.props.textDescription}</p>
                <p>Posté par utilisateur d'id : {props.props.idUtilisateurPoster}</p>
                {
                    props.props.tags.split(',').map((badge,index) => (<Badge key={index} badge={badge}/>))
                }
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Détails</button>
                </div>
            </div>
        </div>
    )
}

export default Card