
var startButton = document.getElementById("start-quiz");
var Timer = document.getElementById("timer");
var quizBox = document.getElementById("quiz-box"); // element of DOM which contains the Quiz UI
var totalQuizTime = 75;
var incorrectAlert = document.createElement('div');
// Object to ask questions
var score = 75;
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
                ];


startButton.addEventListener("click",function()
    {
    
        var quizIntroObj = document.getElementById("quiz-intro");

        var countdownTimer = setInterval(function()
            {
                totalQuizTime = totalQuizTime - 1;
                document.getElementById("timer").innerHTML = "Time Remaining: " + totalQuizTime + " seconds";
                document.getElementById("timer").style = "white";

                if (questionNumber>= questions.length)
                    {
                        clearInterval(countdownTimer);
                        score = totalQuizTime;
                        alert(score);  /// CHANGE so that it  outputs an input for scoreboard;
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
        if (questionNumber <= questions.length)
            {
               
                poseQuestion(questionNumber);
            }
        else
            {
                clearInterval(countdownTimer);
                //show Scoreboard
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
        var quizQuestion = document.createElement("div");
        quizQuestion.innerHTML = questions[iteration]["title"];
        quizQuestion.setAttribute("id","quiz-question");
        quizQuestion.setAttribute("style","font-size: 2em");
        quizBox.appendChild(quizQuestion);

        for(var jj = 0 ; jj <= questions[iteration]["choices"].length-1; jj++)
            {        
                if(questions[iteration]["choices"][jj] == questions[iteration]["answer"])
                    {
                        var choice = document.createElement("div");
                        choice.innerHTML=questions[iteration]["choices"][jj];
                        choice.setAttribute("id","answer");
                        choice.setAttribute("onclick","correctSelection()")
                        quizQuestion.appendChild(choice);
                    }
                else
                    {
                        var choice = document.createElement("div");
                        choice.innerHTML=questions[iteration]["choices"][jj];
                        choice.setAttribute("id","wrong");
                        choice.setAttribute("onclick","incorrectSelection()");
                        quizQuestion.appendChild(choice);
                    }

            }
        
    }


