
var startButton = document.getElementById("start-quiz");
var Timer = document.getElementById("timer");
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
                    answer: "push"
                },


                ];


startButton.addEventListener("click",function(totalQuizTime)
    {
        //start the timer
        var totalQuizTime = 10;
        var quizIntroObj = document.getElementById("quiz-intro");

        var countdownTimer = setInterval(function()
            {
                totalQuizTime = totalQuizTime - 1;
                document.getElementById("timer").innerHTML = "Time Remaining: " + totalQuizTime + " seconds";
                document.getElementById("timer").style = "white";
                if (totalQuizTime <= 20  && totalQuizTime > 10)
                    {
                        document.getElementById("timer").style.color = "orange";
                    }                    
                if(totalQuizTime <= 10 && totalQuizTime>0)
                    {
                    document.getElementById("timer").style.color = "red";
                    }            
                if (totalQuizTime==0)
                    {       
                        clearInterval(countdownTimer);
                        document.getElementById("timer").style.color = "maroon";    
                    }
        
            }, 1000);

        //clear the button and Introductory page
        quizIntroObj.remove();

    });


// select a random question from the list
//function questionMaker
    // create an element for the question
    // append the
    // for every answer
        // create an element 

// on click 