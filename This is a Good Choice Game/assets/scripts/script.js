// Définition de gameState comme un objet contenant les états du jeu
let gameState = {
    // 1. Description du jeu (scénario)
    description: "Il fait nuit et vous arrivez devant une maison abandonnée.",
    // 2. Tableau avec plusieurs choix (description, résultat, prochaine localisation)
    choices: [
        { description: "Entrer dans la maison", outcome: "Vous êtes à l'intérieur de la maison. Il y a une clé sur la table.", nextLocation: "inside" },
        { description: "Reculer lentement", outcome: "Vous décidez de reculer lentement. Vous êtes maintenant sur le chemin devant la maison.", nextLocation: "outside" },
        { name: "key", description: "Prendre la clé", outcome: "Vous vous emparez de la clé, soudain un bruit retient votre attention.", statut: "loot", nextLocation: "inside" },
    ],
    // 3. Tableau représentant l'inventaire
    inventory: [],
    // 4. Localisation initiale du joueur
    location: "outside"
};

// Définition des objets d'items
const items = {
    key: {
        name: "clé",
        statut: "loot"
    },
    // ... Ajoutez d'autres objets ici
};

// Fonction mettant à jour l'interface utilisateur
function updateUI() {
    // Met à jour la description affichée dans l'interface
    document.getElementById("description").textContent = gameState.description;

    // Récupère l'élément HTML avec l'ID "choices" pour afficher les choix et le place dans la variable choiceList
    const choicesList = document.getElementById("choices");
    // ... et le remplace par une chaîne vide
    choicesList.innerHTML = '';

    // Boucle à travers chaque choix du gameState et crée un bouton pour chacun
    gameState.choices.forEach((choice, i) => {
        if (gameState.location === "outside" && i === 1) {
            // Si le joueur est à l'extérieur, masque le deuxième choix
            return; // Sort de cette itération de la boucle

        } else if (gameState.location === "outside" && i === 2) {
            // Si le joueur est à l'exterieur, ne pas afficher le choix de prendre la clé
            return;

        } else if (gameState.location === "inside" && i === 0) {
            // Si le joueur est à l'intérieur, ne pas afficher le choix d'entrer dans la maison
            return;

        } else if (gameState.inventory.includes("key") && i === 2) {

            removeChoice(i);

        } else {
            const button = document.createElement("button"); // Crée un bouton HTML
            button.textContent = choice.description; // Définit le texte du bouton
            button.addEventListener("click", () => makeChoice(i)); // Ajoute un gestionnaire d'événement au clic du bouton
            const listItem = document.createElement("li"); // Crée un élément de liste HTML
            listItem.appendChild(button); // Ajoute le bouton à l'élément de liste
            choicesList.appendChild(listItem); // Ajoute l'élément de liste à la liste de choix
        }
    });
}

// Fonction pour ajouter un objet à l'inventaire
function addItemToInventory(item) {
    gameState.inventory.push(item);

    // Mettre à jour l'interface utilisateur après l'ajout de la clé
    updateUI();
}

// Fonction pour supprimer un choix en fonction de son index
function removeChoice(index) {
    gameState.choices.splice(index, 1); // Supprime le choix à l'index spécifié
    updateUI(); // Met à jour l'interface utilisateur après la suppression
}

// Fonction appelée lorsqu'un choix est fait
function makeChoice(choiceIndex) {
    const choice = gameState.choices[choiceIndex]; // Récupère le choix sélectionné et le place dans le tableau des choix de gameState mais aussi dans la variable choice
    gameState.description = choice.outcome; // Met à jour la description du jeu

    if (choice.name) {
        addItemToInventory(choice.name);
        // Utilisation de la fonction pour supprimer un choix (par exemple, pour supprimer le troisième choix)
        removeChoice(choiceIndex); // Cela supprimera le choix
    }

    // Mettre à jour la localisation du joueur
    gameState.location = choice.nextLocation;
    // Mettre à jour l'interface utilisateur
    updateUI();
}

// Initialisation du jeu
updateUI(); // Appelle la fonction pour initialiser l'interface

