# Documentation de l'Application - DigiSynd

## 1. Introduction
L'application de gestion de paiement de cotisation syndicale permet au syndic d'immeuble de gérer les appartements, les paiements mensuels associés, et d'imprimer des factures. Cette documentation guide le développement de l'application avec les technologies Node.js, Express.js, MongoDB, React.js, et Docker..

## 2. Fonctionnalités Principales
- **Gestion des Appartements :** Création, modification, et suppression d'appartements.
- **Gestion des Paiements Mensuels :** Affectation des paiements mensuels pour chaque appartement.
- **Impression des Factures :** Possibilité d'imprimer la facture pour chaque paiement d'un appartement.
## 4. Guide d'Installation

### 4.1 Prérequis
- **Node et NPM :** Assurez-vous d'avoir Node.js (avec npm inclus) installé sur votre système. Vous pouvez télécharger la dernière version à partir du [site officiel de Node.js](https://nodejs.org/).
- **MongoDb :** L'application utilise Mongodb comme système de gestion de base de données. Vous devrez  connaître les détails de connexion à votre base de données.
- **Docker (Optionnel) :** Si vous préférez utiliser Docker pour exécuter votre application dans un environnement de conteneur, assurez-vous d'avoir Docker installé sur votre système. Vous pouvez télécharger Docker à partir du [site officiel de Docker](https://www.docker.com/).

### 4.2 Installation

#### 4.2.1 Téléchargement du Code Source
Clonez le référentiel depuis GitHub :

    https://github.com/Laaouina18/DigiSync


#### 4.2.2 Configuration de l'Environnement
Créez un fichier '.env' à la racine du projet avec les configurations suivantes :
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nom_de_votre_base
JWT_SECRET=votre_secret_jwt



#### 4.2.3 Installation des Dépendances
Installez les dépendances pour le backend et le frontend en utilisant la commande suivante:

    npm install


#### 4.2.4 Configuration de la Base de Données
Assurez-vous que votre base de données MongoDB est en cours d'exécution. Ajustez le lien de connexion dans le fichier .env si nécessaire. Pour synchroniser la base de données, exécutez :

    npm run server
#### 4.2.5 Exécution de l'Application en Mode Développement
Utilisez la commande suivante pour exécuter l'application en mode développement :
     
	 npm run dev

## 5. Tests Unitaires
Exécutez les tests unitaires pour chaque contrôleur en utilisant la commande :

     npm test




