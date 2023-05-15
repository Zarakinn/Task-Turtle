import React from 'react'

function JobLineAccepted(props) {

    var buttonMsg = "";
    var state = "";
    var fun = () => {};

    const handleFinish = (event) => {
        event.preventDefault();
        console.log(props);
       
        let route = '/api/finishJob/' + props.job.idJob.toString();
        fetch(route, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    
                }
            });
    };

    switch (props.job.currentState) {
        case 1:
            buttonMsg = "Terminer le job.";
            fun = handleFinish;
            state = "Job  accepté, en cours.";
            break;
        case 2:
            state = "Job terminé, en attente de payement.";
            break;
        case 3:
            state = "Job terminé et payé.";
            break;
        default:
            console.log(props.job.currentState)
            buttonMsg = "erreur, état non reconnu";
            state = "erreur, état non reconnu";
            break;
    }

    return (
        <tr key={props.job.id}>
            <td>{props.job.title}</td>
            <td>{props.job.textDescription}</td>
            <td>{props.job.tags}</td>
            <td>{props.job.price}</td>
            <td>{props.job.locality}</td>
            <td>{state}</td>
            <button onClick={fun} >
                {buttonMsg}
            </button>
        </tr>
    )
}

export default JobLineAccepted