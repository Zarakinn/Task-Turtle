import React from 'react'

const Badge = ({ badge }) => {

    return (
        <div>
            <div className={'badge badg-${badge.color} badge-outline'}>{badge.text}</div>
        </div>
    )
}

export default Badge