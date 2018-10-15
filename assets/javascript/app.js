/**
 * Constants
 */
const ONE_SECOND_IN_MSECS = 1000;
const MAX_ANSWER_TIME_IN_SECS = 10;
const CORRECT_ANSWER_STRING = "The Correct Answer is: ";


/**
 * Global Variables
 */
var m_correct_answer_count ;
var m_incorrect_answer_count;
var m_did_not_answer_count;
var m_current_active_question ;
var m_time_elapsed_in_secs ;
var m_one_sec_timer_id;
var m_three_sec_timer_id;

var question_answer_array = [

    /* Question */                                /* Ans - Option1 */   /* Ans - Option2 */   /* Ans - Option3*/      /* Ans - Option4*/       /* Correct Ans Id */
    ["What's North Carolina's Nickname",          "The 12th State",     "The Golden State",   "The Tar Heel State",   "The SunShine State",    "answer-option-3"],
    ["What's North Carolina's Approx Population", "4 Million",          "17 Million",         "10 Million",           "29 Million",            "answer-option-3"],
    ["What's North Carolina's State Bird",        "Cardinal",           "Yellow Hammer",      "Wild Turkey",          "American Robin",        "answer-option-1"],
    ["What's North Carolina's State Beverage",    "Sweet Tea",          "Beer",               "Red Wine",             "Milk",                  "answer-option-4"],
    ["Pepsi was Invented in which NC City",       "Durham",             "New Bern",           "Greensboro",           "Charlotte",             "answer-option-2"]

];



/**
 * This function enables the Answer Option Buttons - this is done 
 * when we display the question and the possible answers.
 */

function enableAnswerButtons () {
    $('#answer-option-1').prop("disabled", false);
    $('#answer-option-2').prop("disabled", false);
    $('#answer-option-3').prop("disabled", false);
    $('#answer-option-4').prop("disabled", false);
}

/**
 * This function disables the Answer Option Buttons - this is done 
 * when user has selected an answer.
 */

 function disableAnswerButtons () {
    $('#answer-option-1').prop("disabled", true);
    $('#answer-option-2').prop("disabled", true);
    $('#answer-option-3').prop("disabled", true);
    $('#answer-option-4').prop("disabled", true);
}



/**
 *  This function displays the currently active question and the possible
 *  answer options. Starts the timer 
 */
function showQuestion() {

    // get the current question and the possible answers
    var question_str = question_answer_array[m_current_active_question][0];
    var answer_option_1_str = question_answer_array[m_current_active_question][1];
    var answer_option_2_str = question_answer_array[m_current_active_question][2];
    var answer_option_3_str = question_answer_array[m_current_active_question][3];
    var answer_option_4_str = question_answer_array[m_current_active_question][4];

    //enable Answer Buttons
    enableAnswerButtons();

    //hide the correct answer field
    $("#correct-answer-field").css("display", "none");
    
    // display the question and the possible answer options
    $("#question-area").text(question_str);
    $("#answer-option-1").text(answer_option_1_str);
    $("#answer-option-2").text(answer_option_2_str);
    $("#answer-option-3").text(answer_option_3_str);
    $("#answer-option-4").text(answer_option_4_str);

    // clear the time elapsed 
    m_time_elapsed_in_secs = 0;

    // start the one second timer, so that we can update the time-left 
    $("#timer-countdown").text("TIME LEFT: " + MAX_ANSWER_TIME_IN_SECS);
    m_one_sec_timer_id = setInterval(oneSecTimerFunction, ONE_SECOND_IN_MSECS);

}


/**
 * This function is called to start a new game session. 
 * It starts with first question.
 */

function gameStart() {

    //set first question as the current active question 
    m_current_active_question = 0;

    // clear game stats
    m_correct_answer_count =0;
    m_incorrect_answer_count =0;
    m_did_not_answer_count =0;

    // Now start showing the counter and question area
    $("#timer-countdown").css("display", "block");
    $("#question-area").css("display", "block");
    $("#correct-answer-field").css("display", "block");
    $("#answer-options").css("display", "block");
    $(".btn-group").css("display", "block");

    // display the active question and its possible answers
    showQuestion();

}


