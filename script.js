
// when the start button is clicked(getElementById)
    // start countdown timer
    // pick random question from list of questions
var totalQuizTime = 25;


    
document.getElementById("start-quiz").addEventListener("click",function()
    {
        //start the timer
        
        var countdownTimer = setInterval(function()
        {
            totalQuizTime = totalQuizTime - 1;
            document.getElementById("timer").innerHTML = "Time Remaining: " + totalQuizTime + " seconds";
        
        

            if(totalQuizTime < 20)
                {
                    document.getElementById("timer").style.color = "orange";
                }
            else if(totalQuizTime < 10)
                {
                    document.getElementById("timer").style.color = "red";
                }
            else if(totalQuizTime === 0)
                {   
                    clearInterval(countdownTimer);
                    document.getElementById("timer").style.color = "maroon";
                }
    
        }, 1000);
    });



