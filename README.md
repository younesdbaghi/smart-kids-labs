# SMART KIDS LAB 🚀
> **« Apprendre. Créer. Explorer. Préparer demain. »**

Plateforme éducative interactive et engageante destinée aux enfants et adolescents de **6 à 15 ans**. Elle permet d’apprendre progressivement la **logique**, les **mathématiques**, les **algorithmes**, la **programmation**, l’**intelligence artificielle**, la **culture numérique** et la **créativité**.

L'application intègre une expérience **Full-Stack complète et responsive**, avec une navigation par **Sidebar latérale moderne**, des **animations & sons kid-friendly**, et une **gestion complète des profils enfants (Ajouter, Modifier, Supprimer, Basculer)**.

---

## 🌟 Sommaire

1. [Aperçu des Fonctionnalités](#-aperçu-des-fonctionnalités)
2. [Stack Technique](#-stack-technique)
3. [Démarrage Rapide en Local (Localhost)](#-démarrage-rapide-en-local-localhost)
4. [Gestion des Enfants (Ajouter, Modifier, Supprimer)](#-gestion-des-enfants)
5. [Configuration de l'IA Google Gemini](#-configuration-de-lia-google-gemini)
6. [Déploiement en Ligne (Production)](#-déploiement-en-ligne-production)
   - [Option A : Déploiement sur Render](#option-a--déploiement-sur-render-recommandé)
   - [Option B : Déploiement sur Railway](#option-b--déploiement-sur-railway)
   - [Option C : Déploiement avec Docker & Docker Compose](#option-c--déploiement-avec-docker--docker-compose)
   - [Configuration Base de Données MongoDB Atlas (Cloud Gratuit)](#configuration-base-de-données-mongodb-atlas-cloud-gratuit)
7. [Comptes de Test & Données Initiales](#-comptes-de-test--données-initiales)
8. [Architecture du Projet](#-architecture-du-projet)

---

## 🚀 Aperçu des Fonctionnalités

### 🖥️ Navigation & Responsive Design
- **Sidebar Latérale Moderne** : Remplacement de l'ancienne barre de navigation par une barre latérale élégante, avec sélecteur de mode (👨‍👩‍👧 Parent vs 🚀 Enfant), carte du profil actif avec barre d'XP animée, streak de flammes (🔥), navigation rapide et contrôles audio.
- **100% Responsive** : Tiroir coulissant (drawer) et barre compacte avec bouton burger sur smartphone/tablette, affichage pleine largeur fluide sur grand écran (`lg:pl-72`).
- **Animations & Sons Enfants** : Effets sonores intégrés via Web Audio API (aucun téléchargement externe requis, bouton muet/actif), confettis festifs lors des victoires et montées de niveau, avatars interactifs.

### 👨‍👩‍👧 Espace Parent (Contrôle & Accompagnement)
- **Tableau de bord visuel** : Progression globale (%), niveau actuel, XP, flamme de régularité (🔥), temps d'apprentissage.
- **Radar de compétences** : Répartition sur les 5 piliers éducatifs (Logique, Code, IA, Créativité, Culture Numérique).
- **Historique "Cette semaine"** : Vue chronologique des activités terminées et en cours.
- **Conseils pédagogiques** : Recommandations adaptées à l'âge et pistes de discussion parent-enfant.
- **Gestion Complète des Enfants** : Liste détaillée, bouton de modification rapide (prénom, âge, avatar), suppression sécurisée avec dialogue de confirmation, et création instantanée.

### 🎮 Espace Enfant (Ludo-Éducatif)
- **🧠 Logique Challenge** : 30 énigmes interactives (suites arithmétiques, géométriques, Fibonacci, portes booléennes, déductions spatiales).
- **💻 Code Kids Studio** : Arène de programmation par blocs intuitifs (Déplacements directs : Monter, Descendre, Aller à Gauche, Aller à Droite ; Orientation : Avancer, Pivoter ; Boucles REPEAT et Conditions IF) avec robot explorateur animé sur grille spatiale et icônes React vectorielles dynamiques.
- **🤖 AI Explorer** : Laboratoire d'initiation aux réseaux de neurones, studio de classification d'images (chats vs chiens), analyse des biais et éthique de l'IA.
- **🎨 Creative Lab** : Studio Pixel Art 8x8 avec palette rétro, enregistrement des œuvres et générateur d'histoires à embranchements.
- **🌐 Culture Numérique** : Fonctionnement d'Internet, testeur interactif de robustesse de mots de passe, quiz anti-phishing et écologie numérique.
- **🤖 Coach IA Pédagogique (Gemini)** : Assistant Socratique bienveillant qui ne donne jamais la solution toute faite mais guide l'enfant par questions et indices.
- **🏆 Système de Niveaux & Badges** : Progression du Niveau 0 au Niveau 100, 10 Rangs prestigieux (🌱 Débutant → 👑 PRO) et formule anti-farm d'XP.
- **📜 Certificat d'Honneur Imprimable** : Diplôme officiel personnalisé généré à tout moment depuis la fiche profil de l'enfant.

---

## 🛠️ Stack Technique

- **Frontend** : React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend** : Node.js, Express, TypeScript (`tsx`), API REST, JWT, Bcrypt.
- **Base de Données** : MongoDB & Mongoose (avec **fallback en mémoire automatique** si MongoDB n'est pas installé localement).
- **IA** : SDK officiel Google GenAI (`@google/genai`), modèle `gemini-3.8-flash` avec mode de secours heuristique en cas d'absence de clé API.

---

## 💻 Démarrage Rapide en Local (Localhost)

### 1. Prérequis
- **Node.js** (version 18 ou supérieure recommandée) : Télécharger sur [nodejs.org](https://nodejs.org)
- **npm** (inclus avec Node.js)
- *(Optionnel)* **MongoDB** local ou **Docker** (non obligatoire : l'application dispose d'un moteur de persistance mémoire automatique qui démarre immédiatement si MongoDB n'est pas présent).

### 2. Cloner et installer le projet
```bash
# 1. Accéder au dossier du projet
cd smart-kids-lab

# 2. Installer les packages npm
npm install
```

### 3. Démarrer MongoDB localement (Optionnel)
Si vous disposez de MongoDB sur votre machine :
```bash
# Linux (systemd)
sudo systemctl start mongod

# macOS (Homebrew)
brew services start mongodb-community

# Ou exécution directe
mongod --dbpath /data/db
```
*Note : Si MongoDB n'est pas démarré, le serveur bascule automatiquement et de façon transparente sur sa mémoire de données intégrée, vous permettant de tester immédiatement sans bloquer.*

### 4. Vérifier les variables d'environnement (`.env`)
Un fichier `.env` prêt à l'emploi est déjà configuré à la racine :
```ini
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/smartkidslab
JWT_SECRET=smart_kids_lab_secret_key_2026_super_secure
GEMINI_API_KEY=AIzaSyDtyO4KATSVS9laHr3kvea_esnSGcRmh8k
```

### 5. Initialiser les données (Seed)
Pour injecter le compte parent administrateur, l'enfant de départ et les **95 activités pédagogiques** :
```bash
npm run seed
```

### 6. Lancer l'application Full-Stack
```bash
npm run dev
```
L'application démarre immédiatement sur : **`http://localhost:3000`**

---

## 👶 Gestion des Enfants

L'application permet aux parents de gérer librement un ou plusieurs profils enfants sous leur compte familial :

1. **Voir la liste des enfants** :
   - Accessible depuis la **Sidebar** (cliquez sur "Changer" ou sur la carte de profil) ou via le menu **« Gestion Enfants & Réglages »** (`/settings`).
2. **Ajouter un enfant** :
   - Renseignez le prénom, sélectionnez l'âge (6 à 15 ans) et choisissez un avatar ludique (🤖, 🚀, 🧠, 🐱, 🦊, 🦁, 🐼, 👾, 🦄, 🧑‍🚀, 🦖, ⚡).
   - L'enfant débute au **Niveau 0 avec 0 XP** et son propre historique d'activités.
3. **Modifier un enfant** :
   - Cliquez sur l'icône **Crayon (✏️)** sur la carte de l'enfant dans `/settings` pour modifier son prénom, son âge ou son avatar.
   - Les modifications sont sauvegardées en temps réel dans la base de données.
4. **Supprimer un enfant** :
   - Cliquez sur l'icône **Corbeille (🗑️)**.
   - Une boîte de dialogue de confirmation sécurisée s'affiche pour éviter toute suppression accidentelle.
   - La suppression efface proprement le profil ainsi que l'ensemble des tentatives et projets associés.
5. **Basculer entre les enfants** :
   - Cliquez sur le bouton "Changer" dans la Sidebar ou sur "Activer ce profil" dans les réglages.

---

## 🤖 Configuration de l'IA Google Gemini

Le Coach Pédagogique est sécurisé côté serveur : **la clé API Gemini n'est jamais exposée au navigateur client**.

1. **Obtenir une clé Gemini gratuite** :
   - Rendez-vous sur [Google AI Studio](https://aistudio.google.com) et créez une clé API.
2. **Renseigner la clé** :
   - Dans votre fichier `.env` :
     ```ini
     GEMINI_API_KEY=votre_cle_ici
     ```
3. **Fonctionnement sans clé (Mode Résilient)** :
   - Si aucune clé n'est fournie ou en cas de coupure réseau, l'application continue de fonctionner grâce à un tuteur heuristique local intelligent qui fournit des indices adaptés à l'âge sans jamais bloquer l'enfant.

---

## 🌐 Déploiement en Ligne (Production)

Pour rendre l'application accessible en ligne à votre famille ou à vos utilisateurs, voici les étapes pour les hébergeurs les plus populaires :

### Configuration Base de Données MongoDB Atlas (Cloud Gratuit)
1. Créez un compte gratuit sur [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Créez un cluster gratuit (Tier M0 Free, 512 Mo).
3. Dans **Database Access**, créez un utilisateur (ex: `smartkidsadmin` avec un mot de passe sécurisé).
4. Dans **Network Access**, autorisez les adresses IP (`0.0.0.0/0` pour autoriser les serveurs d'hébergement).
5. Cliquez sur **Connect** > **Drivers** et copiez votre URL de connexion :
   ```
   mongodb+srv://smartkidsadmin:<password>@cluster0.abcde.mongodb.net/smartkidslab?retryWrites=true&w=majority
   ```

---

### Option A : Déploiement sur Render (Recommandé)
[Render.com](https://render.com) propose un hébergement simple pour les applications Web Full-Stack Node.js :

1. Créez un compte sur **Render.com**.
2. Cliquez sur **New +** > **Web Service**.
3. Liez votre dépôt GitHub contenant le projet.
4. Configurez les champs suivants :
   - **Environment** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm start`
5. Dans la section **Environment Variables**, ajoutez :
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `JWT_SECRET` = `une_cle_secrete_longue_et_aleatoire`
   - `MONGODB_URI` = `mongodb+srv://...` (votre URL Atlas)
   - `GEMINI_API_KEY` = `votre_cle_gemini`
6. Cliquez sur **Deploy Web Service**.
7. Une fois déployé, initialisez la base en ouvrant l'onglet **Shell** sur Render et tapez :
   ```bash
   npm run seed
   ```

---

### Option B : Déploiement sur Railway
[Railway.app](https://railway.app) déploie le projet en 2 minutes :

1. Créez un projet sur **Railway**.
2. Ajoutez un plugin **MongoDB** (Railway configure la variable `MONGO_URL` automatiquement).
3. Cliquez sur **Deploy from GitHub repo**.
4. Dans **Variables**, définissez :
   - `MONGODB_URI` : `${{MongoDB.MONGO_URL}}`
   - `JWT_SECRET` : `votre_secret`
   - `GEMINI_API_KEY` : `votre_cle`
   - `NODE_ENV` : `production`
5. Railway détecte le script `npm run build` et `npm start`. Votre application est en ligne !

---

### Option C : Déploiement avec Docker & Docker Compose
Un déploiement conteneurisé autonome avec MongoDB inclus :

**Exemple de `docker-compose.yml` :**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    restart: always
    environment:
      MONGO_INITDB_DATABASE: smartkidslab
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

  app:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
      MONGODB_URI: mongodb://mongodb:27017/smartkidslab
      JWT_SECRET: super_jwt_secret_key_prod_2026
      GEMINI_API_KEY: ${GEMINI_API_KEY}
    depends_on:
      - mongodb

volumes:
  mongo-data:
```

**Lancement :**
```bash
docker compose up -d --build
# Initialisation des données
docker compose exec app npm run seed
```

---

## 🔑 Comptes de Test & Données Initiales

| Compte | Identifiant | Mot de passe | Rôle |
| :--- | :--- | :--- | :--- |
| **Parent Administrateur** | `admin` | `admin123@0` | Gestion foyer, suivi statistiques, configuration |
| **Enfant Pré-configuré** | `Adam` | *(accès direct via session)* | 9 ans, avatar robot 🤖, 0 XP, Niveau 0 |

---

## 📁 Architecture du Projet

```
├── server.ts                    # Serveur Express Fullstack (Vite middleware en dev, statique en prod)
├── server/
│   ├── db.ts                    # Modèles Mongoose & gestionnaire mémoire fallback
│   ├── middleware/auth.ts       # Sécurité JWT & validation parent
│   ├── routes/api.ts            # Routes REST (auth, enfants, activités, projets, stats)
│   ├── services/aiCoach.ts      # Service Gemini AI Socratique (@google/genai)
│   ├── data/
│   │   ├── initialActivities.ts # 95 activités pédagogiques réparties sur 5 domaines
│   │   ├── initialBadges.ts     # Badges à débloquer et bonus XP
│   │   └── initialMissions.ts   # Quêtes quotidiennes
│   └── seed.ts                  # Script d'amorçage de la base de données
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Nouvelle Sidebar responsive desktop/tablette/mobile
│   │   ├── Logo.tsx             # Reproduction fidèle du logo officiel
│   │   ├── RewardModal.tsx      # Célébration, confettis et son de victoire
│   │   └── AICoachModal.tsx     # Interface de discussion avec le coach IA
│   ├── pages/
│   │   ├── LoginPage.tsx        # Connexion parent sécurisée
│   │   ├── ParentDashboardPage.tsx # Tableau de bord parent visuel
│   │   ├── ChildHubPage.tsx     # Hub d'accueil de l'enfant
│   │   ├── LogicPage.tsx        # Arène de 30 énigmes de logique
│   │   ├── CodePage.tsx         # Studio de programmation par blocs & robot
│   │   ├── AIPage.tsx           # Laboratoire d'IA & classification
│   │   ├── CreativePage.tsx     # Studio Pixel Art 8x8 & histoires
│   │   ├── DigitalCulturePage.tsx # Leçons culture numérique & sécurité
│   │   ├── ProgressionPage.tsx  # Analytics détaillés pour les parents
│   │   ├── BadgesPage.tsx       # Vitrine des badges & feuille de route des rangs
│   │   ├── ProfilePage.tsx      # Fiche enfant, avatar & certificat imprimable
│   │   ├── ParentInsightsPage.tsx # Conseils pédagogiques pour les parents
│   │   └── SettingsPage.tsx     # Gestion complète des enfants (CRUD) & difficulté
│   ├── context/AppContext.tsx   # Contexte global (Auth, Enfants, Mode, Notifications)
│   ├── services/api.ts          # Client API HTTP avec tokens JWT
│   └── utils/sound.ts           # Générateur d'effets sonores Web Audio API
├── shared/
│   ├── types.ts                 # Types TypeScript partagés frontend/backend
│   └── progression.ts           # Formule d'XP, calcul des niveaux et rangs
└── package.json
```

---

## 📜 Licence

Propriété exclusive de **SMART KIDS LAB**. Tous droits réservés.
