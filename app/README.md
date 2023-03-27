# Installation et lancement

## Installation venv et lib npm
- `npm install`
- `python3 -m venv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
- Initialiser la base de données avec la commande : ```flask initdb```.



## Lancement app en dev

- Dans un terminal `npm start`
- Dans un autre terminal `npm run start-api`

### Modifier le port du back

- Modifier dans api/.flaskenv
- Modifier proxi dans package.json

## Déployement

### `npm run build`
