
let QstnCls = {
    isCorrectAnswer(ans){
        return ans === this.answer;
    }
}
function Question( qstn, choices, ans){
    this.text = qstn;
    this.choices = choices;
    this.answer = ans;
}
Question.prototype = QstnCls;
Question.prototype.constructor = Question;

let QuizCls = {
    getCurrentQuestion(){
        this.currentQstn = this.questions[this.questionIndex];
    },
    checkOptionWithAnswer( ans ){
        if( this.currentQstn.isCorrectAnswer(ans)){
            this.score++;
        }
        this.questionIndex++;
        },
    done(){
        return this.questionIndex >= this.questions.length;
    }
}
function Quiz( questions ){
    this.questions= questions;
    this.score = 0;
    this.questionIndex = 0;
    this.currentQstn;
}
Quiz.prototype = QuizCls;
Quiz.prototype.constructor = Quiz;

function loadQuestion(){
    if(varQuiz.done()){
        showScore();
        return;
    }
    varQuiz.getCurrentQuestion();
    let currentQstn = varQuiz.currentQstn
    const qstnEl = document.getElementById('question');
    qstnEl.textContent = currentQstn.text;

    for( let i=0; i < currentQstn.choices.length; i++){
        const curntChoice = currentQstn.choices[i];
        document.getElementById('choice'+i).textContent = curntChoice;
        handleSelect('btn'+i,curntChoice)
    }
    showProgress();
}

function handleSelect(id, choice){
    document.getElementById( id ).onclick = function(){
        varQuiz.checkOptionWithAnswer(choice);
        loadQuestion();
    }
}

function showProgress(){
    const progress = document.getElementById('progress');
    progress.textContent = `Question ${varQuiz.questionIndex+1} of ${varQuiz.questions.length}`
}

function showScore(){
    document.getElementById( 'quiz').innerHTML = `
    <h1>Result</h>
    <br><h2 class='score'>Your score ${varQuiz.score}</h2>
    <br><h2 class='score'>Questions correctly answered ${(varQuiz.score/varQuiz.questions.length)*100}% </h2>
    `;
}

 const questions = [
    new Question("What are the types of advice?", ["then, after, after-returning, after-throwing, around", "When, after, after-returning, around","Where, after, after-returning, after-throwing, around", "Before, after, after-returning, after-throwing, around"], "Before, after, after-returning, after-throwing, around"),
    new Question("What is the scope of bean in portlet context?", ["session", "global-session", "prototype", "request"], "global-session"),
    new Question("Which are the modules of core container?", ["Beans, Core, Context, SpEL", "Core, Context, ORM, Web","Core, Context, Aspects, Test", "Bean, Core, Context, Test"], "Beans, Core, Context, SpEL"),
    new Question("What is prototype scope?", ["This scopes a single bean definition to have any number of object instances.", "This scopes the bean definition to a single instance per HTTP Request.", "This scopes the bean definition to a single instance per HTTP Session.", "This scopes the bean definition to a single instance per HTTP Application/ Global session."], "This scopes a single bean definition to have any number of object instances."),
    new Question("How to write an IF statement in JavaScript? ", ["if i = 5", "if i == 5 then", "if (i == 5) ", "if i = 5 then"], "if (i == 5) ")
];

let varQuiz = new Quiz ( questions );
loadQuestion();