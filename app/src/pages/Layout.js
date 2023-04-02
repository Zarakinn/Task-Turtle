import {Outlet, Link} from "react-router-dom";
import {useEffect, useRef} from "react";

let year = new Date().getFullYear();

const Layout = (props) => {
    const logoutModal = useRef(null);

    const handleLogout = (event) => {
        event.preventDefault();

        fetch('/api/logout', {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    props.updateUser();
                    logoutModal.current.click();
                }
            });
    };


    return (
        <>
            <div className="navbar bg-primary ">
                <div className="navbar-start text-0.6xl divide-x divide-slate-700">
                    <ul className="menu menu-vertical lg:menu-horizontal bg-base-100 rounded-box
                    divide-x-0 lg:divide-x-2 divide-y-2 lg:divide-y-0 divide-primary">
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/explorer">Explorer</Link></li>
                        <li><Link to="/my-space">Mon espace</Link></li>
                    </ul>
                </div>
                <div className="navbar-center">
                    <a className=" normal-case btn btn-ghost mt-2.5 mb-1 font-extrabold tracking-tight text-3xl">Task
                        Turtle</a>
                </div>
                <div className="navbar-end">
                    {props.user.isLoggedIn ? (
                        <div className="btn" onClick={handleLogout}>Deconnexion de {props.user.pseudo}</div>
                    ) : (
                        <Link to="/login" className="btn">Connexion</Link>
                    )}
                </div>
            </div>

            <Outlet/>

            <footer className="footer footer-center p-4 bg-primary text-base-content fixed bottom-0 left-0">
                <div>
                    <p>Copyright © {year} - Tous droit reservé par Valentin Chanel et Nicolas Frache</p>
                </div>
            </footer>


            <input type="checkbox" id="logout_modal" ref={logoutModal} className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Déconnexion</h3>
                    <p className="py-4">Vous êtes maintenant déconnecté</p>
                    <div className="modal-action">
                        <label htmlFor="logout_modal" className="btn">Continuer</label>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Layout;
