# Guide Simple pour Gérer les Projets
## Comment ajouter ou modifier des photos sur votre site

### 🎯 Ce dont vous avez besoin
- Un ordinateur
- Vos photos
- Un compte GitHub (https://github.com/mecaforest)
- Une connexion internet

### 📸 Étape 1 : Préparer vos photos
1. **Renommez vos photos** avec des nombres simples :
   - `1.jpg`
   - `2.jpg`
   - `3.jpg`
   - etc...
2. **Important** : Utilisez UNIQUEMENT le format `.jpg`
3. **Conseil** : Évitez les espaces ou caractères spéciaux dans les noms

### 🌐 Étape 2 : Ajouter les photos sur GitHub
1. Allez sur https://github.com/mecaforest/mecaforest.github.io
2. Cliquez sur le dossier `PROJETS`
3. Cliquez sur le bouton "Ajouter un fichier" puis "Téléverser des fichiers"
4. Créez un nouveau dossier en cliquant sur "Créer un nouveau fichier" et en tapant `projet5/` (remplacez 5 par le numéro de votre projet)
5. Dans le nouveau dossier, cliquez sur "Ajouter un fichier" puis "Téléverser des fichiers"
6. Glissez-déposez vos photos ou cliquez sur "choisir vos fichiers"
7. En bas de la page, ajoutez un message comme "Ajout des photos du projet 5"
8. Cliquez sur "Valider les modifications"

### 📝 Étape 3 : Modifier le fichier index.html
1. Sur la page principale du dépôt, cliquez sur `index.html`
2. Cliquez sur l'icône de crayon (Modifier ce fichier)
3. Trouvez la section des projets (cherchez "Nos Projets")
4. Trouvez le bloc commenté pour le prochain projet (ex : Projet 5) :

```html
<!-- Projet 5 - Décommentez ce bloc ET modifiez le nom du projet, la description, le nom du dossier et le nom de l'image -->
<!--
<div class="gallery-item" onclick="openProject('projet5')">
    <img src="PROJETS/projet5/1.jpg" alt="Projet 5">
    <div class="overlay">
        <h3>Projet 5</h3>
        <p>Description du projet 5</p>
    </div>
</div>
-->
```

5. **Décommentez** le bloc (enlevez `<!--` et `-->`) et modifiez les informations :

```html
<div class="gallery-item" onclick="openProject('projet5')">
    <img src="PROJETS/projet5/1.jpg" alt="Taille de haies">
    <div class="overlay">
        <h3>Taille de Haies</h3>
        <p>Travaux de taille de haies réalisés en 2024</p>
    </div>
</div>
```

6. En bas de la page :
   - Ajoutez un message comme "Ajout du projet 5 dans la galerie"
   - Cliquez sur "Valider les modifications"

### 📝 Étape 4 : Modifier le fichier script.js
1. Sur la page principale du dépôt, cliquez sur `script.js`
2. Cliquez sur l'icône de crayon (Modifier ce fichier)
3. Trouvez la section `projectFiles` :

```js
const projectFiles = {
    'projet1': ['1.jpg', '2.jpg'],
    'projet2': ['1.jpg', '2.jpg'],
    'projet3': ['1.jpg', '2.jpg', '3.jpg'],
    'projet4': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'],
    // les fichiers de ton project seront a rajouter ici
};
```

4. Ajoutez votre projet :

```js
const projectFiles = {
    'projet1': ['1.jpg', '2.jpg'],
    'projet2': ['1.jpg', '2.jpg'],
    'projet3': ['1.jpg', '2.jpg', '3.jpg'],
    'projet4': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'],
    'projet5': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'], // Ajoutez cette ligne pour le nouveau projet
    // ...
};
```

5. En bas de la page :
   - Ajoutez un message comme "Ajout des images du projet 5 dans le script"
   - Cliquez sur "Valider les modifications"

### ⚠️ Points importants à retenir
- Utilisez UNIQUEMENT des fichiers `.jpg`
- Nommez vos photos avec des nombres simples (1.jpg, 2.jpg, etc.)
- La photo numéro 1 sera toujours celle affichée en premier
- Ne modifiez pas les noms des dossiers existants
- Vérifiez que vos changements sont bien enregistrés (validés)

### 🆘 En cas de problème
Si quelque chose ne fonctionne pas :
1. Vérifiez que tous vos fichiers sont bien en `.jpg`
2. Vérifiez que vos photos sont bien numérotées
3. Vérifiez que vous êtes dans le bon dossier
4. Vérifiez que vous avez bien cliqué sur "Valider les modifications"
5. Attendez quelques minutes pour que les changements soient visibles sur le site

## Conseils
- Ajoutez un seul projet à la fois pour éviter les erreurs
- Vérifiez bien l'orthographe du nom du dossier et des images
- Utilisez des messages de validation clairs et descriptifs
- Attendez quelques minutes après chaque modification pour voir les changements sur le site

---
*Guide créé pour MécaForest - Version 4.1*