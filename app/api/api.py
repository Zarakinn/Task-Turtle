import hashlib
import time
import json
from flask import Flask, send_from_directory, json, request, jsonify, redirect
from .app_creator import app
from .database.db_tools import *
from .database import db_tools


class Utilisateur:
    def __init__(self, id, pseudo, isLoggedIn):
        self.id = id
        self.pseudo = pseudo
        self.isLoggedIn = isLoggedIn

    def to_json(self):
        utilisateur_json = {
            "id": self.id,
            "pseudo": self.pseudo,
            "isLoggedIn": self.isLoggedIn
        }
        return json.dumps(utilisateur_json)


current_user = Utilisateur(0, "anonymous", False)


###########################################################################


@app.route('/api/utilisateur', methods=['GET'])
def get_utilisateur():
    return current_user.to_json()


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/db')
def get_db():
    return {'db': db_tools.basic_query("select * from utilisateur", [])}


# Route pour la page de connexion
@app.route('/login', methods=['POST'])
def login():
    pseudo = request.form['pseudo']
    password = request.form['password']
    print(pseudo, password)

    user = basic_query("SELECT * FROM utilisateur WHERE pseudo=?", (pseudo,), one_row=True)
    if user is None:
        # return jsonify({'success': False, 'message': 'Nom d\'utilisateur incorrect'})
        return redirect(location="/login", code=302, Response=None)

    # Vérifier si le mot de passe est correct
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if hashed_password != user["password"]:
        return jsonify({'success': False, 'message': 'Mot de passe incorrect'})

    # Si les identifiants sont corrects, retourner une réponse de succès
    current_user.id = user["idUtilisateur"]
    current_user.pseudo = user["pseudo"]
    current_user.isLoggedIn = True
    return jsonify({'success': True, 'message': 'Connexion réussie'})


@app.cli.command('initdb')
def initdb_command():
    # Initialisation de la base de données
    db_tools.create_db()
    print('Initialized the database.')


###################### FRONT ########################################################
@app.route("/")
def base():
    # It returns the index.html file from the client/public directory
    return send_from_directory('../build/', 'index.html')


@app.route("/<file>")
def base_file(file):
    # It returns the index.html file from the client/public directory
    return send_from_directory('../build/', file)


# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/<path:path>")
def home(path):
    # It takes a path and returns a file from the client/public directory
    return app.send_static_file(path)


@app.errorhandler(404)
def not_found(e):
    return send_from_directory('../build/', 'index.html')
