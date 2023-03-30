import React from 'react'
import Card from './Card'

const Browse = () => {


    const datas = [{ id: 1, name: "Patrick", job: "Tondre", badges: [{ text: "jardinerie", color: "#ffffff" }] },
                    { id: 2, name: "Joséphine", job: "Ange gardien", badges: [{ text: "divin", color: "yellow" }, { text: "apéro", color: "red" }] }]

    return (
        <div style={{ margin: 10, padding: 10 }}>
            <div class="grid grid-cols-4 gap-4">
                {datas.map(data => (
                    <Card id={data.id} name={data.name} job={data.job} badges={data.badges} />
                ))}
            </div>
        </div>

    )
}



export default Browse