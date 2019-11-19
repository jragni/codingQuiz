
 // TODO: ask adam to troubleshoot localstorage


// variables
var viewScores = document.getElementById("view-scores");
var timeKeeper; //= setInterval(timerHandler,1000);
var quizBox = document.getElementById("quiz-box");
var timer = document.getElementById("timer");
var is_TimerRunning = false;
var startButton = document.getElementById("start-quiz");
var totalTime = 75; // Amount of time for quiz
var quizTime = 75; // current quiz time
var questionNumber = 0;
var submitObj = document.createElement("div");
var userFormObj = document.createElement("form");
var userInput = document.createElement("input");
var maxScore = 75; 
var timeElapsed = totalTime - quizTime;
var Score = maxScore - timeElapsed;
var quizTakers = [];
// Questions

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },

    {
        title: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        choices: ["last()","put()","push()","None of the above"],
        answer: "push()"
    },

    {
        title: "What is the HTML tag under which one can write the JavaScript code?",
        choices: [ 'javascript', 'scripted', 'script', 'js'],
        answer: 'script'
    },

    {
        title:"Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
        choices: ['alertbox(“GeeksforGeeks”);', 'msg(“GeeksforGeeks”);', 'msgbox(“GeeksforGeeks”);', 'alert(“GeeksforGeeks”);'],
        answer:"alert(“GeeksforGeeks”);"
    } 
    ];




// functions 

function clearQuizBox()
    {    
        while(quizBox.children.length>0)
        {
            quizBox.children[0].remove();
        }
    }

function timerHandler()
    {
        
        quizTime = quizTime - 1;

        // updates the Text on the timer element
        timer.style.color = "white";
        timer.innerHTML = "Time Remaining: " + quizTime + " seconds";
        if (is_TimerRunning == true)
        {
            if(quizTime <= 25 && quizTime> 15)
                {
                    timer.style.color = "yellow";
                }
            if( quizTime <= 15 && quizTime > 10)
                { 
                    timer.style.color = "orange";
                }
            if( quizTime <= 10)
                {
                    timer.style.color = "red";
                }
            if( quizTime <= 0)
            {
                timer.innerHTML = "Time Remaing: 0 seconds"
                timer.style.color = "maroon"
                is_TimerRunning = false;
                clearInterval(timeKeeper);
                quizComplete();
            } 
        }
        else{
            clearInterval(timeKeeper);
            quizComplete();
           
        }
        
}

function poseQuestion(iteration)
    {
        if (questionNumber< questions.length && is_TimerRunning)
            {
                var quizQuestion = document.createElement("h1");
                quizQuestion.innerHTML = questions[iteration]["title"];
                quizQuestion.setAttribute("id","quiz-question");
                quizQuestion.setAttribute("style","font-size: 2em");
                quizBox.appendChild(quizQuestion);
                for(var jj = 0 ; jj < questions[iteration]["choices"].length; jj++)
                {        
                    var choice = document.createElement("div");
                    choice.innerHTML=questions[iteration]["choices"][jj];
                    choice.setAttribute("onclick","correctSelection()")
                    if(questions[iteration]["choices"][jj] == questions[iteration]["answer"])
                        {
                            choice.setAttribute("id","answer");
                            choice.setAttribute("onclick","correctSelection()")

                        }
                    else
                        {
                            choice.setAttribute("id","wrong");
                            choice.setAttribute("onclick","incorrectSelection()");
                        }

                    quizQuestion.appendChild(choice);
                }
            }
        else
            {
                quizComplete();
            }
    }
// incorrect alert
var incorrectAlert = document.createElement("div");

function incorrectSelection()
    {
        incorrectAlert.innerHTML = " Incorrect!" ;
        incorrectAlert.setAttribute("id","incorrect-alert")
        quizTime = quizTime - 15;
        if (quizTime<0)
            {
                quizTime=0;
            }
        quizBox.appendChild(incorrectAlert);
    }

function correctSelection()
    {    
        alert("Correct!");
        questionNumber++;
        clearQuizBox();
        if (is_TimerRunning)
        {
           poseQuestion(questionNumber);
        }
    }

function finalScore()
    {   
        // time Elapsed = Total Time - quizTime 
        // Score = MaxScore - time Elapsed
        timeElapsed = totalTime - quizTime;
        Score = maxScore - timeElapsed;
        if(Score < 0 )
            {
                Score = 0;
            }
        var scoreObj = document.createElement("div");
        scoreObj.innerHTML = "Final Score:"+ Score + " points!";
        scoreObj.style.fontSize = "2em"; 
        scoreObj.style.margin = "25px";
        quizBox.appendChild(scoreObj);
    }

function storeNameNScore()
    {   
        var user = {};
        user.name = userInput.value;
        user.score = Score;
        if (localStorage.getItem("user")!= null)
        {quiztTakers = JSON.parse(localStorage.getItem("user"));}
        quizTakers.push(user);
        localStorage.setItem('user',JSON.stringify(quizTakers));
        
    }

function showScoreBoard()
    {
        clearQuizBox();
        quizTakers = JSON.parse(localStorage.getItem("user"));
        scoreBoardObj = document.createElement("div");
        scoreBoardObj.style.background ="salmon";
        scoreBoardObj.style.padding = "25px"
        // find the highest score on the scoreboard
        var headerObj = document.createElement("h1");
        headerObj.style.textDecoration = "underline";
        headerObj.innerHTML = "Scoreboard"
        quizBox.append(headerObj);
        quizBox.append(scoreBoardObj);
        for(var i = 0; i < quizTakers.length; i++)
            {
                var listObj = document.createElement("h6");
                listObj.innerHTML = i+1+". <strong> "+ quizTakers[i].name +"</strong>: <em>"+ quizTakers[i].score +" points</em>";
                listObj.setAttribute("id","scoreboardName");
                scoreBoardObj.append(listObj);
            }
        quizBox.append(scoreBoardObj);

    }



function generateUserInputForm()
    {   
        submitObj.setAttribute("id","submit")
        submitObj.innerHTML = "Submit";
        submitObj.style.padding = "10px"
        userInput.setAttribute("type","text");
        userInput.setAttribute("value","Your name");
        userInput.align = "center";
        userFormObj.appendChild(userInput)
        quizBox.appendChild(userFormObj);
        userFormObj.appendChild(submitObj);
        var submit = document.getElementById("submit");

        submit.addEventListener("click",function(e)
            {
                e.preventDefault();
                storeNameNScore();
                showScoreBoard();
            });

    }

function quizComplete()
    {
        is_TimerRunning = false;
        clearQuizBox();
        clearInterval(timeKeeper);
        timer.remove();
        finalScore();
        generateUserInputForm();
    }



// event listeners


// Start Quiz
startButton.addEventListener("click", function()
    {   // on click, the quizbox will clear and the timer will begin counting down. The function posequestion will create the question fields.
        clearQuizBox();
        is_TimerRunning = true;
        timeKeeper = setInterval(timerHandler,1000);
        poseQuestion(questionNumber);
    });


viewScores.addEventListener("click",function()
    {
        clearInterval(timeKeeper);
        timer.remove();
        showScoreBoard();
    });






