const Button = document.querySelector(".button");
const questionCtx = document.querySelector('.question');
const answerEls = document.querySelectorAll('#answer');

const headOfQuestion = document.querySelector(".headOfQuestion");
const quizContents = document.querySelector(".quizs_contents");
let questionRank = document.querySelector(".questionRank");
let quizThumb = document.querySelector(".quizThumbs");
const quiz_result = document.querySelector(".quiz_result");
const closer = document.querySelector(".closer");

let quizIndex = 0;
let score = 0;


// La fonction ascynchrone qui se charge de la récupération des données dépuis l'API
async function getQuiz() {
    let quizURL = `http://127.0.0.1:5500/public/js/hero.json`;
    const response = await fetch(quizURL);
    const data = await response.json();
    let maxIndex = data.results.length -1;
    function loadQuiz(ds){
        quizContents.style.display="block";
        questionCtx.style.visibility="visible";
        headOfQuestion.style.visibility="visible";
        questionRank.textContent = quizIndex+1;
        let actualQuizs = ds.question;
        questionCtx.textContent = `${actualQuizs} ?`;
        quizThumb.innerHTML = "<img src="+ds.thumb+">";
        document.querySelector(".answer1").textContent = ds.answers[0];
        document.querySelector(".answer2").textContent = ds.answers[1];
        document.querySelector(".answer3").textContent = ds.answers[2];

    } 
    Button.addEventListener("click", function(){
        setTimeout(() => {
            if (quizIndex > maxIndex) {
                quizIndex = 0;
                quizContents.style.display="none"
                quiz_result.style.display="block";
                Button.style.display= "none";
                const result_text = [
                    "Oulo! Hereusement que le Riddler est sous les verrous... Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vue ! Aller, rien n'est persu ! ",
                    "Encore un peu d'entrainnement avec le Chevalier Noir vous serait bénéfique, mais vous pouvez marcher la tête haute vos connaissances sont là. A vous de le consolider, foncez Gothaman est votre terrain de chose",
                    "Vous êtes véritablement un super fan de l'univers de Batman! Comics, Films, rien ne vous échappe. Bruce Wayane a de quoi être fier, Gothaman est en paix et Batman peut prendre sa retraite, vous veuillez aux grains !"
                ]
                if (score <10) {
                    document.querySelector('.quiz_result_encouragement').textContent = result_text[0];
                    document.querySelector('.quiz_esul_text').textContent= `${score}/15. C'EST PAS TOUT A FAIT CA`
                }else if( score<14){
                    document.querySelector('.quiz_result_encouragement').textContent = result_text[1];
                    document.querySelector('.quiz_esul_text').textContent= `${score}/15.PAS MAL`;
                }else if(score>=14){
                    document.querySelector('.quiz_result_encouragement').textContent = result_text[2];
                    document.querySelector('.quiz_esul_text').textContent= `${score}/15. BRAVO !`;
                }
            }else {
                loadQuiz(data.results[quizIndex]);
                let correct = data.results[quizIndex].correct_answer;
                quizIndex++;
                let answers = document.querySelectorAll(".answer");
                answers.forEach(function(answer){
                    // On teste si un element est selectionné
                    if(answer.checked){
                        let selectedAnswer = answer.nextSibling.textContent;
                        if (selectedAnswer == correct) {
                            score+=1;
                        }
                        console.log(correct);
                    }
                })
                Button.innerHTML = "Question suivante";
            }
        }, 500);
    })

    // On reload la page à chaque fois que l'utilisateur ferme le popUp de resultat et le bouton recommencer
    closer.addEventListener("click", function(){
        window.location.reload();
    })
    
    document.querySelector("#result").addEventListener("click",function(){
        window.location.reload();
          
    });
}
getQuiz()