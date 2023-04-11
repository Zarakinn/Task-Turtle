import React, {useState, useEffect} from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import logo from '../assets/logo.png'

function Home() {

    return (
        <div className="text-center flex  items-stretch flex-col lg:flex-row h-[86vh] flex-auto ">
            <div className="grid rounded-box place-items-center w-1/2">
                <div className="hero-content text-center text-secondary-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Bienvenue !</h1>
                        <p className="mb-5 text-2xl">TaskTurtle est un site de petite annonces de services entre particuliers. Afin de garantir une sécurité
                            optimales lors des transactions, nous utilisons une technologie de blockchain pour réaliser les paiements</p>
                        <Link className="btn btn-md btn-primary m-2" to="/job/create-job">Demander un nouveau service</Link>
                        <Link className="btn btn-md btn-primary m-2" to="/explorer">Explorer les services disponibles</Link>
                    </div>
                </div>


            </div>

            <div className="divider lg:divider-horizontal h-full"></div>

            <div className="grid _flex-grow rounded-box w-1/2">
                <div className="">

                    <section className="max-w-screen-lg mx-auto pb-10 flex mt-2">
                        <img className="mx-auto" src={logo} alt="screenshot"/>
                    </section>

                    <div className="">
                        <div className=" font-extrabold text-6xl md:text-8xl font-inter relative z-40">
                            <div className="divider text-primary m-10" >
                                <span className="divider"></span>TASK<span className="divider"></span>
                            </div>
                            <div className="text-secondary-content">TURTLE</div>
                        </div>
                    </div>
                </div>

            </div>


            {/*
                <div>
                    <div>
                        <div className="flex flex-row md:mb-32 mb-4 md:mt-60 mt-32">
                            <div className="grid flex items-center justify-center w-full h-full">
                                <hr className="w-28 h-1 my-8 bg-secondary-content border-0 mr-48 rounded "/>
                                <div className="absolute px-4 -translate-x-1/2 -translate-y-8 bg-transparent left-1/2">
                                    <img src={logo} className="h-[15]"/>
                                </div>
                                <hr className="w-28 h-1 my-8 bg-secondary-content border-0 rounded"/>
                            </div>

                            <p className="grid flex text-center text-primary font-extrabold text-6xl md:text-8xl font-inter relative z-40">
                                <div className="divider lg:divider-horizontal">TASK</div>
                                <span className="text-secondary-content hidden">TURTLE</span>
                            </p>
                        </div>
                    </div>
                </div>*/}

        </div>
    )
        ;
}

export default Home;
