import os

from flask import Flask
from flask_session import Session

app = Flask(__name__, static_folder='../build/static')
app.config["SESSION_PERMANENT"] = False
app.secret_key = 'app secret key'
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'taskturtle.db'),
    DEBUG=True,
    # python -c 'import secrets; print(secrets.token_hex())'
    SECRET_KEY='5ca98faeb0d6e75cf4bf25f2e431c52a5e9338a62edf05376e009ffd7154eb98',
    USERNAME='admin',
    PASSWORD='admin'
))