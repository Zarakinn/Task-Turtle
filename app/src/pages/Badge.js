import React from 'react'

const Badge = ({ badge }) => {

    return (
        <div>
            <div className={'badge badge-outline'}>{badge}</div>
        </div>
    )
}

export default Badge