import React from 'react'
import Badge from './Badge'

const Card = ({ id, name, job, badges }) => {
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{job}</h2>
                <p>{name} veux que quelqu'un l'aide à {job}</p>
                {
                    badges.map((badge) => (<Badge badge={badge}/>))
                }
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Détails</button>
                </div>
            </div>
        </div>
    )
}

export default Card