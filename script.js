
 /*TODO: add a storage for the scoreboard 
        clean up code
        create a function on click in which the scoreboard appears*/

// Plan  17 NOV 2019
// Create a timer function ---- complete
// Build a button ---> complete
    // that starts the timer function when it goes on --> complete
    // clears the quiz area (clear function) --> complete

// create a function that
    // creates an heading element for the question
        // innerHTML is the question
        // appends to the quiz-box element
    //for each choice:
        // creates a div element for the choice

//clear function 
    // Removes all elements within the quiz area, --> done 
    // stops timer 


// variables
var timeKeeper; //= setInterval(timerHandler,1000);
var quizBox = document.getElementById("quiz-box");
var timer = document.getElementById("timer");
var is_TimerRunning = false;
var startButton = document.getElementById("start-quiz");
var totalTime = 75; // Amount of time for quiz
var quizTime = 75; // current quiz time
var questionNumber = 0;
var maxScore = 75; 

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
        console.log("quizTime");
        
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
        var timeElapsed = totalTime - quizTime;
        var Score = maxScore - timeElapsed;
        if(Score < 0 )
            {
                Score = 0;
            }
        var scoreObj = document.createElement("div");
        scoreObj.innerHTML = "Final Score:"+ Score + " points!";
        scoreObj.style.fontSize = "2em"; 
        quizBox.appendChild(scoreObj);
    }

function quizComplete()
    {
        is_TimerRunning = false;
        clearQuizBox();
        clearInterval(timeKeeper);
        timer.remove();
        finalScore();
    }
// event listeners


// Start Quiz
startButton.addEventListener("click", function()
    {
        clearQuizBox();
        is_TimerRunning = true;
        timeKeeper = setInterval(timerHandler,1000);
        poseQuestion(questionNumber);
    });










// Previous code for reference 
/*        
var startButton = document.getElementById("start-quiz");
var Timer = document.getElementById("timer");
var quizBox = document.getElementById("quiz-box"); // element of DOM which contains the Quiz UI
var totalQuizTime = 75;
var quizQuestion = document.createElement("div");
var incorrectAlert = document.createElement('div');
var scoreObj = document.createElement("div");
var viewScores = document.getElementById("view-scores");
var quizIntroObj = document.getElementById("quiz-intro");
var stopTime = false;
// Object to ask questions
var score = 0;
var questionNumber = 0;


function poseQuestion(iteration)
    //pose Question takes the input iteration and selects that problem from the array problem and creates the elements: choice, quizQuestion  
    {
        // create a div element with the Question title as the inner text HTML
        quizQuestion.innerHTML = questions[iteration]["title"];
        quizQuestion.setAttribute("id","quiz-question");
        quizQuestion.setAttribute("style","font-size: 2em");
        quizBox.appendChild(quizQuestion);

        for(var jj = 0 ; jj <= questions[iteration]["choices"].length; jj++)
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
startButton.addEventListener("click",function()
    {
        var countdownTimer = setInterval(function()
            {
                totalQuizTime = totalQuizTime - 1;
                document.getElementById("timer").innerHTML = "Time Remaining: " + totalQuizTime + " seconds";
                document.getElementById("timer").style = "white";
                if (totalQuizTime > 0)
                    {
                        score = totalQuizTime; 
                    }
                else
                    { 
                        clearBoard();
                        score = 0;
                    }

                if (questionNumber>= questions.length)
                    {
                        clearInterval(countdownTimer);
                        clearBoard();
                        generateScoreboard();
                    }

                // Change color as time runs out
                if (totalQuizTime <= 20  && totalQuizTime > 10)
                    {
                        Timer.style.color = "orange";
                    }                    
                if(totalQuizTime <= 10 && totalQuizTime>0)
                    {
                        Timer.style.color = "red";
                    }            
                if (totalQuizTime<=0)
                    {       
                        clearInterval(countdownTimer);
                        Timer.style.color = "maroon";    
                        Timer.innerHTML= "Time Remaining: 0 seconds";
                        generateScoreboard();

                    }
            }, 1000);

        //clear the button and Introductory page
        quizIntroObj.remove();

        //generate question one 
        poseQuestion(questionNumber);

    });

function correctSelection()
    {   alert("correct!");
        // clear the previous incorrect alert and question
        var quizQuestion = document.getElementById("quiz-question");
        var incorrectAlert = document.getElementById("incorrect-alert");
        questionNumber++;  
        quizQuestion.remove();

        if(incorrectAlert != null)
            {
                incorrectAlert.remove();
            }
        console.log(questionNumber);
        if (questionNumber < questions.length)
            {
               
                poseQuestion(questionNumber);
            }
    }  

function incorrectSelection()
    {
        incorrectAlert.innerHTML = " Incorrect!" ;
        incorrectAlert.setAttribute("id","incorrect-alert")
        totalQuizTime = totalQuizTime - 15;
        quizBox.appendChild(incorrectAlert);
    }





function clearBoard(){
    stopTime = true;
    Timer.remove();
    if(incorrectAlert != null)
            {
                incorrectAlert.remove();
            }
    if(quizIntroObj != null)
        {
            quizIntroObj.remove();
        }
    if(quizQuestion != null)
        {
            quizQuestion.remove();
        }
    
    
}


function generateScoreboard()
    {
        
        scoreObj.setAttribute("id","scoreboard");
        scoreObj.innerHTML = "Your Score is: " + score;
        quizBox.appendChild(scoreObj); 
    
    }

viewScores.addEventListener("click",function()
    {
        clearBoard();
        // find storage
        // make a list from greatest to least of obj{}
    });

/*Minimum Requirements

TO DO 
Functional, deployed application. --- done 
GitHub repository with README describing project.
The first view of the application displays a button that starts the quiz. --- done
Clicking the start button displays a series of questions. --- done 
Once the quiz begins, a timer starts. --- done 
If a question is answered incorrectly, additional time is subtracted from the timer. --- done 
The timer stops when all questions have been answered or the timer reaches 0. --- done 
After the game ends, the user can save their initials and score to a highscores view using local storage. 



Bonus


Add audio files to alert the user of correct or incorrect answers. Be sure to include the appropriate license.
Customize the application theme.
Create multiple quizzes and an option for users to choose between them.
Add the application to your portfolio.

*/