/**
 * This function is called after user is done with a question. 
 * It determines if user has answered all questions, if not 
 * it makes the next question as active and game continues.
 * 
 * If all questions are answered, the final game stats are 
 * displayed along with an option to replay the game.
 */
function goToNextQuestion() {

    // are we done yet?
    if (m_current_active_question < question_answer_array.length-1) {

       // there are more questions to be answered. Make the next question as active 
       m_current_active_question++;

       // display the active question and its possible answers
       showQuestion();
   }
   else {

       // Game over - display final result
       var result_str = "<p> GAME OVER! </p>" + "<p>Correct: " + m_correct_answer_count + "</p>" + "<p>InCorrect: " + m_incorrect_answer_count + "</p>" +  "<p>Did not Answer: " + m_did_not_answer_count + "</p>";
       
       $("#timer-countdown").html(result_str);
       $("#question-area").css("display", "none");
       $("#correct-answer-field").css("display", "none");
       $("#answer-options").css("display", "none");
       $(".btn-group").css("display", "none");

       /**
        * Enable the restart button - this give user an option to play the game again
        */
       $("#restart-button").css("display", "block");

   }

}

/**
 * This function displays the correct answer for the active question in the 
 * correct-answer-field.
 */

function show_correct_answer() {

    var correct_answer_index = question_answer_array[m_current_active_question][5].replace("answer-option-", "");
   
    $("#correct-answer-field").text(CORRECT_ANSWER_STRING + question_answer_array[m_current_active_question][correct_answer_index]);
    $("#correct-answer-field").css("display", "block");


}

/**
 * This function is called to Start the game
 */
function gameStartHandler() {

    //remove the section holding the game start button as we never go back to it.
    $(".game-start-section").remove();

    // start the game 
    gameStart();
     
}

/**
 * One Second Timer Function - this function is activated every second. 
 * it is used to display time left to answer the question. If time is UP
 * it displays the correct answer.
 */
function oneSecTimerFunction() {
    var time_left;
    
    m_time_elapsed_in_secs++;

    time_left = MAX_ANSWER_TIME_IN_SECS - m_time_elapsed_in_secs;
    if (time_left > 0) {
    
        // show time left
        $("#timer-countdown").text("TIME LEFT: " + time_left);
     
    } else {
        
        //stop the running timer
        clearInterval(m_one_sec_timer_id);

        m_did_not_answer_count++;

        // show the time up message
        $("#timer-countdown").text("TIME UP!!");

        // show correct answer
        show_correct_answer();

        //Give one second to display the correct answer
        setTimeout(goToNextQuestion, ONE_SECOND_IN_MSECS);

    }

}



/**
 * This function is activated when the user select one of the possible 
 * answer to the currently active question. 
 * It determines if the user answered correctly or not and accordingle
 * updates the game stats. 
 * 
 * @param {*} event : used to determine which answer did the player select
 */
function answerButtonHandler(event) {
    
    var option_selected = event.currentTarget.id;

    // cancel the one second timer
    clearInterval(m_one_sec_timer_id);

    //disable the answer option buttons
    disableAnswerButtons();

    if (option_selected === (question_answer_array[m_current_active_question][5])) {
        // player answer is correct
        m_correct_answer_count++;
        $("#timer-countdown").text("Correct!!");
    }
    else {
        // player answer is incorrect
        m_incorrect_answer_count++;
        $("#timer-countdown").text("InCorrect!!");
        // show correct answer
        show_correct_answer();
    }

    // wait for a second before going to the next question.
    setTimeout(goToNextQuestion, ONE_SECOND_IN_MSECS);
}

/**
 * This function is called when the player opts to replay the game 
 * after one complete session
 */
function reStartGameHandler() {

    $("#restart-button").css("display", "none");
    gameStart();
}

/**
 * Registering the handlers for 'click' event of various buttons.
 * This is done on page load.
 */
$('#start-button').on('click', gameStartHandler);
$('#restart-button').on('click', reStartGameHandler);
$('#answer-option-1').on('click', answerButtonHandler);
$('#answer-option-2').on('click', answerButtonHandler);
$('#answer-option-3').on('click', answerButtonHandler);
$('#answer-option-4').on('click', answerButtonHandler);