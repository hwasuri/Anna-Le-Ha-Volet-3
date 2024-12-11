// ======================================== Éléments HTML ========================================
const oIntroHTML = document.querySelector("#intro");
const oBoutonDemarrerHTML = document.querySelector("#btn");
const oJeuHTML = document.querySelector("#jeu");

// ==== POKEMON ====
const oPokemonJoueurHTML = document.querySelector("#pokemon-allie");
const oPokemonNomHTML = document.querySelector("#nom-pokemon");

const oPokemonEnnemiHTML = document.querySelector("#pokemon-ennemi");

// HP
const oPokemonEnnemiHPHTML = document.querySelector("#hp-perdu");
const oPokemonEnnemiHPApresHTML = document.querySelector("#hp-ennemi");

// Options
const oOptionsHTML = document.querySelector("#options");
const oAttaque1HTML = document.querySelector("#btn1");
const oAttaque2HTML = document.querySelector("#btn2");
const oAttaque3HTML = document.querySelector("#btn3");
const oAttaque4HTML = document.querySelector("#btn4");

// Dialogue
const sDialogueHTML = document.querySelector("#dialogue");

// Effet d'attaque
const oPowHTML = document.querySelector("#pow");

// ======================================== Variables globales ========================================
// ==== CHANCES/COMPTEUR ====
let iChance = Math.floor(Math.random() * 6); //Les chances de capturer Mélofée

let iCompteurPokemon = Math.floor(Math.random() * 3); //Le pokémon de l'utilisateur est aléatoire
let sPokemon = "";
let sNomPokemon = "";

// ==== VARIABLES ====
const sDialogue = sDialogueHTML.textContent;
let sDialogueAAfficher = "";

// Le HP de Mélofée de base
const iMaxHp = 60; // Selon Google, son HP de base est de 70, mais c'est comme même élevé!!
let iHpEnnemi = iMaxHp;
let iDegats = Math.floor(Math.random() * 20 + 10); // Les dégats possibles du joueur, donc entre 10 à 29!

// ==== TABLEAUX/OBJETS ====
let oBulbasaur = {
  moves: ["Tacle", "Feu Follet"],
};

let oCharmander = {
  moves: ["Griffe", "Flammèche"],
};

let oSquirtle = {
  moves: ["Tir d'eau", "Charge"],
};

// ==== SONS ====
const oSonLab = new Audio("assets/audio/lab_theme.mp3");
const oSonBattle = new Audio("assets/audio/battle.mp3");
const oSonCaught = new Audio("assets/audio/capture.mp3");
const oSonFailed = new Audio("assets/audio/pokeball_failed.mp3");
const oSonThrow = new Audio("assets/audio/pokeball_throw.mp3");

const oSonClefairy = new Audio("assets/audio/clefairy_cry.mp3");
const oSonBulbasaur = new Audio("assets/audio/bulbasaur_cry.mp3");
const oSonCharmander = new Audio("assets/audio/charmander_cry.mp3");
const oSonSquirtle = new Audio("assets/audio/squirtle_cry.mp3");

// ======================================== MODIFICATIONS POKÉMON ========================================
// ==== IMAGE ====
if (iCompteurPokemon == 0) {
  sPokemon = "bulbasaur_back";
} else if (iCompteurPokemon == 1) {
  sPokemon = "charmander_back";
} else if (iCompteurPokemon == 2) {
  sPokemon = "squirtle_back";
}

oPokemonJoueurHTML.src = `assets/images/sprites/pokemon/${sPokemon}.png`;

// ====  NOM ====
if (iCompteurPokemon == 0) {
  sNomPokemon = "Bulbizarre";
} else if (iCompteurPokemon == 1) {
  sNomPokemon = "Salamèche";
} else if (iCompteurPokemon == 2) {
  sNomPokemon = "Carapuce";
}

oPokemonNomHTML.textContent = `${sNomPokemon}`;

