-- Instructions permettant de créer la base de données
CREATE TABLE utilisateur (
    idUtilisateur INTEGER,
    pseudo VARCHAR(50),
    password VARCHAR(50),
    CONSTRAINT idJoueur_PK PRIMARY KEY (idUtilisateur)
);
