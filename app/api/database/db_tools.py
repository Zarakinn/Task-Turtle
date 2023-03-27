import os
import sqlite3
import string

# Emplacement du fichier de la base de données
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "database.db")
DB_FILE_FROM_PROJECT = f"project{os.sep}database{os.sep}" + DB_FILE

SCHEMA_FILE = f"database{os.sep}schema.sql"
DICT_FILE = f"database{os.sep}dictionnaire_data.sql"


# Requêtes basiques sur la base de données
def basic_query(sql, param_sql, disable_dict_factory=False, one_row=False, commit=False):
    global cursor
    try:
        connexion = get_db(disable_dict_factory)
    except sqlite3.Error as error:
        return
    try:
        cursor = connexion.cursor()
        cursor.execute(sql, param_sql)
        if one_row:
            query = cursor.fetchone()
        else:
            query = cursor.fetchall()
        if commit:
            connexion.commit()
    except sqlite3.Error as error:
        return
    finally:
        cursor.close()
        connexion.close()
    return query


def basic_insert(sql, param_sql):
    try:
        basic_query(sql, param_sql, commit=True)
    except sqlite3.Error as error:
        return


def create_db():
    # On reset la bd
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
    connexion = sqlite3.connect(DB_FILE)
    cursor = connexion.cursor()

    # Création  des tables
    with open(SCHEMA_FILE, 'r') as file:
        sql = file.read()
        cursor.executescript(sql)
    basic_insert("insert into utilisateur (idUtilisateur, pseudo, password) values (?, ?, ?)",
                 (0, "admin", "admin"))


def get_db(disable_dict_factory=False):
    db = sqlite3.connect(DB_FILE)
    if not disable_dict_factory:
        db.row_factory = dict_factory
    return db


# Voir: https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.row_factory
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def generate_max_id(table: string) -> int:
    try:
        if table == "utilisateur":
            new_id = basic_query("SELECT MAX(idUtilisateur) FROM utilisateur", [], disable_dict_factory=True,
                                 one_row=True)
    except sqlite3.Error as error:
        return -1