// ==== ATTAQUES ====
if (iCompteurPokemon == 0) {
  oAttaque1HTML.textContent = oBulbasaur.moves[0];
  oAttaque2HTML.textContent = oBulbasaur.moves[1];
  oAttaque3HTML.textContent = "Capturer";
  oAttaque4HTML.textContent = "Courrir";
} else if (iCompteurPokemon == 1) {
  oAttaque1HTML.textContent = oCharmander.moves[0];
  oAttaque2HTML.textContent = oCharmander.moves[1];
  oAttaque3HTML.textContent = "Capturer";
  oAttaque4HTML.textContent = "Courrir";
} else if (iCompteurPokemon == 2) {
  oAttaque1HTML.textContent = oSquirtle.moves[0];
  oAttaque2HTML.textContent = oSquirtle.moves[1];
  oAttaque3HTML.textContent = "Capturer";
  oAttaque4HTML.textContent = "Courrir";
}

// ======================================== Fonctions ========================================
function initialisation() {
  //== SONS ==
  oSonBattle.pause();
  oSonLab.play();
  oSonLab.loop = true;

  // J'ajoute un delai aux boutons
  oIntroHTML.classList.remove("invisible");
  oBoutonDemarrerHTML.addEventListener("click", afficherJeuDebut);

  // HP à 100%
  oPokemonEnnemiHPApresHTML.textContent = `${iMaxHp}/${iMaxHp}`;

  // Débug
  oPokemonEnnemiHPHTML.classList.add("invisible");
}

// * Le dialogue de départ avec une animation
function afficherDialogue() {
  //J'ajoute un delai aux options
  oOptionsHTML.classList.add("invisible");
  if (sDialogueAAfficher.length < sDialogue.length) {
    let iIndex = sDialogueAAfficher.length;
    sDialogueAAfficher = `${sDialogueAAfficher}${sDialogue.charAt(iIndex)}`;
    sDialogueHTML.textContent = sDialogueAAfficher;
    setTimeout(afficherDialogue, 50);

    // Encore un delai
    setTimeout(function () {
      oOptionsHTML.classList.remove("invisible");
    }, 1500);
  }
}

// * Le jeu au début, les statistiques (hp) réinitialisés!
function afficherJeuDebut() {
  //== SONS ==
  oSonLab.pause();
  oSonBattle.play();
  oSonBattle.loop = true;
  oSonClefairy.play();

  oIntroHTML.classList.add("invisible");
  oJeuHTML.classList.remove("invisible");
  afficherDialogue();
  toucheAttaques();
}

// * Répétition après une option cliquée, cependant je veux garder les statistiques du joueur
function afficherJeuReste() {
  // Encore un delai
  oIntroHTML.classList.add("invisible");
  oJeuHTML.classList.remove("invisible");

  // J'affiche encore les options ainsi que le dialogue de départ
  toucheAttaques();
  afficherDialogue();
}

// * Les dialogues adaptées à chaque attaque
function dialogueAttaques() {
  if (sDialogueAAfficher.length < sDialogue.length) {
    sDialogueHTML.textContent = `${sNomPokemon} utilise ${oAttaque1HTML.textContent}!`;
    let iIndex = sDialogueAAfficher.length;
    sDialogueAAfficher = `${sDialogueAAfficher}${sDialogue.charAt(iIndex)}`;
  }

  // Encore un delai
  oOptionsHTML.classList.add("invisible");
}

function afficherHP() {
  // S'assurer que le HP ne peut pas être plus bas que 0
  iHpEnnemi = Math.max(0, iHpEnnemi - iDegats);

  // J'affiche le HP
  oPokemonEnnemiHPApresHTML.textContent = `${iHpEnnemi}/${iMaxHp}`;

  // Si Mélofée s'évanouie:
  if (iHpEnnemi <= 0) {
    oPokemonEnnemiHTML.src = "";
    const nouveauDialogue = "Oh no! Vous avez battu Mélofée..";
    sDialogueHTML.textContent = nouveauDialogue;
    setTimeout(initialisation, 3500);
  }
}

