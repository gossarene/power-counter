# Test de compteur nommé PowerCounter

Ce projet est un  système de compteur basé sur la blockchain. Seules les personnes ayant leur adresse sur une whitelist peuvent manipuler le compteur.

Le système est déployé en ligne et accessible via le lien : http://blockchain-nuvider.com

Pour un déploiement il faut suivre les étapes suivantes:

# Les dépendances 
    - installer les dépendances : npm install 

# Contrat solidity

-Mettre à jour le contrat en ajoutant les adresses de la whitelist
-Mettre à jour les variables d'environnement REACT_APP_ROPSTEN_URL et REACT_APP_ROPSTEN_ACCOUNT_PRIVATE_KEY
-Déployer le contrat : npx hardhat run scripts/deploy.js
-Récupérer l'adresse du contrat pour mettre à jour la variable d'environnement REACT_APP_PCADDRESS

# Base de données
Pour la base de données, nous utilisons firebase. 
-Créer un compte sur firebase ( si vous n'en avez pas)
-Créer un projet et récupérer les codes d'intégration afin de mettre à jour les variable de configuration de la BD au sein du fichier .env

# Tester
npm run start
