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
        }
    ];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
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
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
    });
}