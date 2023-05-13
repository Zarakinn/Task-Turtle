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
    idUtilisateurAccepter INTEGER,
    currentState INTEGER, -- 0 = en attente, 1 = en cours, 2 = terminée
    CONSTRAINT idJob_PK PRIMARY KEY (idJob),
    FOREIGN KEY (idUtilisateurPoster) REFERENCES "utilisateur"("idUtilisateur")
    FOREIGN KEY (idUtilisateurAccepter) REFERENCES "utilisateur"("idUtilisateur")
);

CREATE TABLE notation (
    idNotation INTEGER,
    idJob INTEGER,
    idVoter INTEGER,
    idVoted INTEGER,
    CONSTRAINT idNotation_PK PRIMARY KEY (idNotation),
    FOREIGN KEY (idJob) REFERENCES "job"("idJob")
    FOREIGN KEY (idVoter) REFERENCES "idUtilisateur"("utilisateur")
    FOREIGN KEY (idVoted) REFERENCES "idUtilisateur"("utilisateur")
)