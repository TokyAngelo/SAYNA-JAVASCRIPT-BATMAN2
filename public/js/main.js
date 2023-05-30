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

async function getQuiz() {
    let quizURL = `http://127.0.0.1:5500/public/js/hero.json`;
    const response = await fetch(quizURL);
    const data = await response.json();
    let maxIndex = data.results.length -1;
    let correct = data.results.correct_answer
    
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

                for(let answer of answerEls){
                    answer.addEventListener("click", function(){
                        if(this.textContent == correct){
                            score ++;
                        }
                    })
                }
                document.querySelector(".gotScore").textContent = score;
            }else {
                loadQuiz(data.results[quizIndex]);
                quizIndex++;
                Button.innerHTML = "Question suivante";
            }
            console.log(score);
        }, 500);
    })
    closer.addEventListener("click", function(){
        quiz_result.style.display="none";
        loadQuiz(data.results[quizIndex]);
    })
    
    document.querySelector("#result").addEventListener("click",function(){
        quiz_result.style.display="none";
        setTimeout(() => {
            loadQuiz(data.results[quizIndex]);
            Button.style.display= "block";
        }, 1000);
    });
}



getQuiz()