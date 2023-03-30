import {Outlet, Link} from "react-router-dom";

let year = new Date().getFullYear();

const Layout = () => {
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
                    <Link to="/login" className="btn">Se connecter</Link>
                </div>
            </div>

            <Outlet/>

            <footer className="footer footer-center p-4 bg-primary text-base-content fixed bottom-0 left-0">
                <div>
                    <p>Copyright © {year} - Tous droit reservé par Valentin Chanel et Nicolas Frache</p>
                </div>
            </footer>

            <input type="checkbox" id="ok_modal" className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use
                        Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Layout;
