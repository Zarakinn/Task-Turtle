import hashlib
import sqlite3
import time
import json
from flask import Flask, send_from_directory, json, request, jsonify, redirect, session
from .app_creator import app
from .database.db_tools import *
from .database import db_tools


class Utilisateur:
    def __init__(self, id, pseudo, isLoggedIn):
        self.id = id
        self.pseudo = pseudo
        self.isLoggedIn = isLoggedIn

    def set_values(self, id, pseudo, isLoggedIn):
        self.id = id
        self.pseudo = pseudo
        self.isLoggedIn = isLoggedIn

    def to_json(self):
        utilisateur_json = {
            "id": self.id,
            "pseudo": self.pseudo,
            "isLoggedIn": self.isLoggedIn,
        }
        return json.dumps(utilisateur_json)


###########################################################################


@app.route("/api/utilisateur", methods=["GET"])
def get_utilisateur():
    if session.get("user") is None:
        return {"id": None, "pseudo": None, "isLoggedIn": False}
    return jsonify(
        {
            "id": session["user"].id,
            "pseudo": session["user"].pseudo,
            "isLoggedIn": session["user"].isLoggedIn,
        }
    )


@app.route("/api/utilisateur/<int:id>", methods=["GET"])
def get_utilisateur_by_id(id):
    return jsonify(
        db_tools.basic_query(
            "SELECT * FROM utilisateur WHERE idUtilisateur=?", (id,), one_row=True
        )
    )


@app.route("/api/time")
def get_current_time():
    return {"time": time.time()}


@app.route("/api/db")
def get_db():
    return {"db": db_tools.basic_query("select * from utilisateur", [])}


@app.route("/api/jobs")
def get_jobs():
    return {"jobs": db_tools.basic_query("select * from job WHERE currentState = 0", [])}


@app.route("/api/myjobs")
def get_myjobs():
    if not session.get("user") is None:
        idUser = session["user"].id
        return {"jobs": db_tools.basic_query("select * from job WHERE idUtilisateurPoster = ?", (idUser,))}
    return {"jobs":[]}

@app.route("/api/jobsaccepted")
def get_jobaccepted():
    if not session.get("user") is None:
        idUser = session["user"].id
        return {"jobs": db_tools.basic_query("select * from job WHERE idUtilisateurAccepter = ?", (idUser,))}
    return {"jobs":[]}

@app.route("/api/job/<int:id>")
def get_job_by_id(id):
    return jsonify(
        db_tools.basic_query("SELECT * FROM job WHERE idJob=?", (id,), one_row=True)
    )
    
    
@app.route("/api/acceptJob/<int:jobid>", methods=["POST"])
def post_acceptJob(jobid):
    db_tools.basic_query("UPDATE job SET currentState = 1, idUtilisateurAccepter = ? WHERE idJob=?", 
        (session["user"].id, jobid,), one_row=True, commit=True)
    return jsonify({"success": True})
    
@app.route("/api/cancelJob/<int:jobid>", methods=["POST"])
def post_cancelJob(jobid):
    db_tools.basic_query("UPDATE job SET currentState = 0, idUtilisateurAccepter = ? WHERE idJob=? and idUtilisateurAccepter = ? ", 
        (-1, jobid, session["user"].id), one_row=True, commit=True)
    return jsonify({"success": True})

@app.route("/api/confirmJob/<int:jobid>", methods=["POST"])
def post_confirmJob(jobid):
    db_tools.basic_query("UPDATE job SET currentState = 3 WHERE idJob=? and idUtilisateurPoster = ? ", 
        (jobid, session["user"].id), one_row=True, commit=True)
    return jsonify({"success": True})

@app.route("/api/finishJob/<int:jobid>", methods=["POST"])
def post_finishJob(jobid):
    db_tools.basic_query("UPDATE job SET currentState = 2 WHERE idJob=? and idUtilisateurAccepter = ? ", 
        (jobid, session["user"].id), one_row=True, commit=True)
    return jsonify({"success": True})


# Route pour la page de connexion
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    pseudo = data.get("pseudo")
    password = data.get("password")

    user = basic_query(
        "SELECT * FROM utilisateur WHERE pseudo=?", (pseudo,), one_row=True
    )
    if user is None:
        # return jsonify({'success': False, 'message': 'Nom d\'utilisateur incorrect'})
        return jsonify(
            {"success": False, "message": "Pas d'utilisateur avec ce pseudo"}
        )

    # Vérifier si le mot de passe est correct
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if hashed_password != user["password"]:
        return jsonify({"success": False, "message": "Mot de passe incorrect"})

    # Si les identifiants sont corrects, retourner une réponse de succès
    session["user"] = Utilisateur(user["idUtilisateur"], user["pseudo"], True)
    session.permanent = True
    return jsonify({"success": True, "message": "Connexion réussie"})


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    pseudo = data.get("pseudo")
    password = data.get("password")
    print(pseudo, password)
    if (
        basic_query("SELECT * FROM utilisateur WHERE pseudo=?", (pseudo,), one_row=True)
        is not None
    ):
        return jsonify({"success": False, "message": "Pseudo existant"})
    try:
        basic_insert(
            "INSERT INTO utilisateur (pseudo, password, idUtilisateur) VALUES (?, ?, ?)",
            (
                pseudo,
                hashlib.sha256(password.encode()).hexdigest(),
                generate_max_id("utilisateur"),
            ),
        )
        session.permanent = True

        user = basic_query(
            "SELECT * FROM utilisateur WHERE pseudo=?", (pseudo,), one_row=True
        )
        session["user"] = Utilisateur(user["idUtilisateur"], user["pseudo"], True)

        return jsonify({"success": True, "message": "Inscription réussie"})
    except sqlite3.Error:
        return jsonify({"success": False, "message": "Erreur lors de l'inscription"})


@app.route("/api/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"success": True, "message": "Déconnexion réussie"})


@app.route("/api/create-job", methods=["POST"])
def createJob():
    data = request.get_json()
    if session.get("user") is None:
        return jsonify(
            {"success": False, "message": "Vous devez être connecté pour créer un job"}
        )

    try:
        basic_insert(
            "INSERT INTO job (idJob, title, textDescription, tags, idUtilisateurPoster, price, locality, currentState) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                generate_max_id("job"),
                data.get("titre"),
                data.get("description"),
                data.get("categorie"),
                session["user"].id,
                data.get("prix"),
                data.get("commune"),
                0
            ),
        )
        return jsonify(
            {
                "success": True,
                "message": "Job créé, vous pouvez le consulter sur votre profil",
            }
        )
    except sqlite3.Error:
        return jsonify(
            {"success": False, "message": "Erreur lors de la création du job"}
        )


@app.cli.command("initdb")
def initdb_command():
    # Initialisation de la base de données
    db_tools.create_db()
    print("Initialized the database.")


###################### FRONT ########################################################
@app.route("/")
def base():
    print("/ path")
    # It returns the index.html file from the client/public directory
    return send_from_directory("../build/", "index.html")


@app.route("/<file>")
def base_file(file):
    print("file")
    # It returns the index.html file from the client/public directory
    return send_from_directory("../build/", file)


# Path for all the static files (compiled JS/CSS, etc.)
# @app.route("/<path:path>")
# def home(path):
#    # It takes a path and returns a file from the client/public directory
#    print("path")
#    return app.send_static_file(path)


@app.errorhandler(404)
def not_found(e):
    print("404")
    return send_from_directory("../build/", "index.html")