// * Les sons adaptés aux attaques et du pokémon en bataille
function sonAttaques() {
  if (iCompteurPokemon == 0) {
    oSonBulbasaur.play();
  } else if (iCompteurPokemon == 1) {
    oSonCharmander.play();
  } else if (iCompteurPokemon == 2) {
    oSonSquirtle.play();
  }
}

// * Les effets de chaques options
function toucheAttaques() {
  // ==== Attaque 1 ====
  oAttaque1HTML.addEventListener("click", function () {
    // Son
    sonAttaques();

    // Réinitialiser
    sDialogueAAfficher = "";

    // Nouveau dialogue
    dialogueAttaques();

    // Effets de l'attaque
    oPowHTML.classList.remove("invisible");
    oPokemonEnnemiHPHTML.classList.remove("invisible");

    setTimeout(function () {
      oPowHTML.classList.add("invisible");
    }, 2000);
    setTimeout(function () {
      oPokemonEnnemiHPHTML.classList.add("invisible");
    }, 2000);

    // Changement du HP
    oPokemonEnnemiHPHTML.textContent = -iDegats;
    afficherHP();

    // Suivant
    setTimeout(afficherDialogue, 2000);
  });

  // ==== Attaque 2 ====
  oAttaque2HTML.addEventListener("click", function () {
    // Son
    sonAttaques();

    // Réinitialiser
    sDialogueAAfficher = "";

    // Nouveau dialogue
    dialogueAttaques();

    // Effets de l'attaque
    oPowHTML.classList.remove("invisible");
    oPokemonEnnemiHPHTML.classList.remove("invisible");

    setTimeout(function () {
      oPowHTML.classList.add("invisible");
    }, 2000);
    setTimeout(function () {
      oPokemonEnnemiHPHTML.classList.add("invisible");
    }, 2000);

    // Changement du HP
    oPokemonEnnemiHPHTML.textContent = -iDegats;
    afficherHP();

    // Suivant
    setTimeout(afficherDialogue, 2000);
  });

  // ==== Capturer ====
  oAttaque3HTML.addEventListener("click", function () {
    // Son
    oSonThrow.play();

    // Réinitialiser
    sDialogueAAfficher = "";

    // Nouveau dialogue
    const nouveauDialogue = "*Lance*";
    sDialogueHTML.textContent = nouveauDialogue;

    // Changement de Mélofée
    oPokemonEnnemiHTML.src = "assets/images/elements/pokeball.png";
    setTimeout(melofeeCapture, 3000);
  });

  // ==== Courrir ====
  oAttaque4HTML.addEventListener("click", function () {
    // Réinitialiser
    sDialogueAAfficher = "";

    // Nouveau dialogue
    const nouveauDialogue = "Vous courrez!? Ok..";
    sDialogueHTML.textContent = nouveauDialogue;

    setTimeout(initialisation, 3500);
  });
}

// * Les résultats possibles si le joueur essaie de capturer Mélofée:
function melofeeCapture() {
  // Résultat 1: réussite
  if (iHpEnnemi <= 25 && iChance < 3) {
    alert("Bravo! Vous avez capturer Mélofée!");
    oSonBattle.pause();
    oSonCaught.play();
    setTimeout(initialisation, 3500);

    // Résultat 2: raté
  } else if (
    (iHpEnnemi >= 35 && iChance == 3) ||
    (iHpEnnemi >= 35 && iChance == 4) ||
    iHpEnnemi == 60 // Le joueur est obligé d'attaquer en premier
  ) {
    // Son
    oSonFailed.play();
    const nouveauDialogue = "Aargh, vous avez rater!";
    sDialogueHTML.textContent = nouveauDialogue;
    oPokemonEnnemiHTML.src = "assets/images/sprites/pokemon/clefairy_front.png";
    setTimeout(afficherJeuReste, 35000);

    //Résultat 3: Mélofée s'enfuit, le jeu recommence
  } else if (iChance == 5) {
    const nouveauDialogue = "Oh no!, il s'est enfuit!";
    sDialogueHTML.textContent = nouveauDialogue;
    oPokemonEnnemiHTML.src = "";
    setTimeout(initialisation, 3500);
  }
}

// Exécution du code au chargement de la page
initialisation();
