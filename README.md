<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

# :star: OlympicGamesStarter :star:

 <div align="center">

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

</div>
<hr/>

## Introduction

Cette application permet de visualiser les statistiques des derniers Jeux Olympiques pour chaque pays, en fournissant des détails sur les médailles et le nombre d'athlètes pour un pays spécifique.
Elle est créée avec **[Angular](#angular)** qui est un **[Framework](#framework)** pour **[Javascript](#javascript)**  écrit en **[Typescript](#typescript)** .

#### Quelques brèves explications

Pour communiquer avec notre ordinateur nous avons besoin de parler la même langue que lui. J'anticipe votre question:

**Quelle langue parle mon ordinateur ?**

Pour cela je vous répondrais que c'est comme dans le monde réel. Dans notre monde il y a différentes cultures et chaque culture à sa propre langue. Pour l'ordinateur c'est pareil.
Pour votre ordinateur les cultures correspondent aux domaines d'activités:

- Le web
- Le système
- Les logiciels

Et pour chaque domaine il peut y avoir un ou plusieurs langages nécessaires pour créer quelque chose dans ce domaine.
Pour le web et la création de sites, nous avons:

- **HTML**: pour créer la structure d'une page web
- **CSS**: Pour le styliser avec de jolies formes, couleurs mais aussi gérer les tailles
- **[Javascript](#javascript)**: pour rendre vos pages dynamiques.

Il y en a d'autres mais ce sont les plus courants et les plus simples à apprendre.

**Et Typecript ?**

**[Typescript](#typescript)**, Il faut voir ça comme un patois du  **[Javascript](#javascript)** (_pour rester sur le thème des langues_).

:ng:

---

## :warning: Installation ![Angular](https://img.shields.io/badge/angular_CLI-v14.1.3-blue)

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

N'oubliez pas d'installer vos `node_modules` avant de commencer (`npm install`).

---

## :computer: Serveur de développement

Exécutez `ng serve` pour démarrer le serveur de développement. Accédez à `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez l'un des fichiers source.

---

## :construction: Construction

Exécutez `ng build` pour construire le projet. Les artefacts de construction seront stockés dans le répertoire `dist/`.
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com) 

---

## :open_file_folder: Contenu du projet [![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)

Comme vous pouvez le constater, une architecture a déjà été définie pour le projet. Il s'agit simplement d'une suggestion, vous pouvez choisir d'utiliser la vôtre. L'architecture prédéfinie comprend (en plus de l'architecture angular par défaut) les éléments suivants :

### - `components`

dossier : contient tous les composants réutilisables

### - `pages`

dossier : contient les composants utilisés pour le routage

#### - Page d'accueil

La page d'accueil

#### - Page de détails

Page spécifique au pays

#### - Page d'erreur [![forthebadge](https://forthebadge.com/images/badges/uh-oh-404-no-pages-or-badges.svg)](https://forthebadge.com)

### - `core`

dossier : contient la logique métier (dossiers `services` et `models`)

#### - services [![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)

Les services de l'application (ici le service Olympic seulement)

#### - models [![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com)

Les modèles utilisés pour l'application.

#### - Les Routes

Voici les routes présentes dans l'application :

**route 1**

**route 2**

Je vous suggère de commencer par comprendre ce code de démarrage. Portez une attention particulière au `app-routing.module.ts` et au `olympic.service.ts`.

Une fois maîtrisé, vous devriez continuer en créant les interfaces TypeScript à l'intérieur du dossier `models`. Comme vous pouvez le voir, j'ai déjà créé deux fichiers correspondant aux données incluses dans le `olympic.json`. Avec vos interfaces, améliorez le code en remplaçant chaque `any` par l'interface correspondante.

Vous êtes maintenant prêt à implémenter les fonctionnalités demandées.

Bonne chance !

---

## Index

---

#### Angular
<div id="angular">
Angular est un framework open-source développé et maintenu par Google, utilisé pour construire des applications web à grande échelle. Il s'appuie sur TypeScript, un sur-ensemble de JavaScript, et suit le modèle de conception MVC (Modèle-Vue-Contrôleur) ou plus précisément le modèle MVVM (Modèle-Vue-Modèle).
</div>

#### Framework
<div id="framework">
Un Framework (cadre de travail, ou cadriciel dans d'autres pays Francophones comme au Canada) est un ensemble structuré d'outils, de composants et de conventions de programmation conçus pour faciliter le développement d'applications logicielles. Les frameworks fournissent un cadre de travail standardisé qui permet aux développeurs de construire, déployer et maintenir des applications plus rapidement et efficacement en réutilisant des solutions prédéfinies pour des problèmes courants.
</div>

#### Javascript
<div id="javascript">
JavaScript est un langage de programmation de haut niveau, orienté objet et principalement utilisé pour le développement web côté client. JavaScript est un langage de programmation polyvalent et puissant, largement utilisé dans le développement web pour créer des applications interactives et dynamiques. Sa simplicité, sa flexibilité et son écosystème riche en font l'un des langages les plus populaires et les plus demandés dans l'industrie du développement logiciel.
</div>

#### Typescript
<div id="typescript">
TypeScript est un langage de programmation open source développé par Microsoft. Il s'agit d'un sur-ensemble de JavaScript qui ajoute des fonctionnalités de typage statique optionnel, ce qui signifie que vous pouvez spécifier le type de données des variables, des paramètres de fonction, des propriétés d'objet, etc.
</div>

