-- Instructions permettant de créer la base de données
CREATE TABLE utilisateur (
    idUtilisateur INTEGER,
    pseudo VARCHAR(50),
    password VARCHAR(50),
    CONSTRAINT idJoueur_PK PRIMARY KEY (idUtilisateur)
);

CREATE TABLE job (
    idJob INTEGER,
    title VARCHAR(50),
    textDescription VARCHAR(150),
    tags VARCHAR(50), -- Voué à changer
    price INTEGER,
    locality VARCHAR(50),
    idUtilisateurPoster INTEGER,
    CONSTRAINT idJob_PK PRIMARY KEY (idJob),
    FOREIGN KEY (idUtilisateurPoster) REFERENCES "utilisateur"("idUtilisateur")
);