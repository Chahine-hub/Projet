const questions = [
        {
            question: "Quel est le principe fondamental d'une attaque de phishing ?",
            answers: [
                { text: "Exploiter une panne matérielle sur un serveur", correct: false },
                { text: "Tromper la victime en usurpant l'identité d'une personne de confiance", correct: true },
                { text: "Chiffrer automatiquement les fichiers du disque dur", correct: false },
                { text: "Surcharger la bande passante d'un site web", correct: false }
            ]
        },
        {
            question: "Sur quel levier psychologique les cybercriminels s'appuient-ils le plus souvent dans un faux e-mail ?",
            answers: [
                { text: "La patience et la politesse", correct: false },
                { text: "L'effet d'urgence et la panique", correct: true },
                { text: "La complexité technique", correct: false },
                { text: "L'humour et le divertissement", correct: false }
            ]
        },
        {
            question: "Qu'appelle-t-on le « vishing » ?",
            answers: [
                { text: "Une attaque de phishing réalisée par appel téléphonique", correct: true },
                { text: "Un piratage de webcam à distance", correct: false },
                { text: "Un virus qui s'attaque aux fichiers vidéo", correct: false },
                { text: "Un faux SMS contenant un lien frauduleux", correct: false }
            ]
        },
        {
            question: "Qu'est-ce qui différencie le « spear phishing » d'un phishing classique ?",
            answers: [
                { text: "Il cible uniquement les smartphones", correct: false },
                { text: "Il est hautement personnalisé avec des informations réelles sur la cible", correct: true },
                { text: "Il s'envoie automatiquement à des millions de personnes au hasard", correct: false },
                { text: "Il ne contient aucun lien ni pièce jointe", correct: false }
            ]
        },   
        {
            question: "Quel réflexe est recommandé lorsqu'on reçoit un e-mail inattendu demandant de vérifier un compte bancaire ?",
            answers: [
                { text: "Cliquer directement sur le bouton dans le message", correct: false },
                { text: "Répondre à l'expéditeur en fournissant ses identifiants", correct: false },
                { text: "Se rendre soi-même sur le site officiel via ses favoris ou son navigateur", correct: true },
                { text: "Transférer le message à tous ses contacts", correct: false }
            ]
        },
        {
            question: "Quel indice dans l'adresse e-mail permet souvent de repérer une tentative d'escroquerie ?",
            answers: [
                { text: "L'absence totale de texte dans le message", correct: false },
                { text: "Un nom de domaine suspect différent du nom officiel du service", correct: true },
                { text: "L'utilisation d'une signature avec logo", correct: false },
                { text: "L'indication précise de la date du jour", correct: false }
            ]
        },
        {
            question: "Que désigne le « smishing » ?",
            answers: [
                { text: "Une attaque par déni de service distribué", correct: false },
                { text: "Une tentative de phishing transmise par SMS", correct: true },
                { text: "Une infection par cheval de Troie", correct: false },
                { text: "Une commande injectée dans une base de données", correct: false }
            ]
        },
        {
            question: "Pourquoi l'authentification multifacteur (MFA/2FA) est-elle efficace contre le phishing ?",
            answers: [
                { text: "Elle empêche l'ordinateur de recevoir des e-mails frauduleux", correct: false },
                { text: "Même si le mot de passe est volé, l'attaquant est bloqué sans le second facteur", correct: true },
                { text: "Elle supprime automatiquement les faux sites internet", correct: false },
                { text: "Elle rend tous les fichiers de l'appareil invisibles", correct: false }
            ]       
        }
]
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