import time
import os
import sqlite3
from flask import Flask, send_from_directory
from flask_session import Session
from .database import db_tools

app = Flask(__name__, static_folder='../build/static')
app.config["SESSION_PERMANENT"] = False
app.secret_key = 'app secret key'
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# load default conf and override config from an env var
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'taskturtle.db'),
    DEBUG=True,
    SECRET_KEY='dev key',
    USERNAME='admin',
    PASSWORD='admin'
))


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/db')
def get_db():
    return {'db': db_tools.basic_query("select * from utilisateur", [])}


@app.cli.command('initdb')
def initdb_command():
    # Initialisation de la base de données
    db_tools.create_db()
    print('Initialized the database.')


###################### FRONT ##########################"
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
