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
Elle est créée avec **[Angular](#angular)** qui est un **[Framework](#framework)** pour **[Javascript](#javascript)** écrit en **[Typescript](#typescript)** .

#### :information_source: Quelques brèves explications

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

**[Typescript](#typescript)**, Il faut voir ça comme un patois du **[Javascript](#javascript)** (_pour rester sur le thème des langues_).

---

## :warning: Installation ![Angular](https://img.shields.io/badge/angular_CLI-v14.1.3-blue)

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

N'oubliez pas d'installer vos `node_modules` avant de commencer (`npm install`).

#### :information_source: Quelques brèves explications

**npm install** : C'est une commande utilisée dans Node.js pour installer les dépendances d'un projet à partir du registre npm (Node Package Manager). Lorsque vous exécutez npm install, npm recherche le fichier package.json dans le répertoire actuel, puis installe toutes les dépendances répertoriées dans ce fichier, ainsi que leurs dépendances récursives.

**node_modules** : C'est un répertoire généré par npm qui contient toutes les dépendances installées pour un projet. Chaque dépendance est installée dans son propre répertoire à l'intérieur de node_modules. il peut être reconstruit à tout moment en utilisant le fichier package.json.

**package.json** : C'est un fichier de configuration utilisé dans les projets Node.js pour définir les métadonnées du projet ainsi que ses dépendances et scripts. Il contient des informations telles que le nom du projet, la version, la description, les auteurs, les licences, les dépendances nécessaires pour le projet, et bien plus encore. C'est également l'endroit où vous pouvez déclarer des scripts personnalisés pour automatiser des tâches de développement courantes.

**package-lock.json** (ou yarn.lock) : Ce fichier est généré automatiquement par npm (ou Yarn) pour verrouiller les versions exactes des dépendances installées dans un projet. Il garantit que les versions des dépendances sont cohérentes entre différentes installations et permet une reproductibilité précise des installations. Le fichier package-lock.json (ou yarn.lock) est utilisé pour s'assurer que les versions des dépendances ne changent pas accidentellement entre les installations, ce qui pourrait entraîner des incohérences dans le projet.

#### Quelques astuces

##### :x: Problème avec une dépendance

Si vous souhaitez supprimer une dépendance (proprement) de votre projet suivez ces étapes:

1. Supprimez le dossier **node_modules**
2. Supprimez le fichier **package-lock.json**
3. Apportez vos modification au fichier **package.json** comme par exemple supprimer la ligne d'une dépendance que vous ne voulez plus.
4. Lancez la commande `npm install`

##### :ng: Angular CLI

**Créer une application**:Angular CLI permet de créer facilement une nouvelle application Angular en utilisant la commande `ng new` + nom_de_votre_projet. Cette commande génère une structure de projet initiale avec tous les fichiers et dossiers nécessaires pour démarrer le développement.
**Créer un component**:Pour créer un nouveau composant Angular, vous pouvez utiliser la commande `ng generate component` + nom_de_votre_component (ou `ng g c` pour faire court). Cette commande génère automatiquement les fichiers nécessaires pour votre composant, y compris le fichier TypeScript, le fichier HTML, le fichier de style CSS ou SCSS, ainsi que les fichiers de test.
**Créer une directive**:Angular CLI simplifie la création de directives personnalisées avec la commande `ng generate directive` + nom_de_votre_directive (ou `ng g d`). Cette commande crée les fichiers TypeScript nécessaires pour votre directive, ainsi que les fichiers de test associés.
**Créer un service**:Les services sont des éléments clés de toute application Angular. Pour créer un nouveau service, utilisez la commande `ng generate service` + nom_de_votre_service (ou `ng g s`). Cette commande génère le fichier TypeScript pour votre service, ainsi que les fichiers de test associés.

---

## :computer: Serveur de développement

Exécutez `ng serve` pour démarrer le serveur de développement. Accédez à `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez l'un des fichiers source.

---

## :construction: Construction

Exécutez `ng build` pour construire le projet. Les artefacts de construction seront stockés dans le répertoire `dist/`.
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

---

## :open_file_folder: Contenu du projet [![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)

Ci-dessous l'architecture du projet:

### `components`

dossier : contient tous les composants réutilisables

### `pages`

dossier : contient les composants utilisés pour le routage

---


## **HomeComponent**

La page d'accueil

<img src="src\assets\homeComponent_(iPhone SE).png">


---


## **DetailComponent**

Page spécifique au pays

<img src="src\assets\detailComponent_(iPhone SE).png">

---

## **NotFoundComponent** [![forthebadge](https://forthebadge.com/images/badges/uh-oh-404-no-pages-or-badges.svg)](https://forthebadge.com)

### `core`

dossier : contient la logique métier (dossiers `services` et `models`)

**services** [![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)

Les services de l'application (ici le service Olympic seulement)

**OlympicService**

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Olympic } from "../models/Olympic";

@Injectable({
  providedIn: "root",
})
export class OlympicService {
  private olympicUrl = "./assets/mock/olympic.json";
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  // Charge les données initiales
  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((olympics) => this.olympics$.next(olympics)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]); // Réinitialise les données en cas d'erreur
        return throwError(error); // Propage l'erreur
      })
    );
  }

  // Obtient les données olympiques
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }
}
```

**models** [![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com)

Les modèles (Interfaces) utilisés pour l'application.

**Olympic**

```typescript
import { Participation } from "./Participation";

export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
```
*Contient un paya avec ses participations*


**Participation**

```typescript
export interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
```
*Contient les informations d'une participation d'un pays*


**Point**

```typescript
export interface Point {
  x: number;
  y: number;
}
```
*Contient les valeurs x et y d'une position*

**Size(s)**

```typescript
export interface Size1 {
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
  aspect_ratio: number;
}
```
*Contient la largeur et la hauteur ainsi que l'aspect ratio pour sa variante*


**TextPosition**

```typescript
export interface TextPosition {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
```
*Permet de garder les informations nécessaires à un texte cliquable*

**RectBox**

```typescript
export interface RectBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
  }
```
*Garde les valeurs des 4 coins gauche /haut / droite / bas*

#### Les routes

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
