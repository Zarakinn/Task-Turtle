import {useRef, useState} from "react";
import {Link} from "react-router-dom";

function CreateJob(props) {
    const [formData, setFormData] = useState({categorie: 'DEFAULT'});
    const [catError, setCatError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const successModalRef = useRef(null);
    const errorModalRef = useRef(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);

        if(formData.categorie === 'DEFAULT'){
            setCatError('Veuillez choisir une catégorie');
            return;
        }

        fetch('/api/create-job', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    setSubmitError(data.message)
                    errorModalRef.current.click();
                } else {
                    successModalRef.current.click();
                    props.updateUser();
                }
            });


    }

    return (
        <div className="rounded-lg shadow bg-white py-8 px-4 mx-auto max-w-2xl lg:_py-16 mt-10 mb-20">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Ajouter une nouvelle tâche</h2>
            <form action="#" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Titre de la tâche</label>
                        <input type="text" placeholder="Tondre ma pelouse" id="titre" name="titre" onChange={handleChange}
                               className="rounded-lg bg-gray-50 input input-bordered input-primary w-full" required/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Commune</label>
                        <input type="text" placeholder="Nancy" id="commune" name="commune" onChange={handleChange} required
                               className="rounded-lg input-sm bg-gray-50 input input-bordered input-primary w-full p-2.5 h-10"/>

                    </div>
                    <div className="w-full">
                        <label htmlFor="price"
                               className="block mb-2 text-sm font-medium text-gray-900">Prix</label>
                        <input type="number" name="prix" id="prix"
                               className="bg-gray-50 border border-primary text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                               placeholder="50" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="category"
                               className="block mb-2 text-sm font-medium text-gray-900">Catégorie</label>
                        <select id="categorie" name="categorie"  className="bg-gray-50 select select-primary w-full rounded-lg select-sm max-w-xs text-gray-900 h-10"
                                onChange={handleChange} defaultValue={'DEFAULT'} required>
                            <option value="DEFAULT">Choisir une catégorie</option>
                            <option value="BR">Bricolage</option>
                            <option value="JA">Jardinage</option>
                            <option value="DE">Déménagement</option>
                            <option value="PE">Peinture</option>
                            <option value="AU">Autre</option>
                        </select>
                        <div className="block mb-2 text-sm font-medium text-red-600">{catError}</div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea rows="8" className=" rounded-lg bg-gray-50 textarea textarea-primary w-full mt-2.5 block" required
                                  placeholder="Description détaillée de la tâche" id="description" name="description" onChange={handleChange}/>
                    </div>
                </div>
                <button type="submit" className="mt-5 btn btn-primary">Ajouter la tâche</button>
            </form>

            <input type="checkbox" id="success-modal" ref={successModalRef} className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Réussite de la connexion</h3>
                    <p className="py-4">Vous pouvez maintenant profiter des fonctionnalités de l'application</p>
                    <div className="modal-action">
                        <Link to="/" className="btn">Continuer</Link>
                    </div>
                </div>
            </div>


            <input type="checkbox" id="error-modal" ref={errorModalRef} className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Erreur</h3>
                    <p className="py-4">Erreur: {submitError}</p>
                    <div className="modal-action">
                        <label htmlFor="error-modal" className="btn">Continuer</label>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CreateJob