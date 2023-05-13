import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {


    const [formData, setFormData] = useState({ pseudo: '', password: '' });
    const [error, setError] = useState('');
    const successModalRef = useRef(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSignup = (event) => {
        event.preventDefault();

        // Envoi de la requête AJAX pour récupérer la réponse à partir du backend
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    setError(data.message);
                } else {
                    props.updateUser();
                    successModalRef.current.click();
                }
            });
    };


    return (
        <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-20">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Connexion à votre compte
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="src/pages" method="post" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="pseudo"
                                className="block mb-2 text-sm font-medium text-gray-900 ">Pseudo</label>
                            <input type="pseudo" name="pseudo" id="pseudo"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                placeholder="pseudo" required=""
                                onChange={handleChange} value={formData.pseudo} />
                        </div>
                        <div>
                            <label htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required="" onChange={handleChange} value={formData.password} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                        required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500">Rester connecté</label>
                                </div>
                            </div>
                            <a href="/tant-pis-pour-toi" className="text-sm font-medium text-primary-600 hover:underline">Mot de passe
                                oublié</a>
                        </div>
                        <div className="block mb-2 text-sm font-medium text-red-600">{error}</div>
                        <button type="submit"
                            className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Se
                            connecter
                        </button>
                        <p className="text-sm font-light text-gray-500">
                            Pas encore de compte ? <Link to="/signup"
                                className="font-medium text-primary-600 hover:underline">Inscription</Link>
                        </p>
                    </form>
                </div>
            </div>

            <input type="checkbox" id="success-modal" ref={successModalRef} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Réussite de la connexion</h3>
                    <p className="py-4">Vous pouvez maintenant profiter des fonctionnalités de l'application</p>
                    <div className="modal-action">
                        <Link to="/" className="btn">Continuer</Link>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Login;
