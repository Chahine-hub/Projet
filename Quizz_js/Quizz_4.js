const questions = [
  {
    question: "En quoi consiste une injection SQL ?",
    answers: [
      { text: "L'installation d'un fichier malveillant sur le serveur hôte.", correct: false },
      { text: "L'introduction de commandes SQL non filtrées dans une saisie pour altérer la base de données.", correct: true },
      { text: "L'extinction matérielle de l'instance de base de données.", correct: false },
      { text: "L'optimisation des temps de réponse d'un serveur applicatif.", correct: false }
    ]
  },
  {
    question: "Que signifie le sigle 'SQL' ?",
    answers: [
      { text: "Secure Query Language.", correct: false },
      { text: "Structured Query Language.", correct: true },
      { text: "Simple Quick Logic.", correct: false },
      { text: "System Quality Layer.", correct: false }
    ]
  },
  {
    question: "Quel motif est classiquement injecté pour contourner un contrôle d'accès SQL vulnérable ?",
    answers: [
      { text: "SELECT * FROM users", correct: false },
      { text: "' OR '1'='1", correct: true },
      { text: "DELETE DATABASE", correct: false },
      { text: "DROP TABLE IF EXISTS", correct: false }
    ]
  },
  {
    question: "Quelle pratique neutralise structurellement le risque d'injection SQL ?",
    answers: [
      { text: "Restreindre drastiquement le nombre de caractères autorisés dans les champs.", correct: false },
      { text: "Recourir aux requêtes préparées avec des paramètres liés (Prepared Statements).", correct: true },
      { text: "Suspendre l'accès à la base de données durant la nuit.", correct: false },
      { text: "Renommer régulièrement les tables de données de production.", correct: false }
    ]
  },
  {
    question: "Que signifie l'acronyme 'DDoS' ?",
    answers: [
      { text: "Direct Domain Operating Service.", correct: false },
      { text: "Distributed Denial of Service (Attaque par déni de service distribué).", correct: true },
      { text: "Dual Data on Server.", correct: false },
      { text: "Digital Device Overheat Security.", correct: false }
    ]
  },
  {
    question: "Quel est le but recherché lors d'une attaque DDoS ?",
    answers: [
      { text: "Dérober le contenu d'une base de données sensible.", correct: false },
      { text: "Rendre un service ou une machine indisponible en le submergeant de requêtes.", correct: true },
      { text: "Appliquer un chiffrement non réversible sur le stockage cible.", correct: false },
      { text: "Remplacer l'interface publique du site web cible.", correct: false }
    ]
  },
  {
    question: "Qu'est-ce qu'un 'Botnet' dans l'environnement d'une offensive DDoS ?",
    answers: [
      { text: "Un indexeur automatique déployé par un moteur de recherche.", correct: false },
      { text: "Un ensemble d'appareils compromis (PC, caméras, objets connectés) orchestrés par l'attaquant.", correct: true },
      { text: "Un agent conversationnel d'assistance technique.", correct: false },
      { text: "Un mécanisme de détection de logiciels indésirables.", correct: false }
    ]
  },
  {
    question: "Quel dispositif technique sert couramment à amortir et assainir un trafic DDoS massif ?",
    answers: [
      { text: "Un module cryptographique sur clé physique.", correct: false },
      { text: "Un réseau de diffusion de contenu (CDN) doublé d'un pare-feu applicatif (WAF).", correct: true },
      { text: "Une règle de filtrage antispam sur les boîtes électroniques.", correct: false },
      { text: "Le retrait des balises de navigation côté front-end.", correct: false }
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