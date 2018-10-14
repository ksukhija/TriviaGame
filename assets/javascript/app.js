var m_correct_answer_count ;
var m_incorrect_answer_count;
var m_did_not_answer_count;
var m_current_active_question ;
var m_time_elapsed_in_secs ;

var m_one_sec_timer_id;
var m_three_sec_timer_id;

const ONE_SECOND_IN_MSECS = 1000;
const THREE_SECOND_IN_MSECS = 3000;

const MAX_ANSWER_TIME = 10;
const MAX_QUESTIONS = 3;

const CORRECT_ANSWER_STRING = "The Correct Answer is: ";

var question_answer_array = [

    /* Question */                                /* Ans - Option1 */   /* Ans - Option2 */   /* Ans - Option3*/      /* Ans - Option4*/       /* Correct Ans Id */
    ["What's North Carolina's Nickname", "The 12th State", "The Golden State", "The Tar Heel State", "The SunShine State", "answer-option-3"],
    ["What's North Carolina's Approx Population", "4 Million", "17 Million", "10 Million", "29 Million", "answer-option-3"],
    ["What's North Carolina's State Bird", "Cardinal", "Yellow Hammer", "Wild Turkey", "American Robin", "answer-option-1"]

];



function showQuestion() {

    var question_str = question_answer_array[m_current_active_question][0];
    var answer_option_1_str = question_answer_array[m_current_active_question][1];
    var answer_option_2_str = question_answer_array[m_current_active_question][2];
    var answer_option_3_str = question_answer_array[m_current_active_question][3];
    var answer_option_4_str = question_answer_array[m_current_active_question][4];

    console.log(" at showQuestion");

    $("#correct-answer-field").css("display", "none");
    $("#question-area").text(question_str);
    $("#answer-option-1").text(answer_option_1_str);
    $("#answer-option-2").text(answer_option_2_str);
    $("#answer-option-3").text(answer_option_3_str);
    $("#answer-option-4").text(answer_option_4_str);

    m_time_elapsed_in_secs = 0;
    $("#timer-countdown").text("TIME LEFT: " + MAX_ANSWER_TIME);
    m_one_sec_timer_id = setInterval(oneSecTimerFunction, ONE_SECOND_IN_MSECS);


}


function gameStart() {

    console.log(" at gameStart");

    // Now start showing the counter and question area

    m_current_active_question = 0;

    m_correct_answer_count =0;
    m_incorrect_answer_count =0;
    m_did_not_answer_count =0;

    $("#timer-countdown").css("display", "block");
    $("#question-area").css("display", "block");
    $("#correct-answer-field").css("display", "block");
    $("#answer-options").css("display", "block");
    $(".btn-group").css("display", "block");

    
    showQuestion();

}

function goToNextQuestion() {

    console.log(" at goToNextQuestion");

    // go to the next question
    if (m_current_active_question < MAX_QUESTIONS-1) {

       m_current_active_question++;
       showQuestion();
   }
   else {
       //display final result
       var result_str = "<p> GAME OVER! </p>" + "<p>Correct:" + m_correct_answer_count + "</p>" + "<p>InCorrect:" + m_incorrect_answer_count + "</p>" +  "<p>Did not Answer:" + m_did_not_answer_count + "</p>";
       $("#timer-countdown").html(result_str);
       $("#question-area").css("display", "none");
       $("#correct-answer-field").css("display", "none");
       $("#answer-options").css("display", "none");
       $(".btn-group").css("display", "none");

       $("#restart-button").css("display", "block");

   }

}


function show_correct_answer() {

    console.log(" at show_correct_answer");
    

    var correct_answer_index = question_answer_array[m_current_active_question][5].replace("answer-option-", "");
   
    $("#correct-answer-field").text(CORRECT_ANSWER_STRING + question_answer_array[m_current_active_question][correct_answer_index]);
    $("#correct-answer-field").css("display", "block");


}

function gameStartHandler() {

    console.log(" at gameStartHandler");


    //remove the section holding the button as we never go back to it.
    $(".game-start-section").remove();

 
    gameStart();
     
}


function oneSecTimerFunction() {
    var time_left;
    
    m_time_elapsed_in_secs++;

    console.log(" at oneSecTimerFunction");
   
    time_left = MAX_ANSWER_TIME - m_time_elapsed_in_secs;
    if (time_left > 0) {
    
        console.log(" time_left = " + time_left);

        // show time left
        $("#timer-countdown").text("TIME LEFT: " + time_left);
     
    } else {
        
        console.log("time_up");

        //stop the running timer
        clearInterval(m_one_sec_timer_id);

        m_did_not_answer_count++;

        // show the time up message
        $("#timer-countdown").text("TIME UP!!");

        show_correct_answer();

        //start a 3 second timer
        setTimeout(goToNextQuestion, ONE_SECOND_IN_MSECS);

    }


}




function answerButtonHandler(event) {
    
    var option_selected = event.currentTarget.id;

    console.log(" at answerButtonHandler");



    // cancel the one second timer
    clearInterval(m_one_sec_timer_id);

    if (option_selected === (question_answer_array[m_current_active_question][5])) {
        
        m_correct_answer_count++;
        $("#timer-countdown").text("Correct!!");
        console.log("correct answer");

    }
    else {

        m_incorrect_answer_count++;
        $("#timer-countdown").text("InCorrect!!");
    console.log(" incorrect answer ");

        show_correct_answer();

    }

    setTimeout(goToNextQuestion, ONE_SECOND_IN_MSECS);


}




function reStartGameHandler() {

    console.log(" at reStartGameHandler");

    $("#restart-button").css("display", "none");
    gameStart();

}



$('#start-button').on('click', gameStartHandler);
$('#restart-button').on('click', reStartGameHandler);
$('#answer-option-1').on('click', answerButtonHandler);
$('#answer-option-2').on('click', answerButtonHandler);
$('#answer-option-3').on('click', answerButtonHandler);
$('#answer-option-4').on('click', answerButtonHandler);