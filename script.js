
 /*TODO: add a storage for the scoreboard 
        clean up code
        create a function on click in which the scoreboard appears*/



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


function poseQuestion(iteration)
    //pose Question takes the input iteration and selects that problem from the array problem and creates the elements: choice, quizQuestion  
    {
        // create a div element with the Question title as the inner text HTML
        quizQuestion.innerHTML = questions[iteration]["title"];
        quizQuestion.setAttribute("id","quiz-question");
        quizQuestion.setAttribute("style","font-size: 2em");
        quizBox.appendChild(quizQuestion);

        for(var jj = 0 ; jj <= questions[iteration]["choices"].length-1; jj++)
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