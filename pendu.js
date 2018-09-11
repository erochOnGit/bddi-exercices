// Prérequis pour le prompteur (pas d'importance pour le cours)

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// La fonction Game a terminer (ça se corse)

const WORD_LIST = ["chevre", "vache"];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
class Game {
  constructor() {
    let letters = [], // letters entered by user
      lives = 5, // lives left
      word, // the current word
      missing, // number of letters missing
      wordTab; //tableau pcq j'avais la flemme de réécrire
    function init() {
      lives = 5;
      console.log("randomword : ", WORD_LIST[getRandomInt(WORD_LIST.length)]);
      word = WORD_LIST[getRandomInt(WORD_LIST.length)];
      // TODO: récupérer un mot random depuis WORD_LIST (1 ligne)
      wordTab = word.split("");
      letters = [];
      // Count without duplicated
      missing = Array.prototype.filter.call(word, (letter, i) => {
        return word.indexOf(letter) == i;
      }).length;
      console.log("missinginit", missing);
    }
    function losinglife(letter) {
      letters.push(letter);
      wordTab.find(ltr => ltr === letter) ? null : lives--;
    }
    function addLetter(letter) {
      // TODO: cette fonction doit :
      // - vérifier que la lettre n'a pas déjà été tentée auparavent
      // - si ce n'est pas le cas, l'ajouter dans le tableau `letters`
      // - modifier `lives` et `missing` en conséquence
      // - ne retourne rien
      // - (6 lignes)
      letters.filter(oneLetter => letter === oneLetter).length > 1
        ? console.log("alreadyfound")
        : console.log("pas trouvé") || losinglife(letter);

      missing = 0;
      wordTab.map(
        letter =>
          letters.find(foundLetter => foundLetter === letter) ? null : missing++
      );

      console.log("missing letters : ", missing);
    }

    function displayWord() {
      // TODO: cette fonction doit:
      // - retourner une chaine de caractère
      // - les lettres trouvées et celles manquantes remplacées par un underscore
      // - exemple : v_ch_e
      // - Utiliser une boucle for et la concaténation
      // - (9 lignes)
      let hiddenWord = wordTab
        .map(
          letter =>
            letters.find(foundLetter => foundLetter === letter) ? letter : "_"
        )
        .join()
        .replace(/,/g, "");
      return hiddenWord;
    }

    function prompt(cb) {
      console.log(Array(lives + 1).join("❤"));
      rl.question(displayWord() + "\r\n", cb);
    }

    function onAnswer(answer) {
      console.log(answer[0]);
      addLetter(answer[0]);

      if (missing > 0 && lives > 0) {
        prompt(onAnswer);
      } else {
        console.log(
          ["End of the game.", "you", missing > 0 ? "lose" : "win", "!"].join(
            " "
          )
        );
        rl.close();
      }
    }

    return {
      play() {
        init();
        console.log("Vous êtes prêts ? Devinez le mot.");
        prompt(onAnswer);
      }
    };
  }
  play() {}
}

const game = new Game();

game.play();
