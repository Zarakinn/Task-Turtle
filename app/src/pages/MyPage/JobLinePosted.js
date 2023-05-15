import React from 'react'

function JobLinePosted(props) {

    var buttonMsg = "";
    var state = "";
    var fun = () => {};

    const handleCancel = (event) => {
        event.preventDefault();
        console.log(props);
       
        let route = '/api/cancelJob/' + props.job.idJob.toString();
        fetch(route, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    
                }
            });
    };

    const handleConfirmation = (event) => {
        event.preventDefault();
        console.log(props);
       
        let route = '/api/confirmJob/' + props.job.idJob.toString();
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
        case 0:
            buttonMsg = "Annulation";
            fun = handleCancel;
            state = "Job posté.";
            break;
        case 1:
            buttonMsg = "Annulation";
            fun = handleCancel;
            state = "Job  accepté, en cours.";
            break;
        case 2:
            buttonMsg = "Confirmer et payer";
            fun = handleConfirmation
            state = "Job terminé.";
            break;
        case 3:
            buttonMsg = "Aucune action possible.";
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

export default JobLinePosted