const questions = [
    {
        question: "Quelle est la spécificité majeure d'un Ransomware (rançongiciel) ?",
        answers: [
            { text: "Il espionne les frappes au clavier de la victime en arrière-plan." , correct: false },
            { text: "Il chiffre les fichiers de la victime et réclame un paiement pour les débloquer.", correct: true },
      { text: "Il formate immédiatement l'ensemble du support de stockage.", correct: false },
      { text: "Il redémarre le système de façon cyclique.", correct: false }
    ]
  },
  {
    question: "En quoi un ver informatique (worm) diffère-t-il d'un virus standard ?",
    answers: [
      { text: "Le ver n'engendre aucun dommage matériel ou logiciel.", correct: false },
      { text: "Le ver se propage de manière autonome via le réseau, sans intervention humaine.", correct: true },
      { text: "Le virus infecte uniquement les terminaux mobiles.", correct: false },
      { text: "Le ver ne sollicite aucune ressource processeur ou mémoire.", correct: false }
    ]
  },
  {
    question: "Qu'est-ce qu'un 'Cheval de Troie' (Trojan) ?",
    answers: [
      { text: "Une défaillance physique des composants matériels.", correct: false },
      { text: "Un logiciel malveillant camouflé sous les traits d'un programme légitime ou utile.", correct: true },
      { text: "Une saturation coordonnée des serveurs web.", correct: false },
      { text: "Un message de phishing envoyé à l'échelle d'une région.", correct: false }
    ]
  },
  {
    question: "Quel logiciel malveillant capture discrètement la saisie au clavier ?",
    answers: [
      { text: "Un Ransomware.", correct: false },
      { text: "Un Adware.", correct: false },
      { text: "Un Keylogger.", correct: true },
      { text: "Un Rootkit.", correct: false }
    ]
  },
  {
    question: "Pourquoi est-il déconseillé de verser la rançon exigée par un ransomware ?",
    answers: [
      { text: "Les transactions bancaires sont systématiquement rejetées.", correct: false },
      { text: "Rien ne garantit la remise de la clé et le paiement alimente l'écosystème criminel.", correct: true },
      { text: "Le chiffrement est automatiquement levé après 48 heures.", correct: false },
      { text: "Le paiement efface le système d'exploitation de la machine.", correct: false }
    ]
  },
  {
    question: "Quelle mesure préventive protège le plus efficacement contre les pertes dues aux rançongiciels ?",
    answers: [
      { text: "Déconnecter l'ordinateur de toute liaison réseau en permanence.", correct: false },
      { text: "Appliquer des sauvegardes régulières, testées et isolées hors ligne (règle 3-2-1).", correct: true },
      { text: "Supprimer les données de navigation quotidiennement.", correct: false },
      { text: "Maintenir l'équipement allumé en continu.", correct: false }
    ]
  },
  {
    question: "Quel est l'objectif d'un logiciel espion (Spyware) ?",
    answers: [
      { text: "Optimiser le débit de la connexion Internet.", correct: false },
      { text: "Extraire des données sur l'activité d'un utilisateur à son insu.", correct: true },
      { text: "Tester la robustesse d'un système de fichiers.", correct: false },
      { text: "Filtrer les fenêtres pop-up non désirées.", correct: false }
    ]
  },
  {
    question: "Que permet l'exploitation d'une faille 'Zero-Day' ?",
    answers: [
      { text: "Prendre le contrôle d'une cible en moins d'une journée.", correct: false },
      { text: "Exploiter une vulnérabilité inconnue de l'éditeur pour laquelle aucun patch n'existe.", correct: true },
      { text: "Désactiver un site web sans laisser d'empreinte dans les journaux.", correct: false },
      { text: "Effacer les cookies d'une session de navigation.", correct: false }
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