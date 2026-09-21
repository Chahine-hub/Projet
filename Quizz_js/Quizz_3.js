const questions = [
  {
    question: "En quoi consiste une attaque classique par 'force brute' ?",
    answers: [
      { text: "Endommager physiquement l'infrastructure d'un serveur.", correct: false },
      { text: "Tester systématiquement toutes les combinaisons possibles de caractères jusqu'au succès.", correct: true },
      { text: "Écouter les paquets non chiffrés sur un réseau local.", correct: false },
      { text: "Substituer un mot de passe par du code applicatif.", correct: false }
    ]
  },
  {
    question: "Quel est le principe d'une attaque par 'dictionnaire' ?",
    answers: [
      { text: "Rectifier la structure des tables d'une base de données.", correct: false },
      { text: "Tester une liste préétablie de mots courants et de mots de passe fréquemment rencontrés.", correct: true },
      { text: "Traduire des charges utiles malveillantes dans différentes langues.", correct: false },
      { text: "Extorquer des accès par manipulation sociale directe.", correct: false }
    ]
  },
  {
    question: "Quel facteur assure la meilleure résistance contre la force brute ?",
    answers: [
      { text: "L'usage exclusif de séries de chiffres de taille moyenne.", correct: false },
      { text: "L'alternance fréquente du dernier caractère d'un mot simple.", correct: false },
      { text: "Une longueur élevée (14+ caractères) mêlant types de caractères variés ou une longue phrase secrète.", correct: true },
      { text: "L'association de son patronyme et de son année de naissance.", correct: false }
    ]
  },
  {
    question: "Que désigne le terme 'MFA' ?",
    answers: [
      { text: "Multi-Format Access.", correct: false },
      { text: "Multi-Factor Authentication (Authentification multifacteur).", correct: true },
      { text: "Main File Allocation.", correct: false },
      { text: "Master Firewall Architecture.", correct: false }
    ]
  },
  {
    question: "Quels sont les trois facteurs traditionnels d'authentification ?",
    answers: [
      { text: "L'identité, le prénom et le lieu de résidence.", correct: false },
      { text: "La connaissance (mot de passe), la possession (smartphone/clé) et l'inhérence (biométrie).", correct: true },
      { text: "L'IP source, la géolocalisation et l'agent utilisateur.", correct: false },
      { text: "La liaison Wi-Fi, le port filaire et le protocole radio.", correct: false }
    ]
  },
  {
    question: "Quelle faiblesse présente l'usage des SMS pour le second facteur d'authentification ?",
    answers: [
      { text: "L'incompatibilité native des SMS avec les ordinateurs.", correct: false },
      { text: "L'interception potentielle via le SIM swapping ou les faiblesses des réseaux télécoms.", correct: true },
      { text: "L'écrasement systématique du mot de passe primaire lors de l'envoi.", correct: false },
      { text: "Le protocole SMS ne présente aucune faiblesse connue.", correct: false }
    ]
  },
  {
    question: "Quel est l'intérêt premier d'un gestionnaire de mots de passe ?",
    answers: [
      { text: "Rendre accessibles ses codes sur un espace public en ligne.", correct: false },
      { text: "Générer et stocker de manière chiffrée des secrets uniques et complexes pour chaque service.", correct: true },
      { text: "Clôturer les comptes inactifs sur les plateformes web.", correct: false },
      { text: "Filtrer les courriers indésirables d'une boîte mail.", correct: false }
    ]
  },
  {
    question: "Quelle mesure côté serveur atténue efficacement les assauts par force brute ?",
    answers: [
      { text: "Facturer chaque soumission de formulaire d'accès.", correct: false },
      { text: "Appliquer une limitation de débit (rate limiting) et bloquer temporairement l'IP après plusieurs échecs.", correct: true },
      { text: "Masquer les champs d'authentification après un échec.", correct: false },
      { text: "Réinitialiser les sessions actives toutes les cinq minutes.", correct: false }
    ]
  }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e) {const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";   
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `Vous avez obtenu ${score} sur ${questions.length} !`;
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
        
    }else{
        startQuiz();
    }
});

startQuiz() ;