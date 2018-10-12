var m_correct_answer_count = 0;
var m_incorrect_answer_count = 0;
var m_did_not_answer_count=0;
var m_current_active_question = 0;
var m_time_elapsed_in_secs = 0;

var m_thirty_sec_timer_id;
var m_three_sec_timer_id;

const ONE_SECOND_IN_MSECS = 1000;
const ONE_SECOND_IN_MSECS = 1000;

const MAX_ANSWER_TIME = 30;
const MAX_QUESTIONS = 3;

const CORRECT_ANSWER_STRING = "The Correct Answer is: ";

var question_answer_array = [

    /* Question */                                /* Ans - Option1 */   /* Ans - Option2 */   /* Ans - Option3*/      /* Ans - Option4*/       /* Correct Ans Id */
    ["What's North Carolina's Nickname", "The 12th State", "The Golden State", "The Tar Heel State", "The SunShine State", "answer-option-3"],
    ["What's North Carolina's Approx Population", "4 Million", "17 Million", "10 Million", "29 Million", "answer-option-3"],
    ["What's North Carolina's State Bird", "Cardinal", "Yellow Hammer", "Wild Turkey", "American Robin", "answer-option-1"]

];

function gameStart() {

    // Now start showing the counter and question area

    m_current_active_question = 1;
    //show first question 
    //show_question(1);
    show_question();


}

function gameStartHandler() {

    alert("at the game start handler");
    //remove the section holding the button as we never go back to it.
    $(".game-start-section").remove();

    $("#timer-countdown").css("display", "block");
    $("#question-area").css("display", "block");
    $("#correct-answer-field").css("display", "block");
    $("#answer-options").css("display", "block");
    $(".btn-group").css("display", "block");

     gameStart();

    // show_question(3);
    // start timer

}


function oneSecTimerFunction() {
    var time_left;

    m_time_elapsed_in_secs++;

    time_left = MAX_ANSWER_TIME - m_time_elapsed_in_secs;
    if (time_left > 0) {
        // show time left
        $("#timer-countdown").text("TIME LEFT: " + time_left);

    } else {
        //stop the timer 
        clearTimeout(m_thirty_sec_timer_id);

        m_did_not_answer_count++;

        // show the time up message
        $("#timer-countdown").text("TIME UP!!");

        $("#correct-answer-field").text(CORRECT_ANSWER_STRING + question_answer_array[m_current_active_question][5]);

        //start a 3 second timer
        m_three_sec_timer_id = setTimeout(answerTimout, THREE_SECOND_IN_MSECS);

    }


}

function goToNextQuestion() {

     // go to the next question
     if (m_current_active_question < MAX_QUESTIONS) {

        m_current_active_question++;
        show_question();
    }
    else {
        //display final result
        alert ("Game Over");
    }

}

function answerTimout() {

m_did_not_answer_count++;
goToNextQuestion();

}

function answerButtonHandler(event) {
    var option_selected = event.currentTarget.id;

    if (option_selected == question_answer_array[m_current_active_question][5]) {
        m_correct_answer_count++;
    }
    else {
        m_incorrect_answer_count++;
    }

    goToNextQuestion();

}




function show_question() {

    var question_str = question_answer_array[m_current_active_question][0];
    var answer_option_1_str = question_answer_array[m_current_active_question][1];
    var answer_option_2_str = question_answer_array[m_current_active_question][2];
    var answer_option_3_str = question_answer_array[m_current_active_question][3];
    var answer_option_4_str = question_answer_array[m_current_active_question][4];

    $("#question-area").text(question_str);
    $("#answer-option-1").text(answer_option_1_str);
    $("#answer-option-2").text(answer_option_2_str);
    $("#answer-option-3").text(answer_option_3_str);
    $("#answer-option-4").text(answer_option_4_str);

    m_time_elapsed_in_secs = 0;
    m_thirty_sec_timer_id = setTimeout(oneSecTimerFunction, ONE_SECOND_IN_MSECS);


}

function reStartGameHandler() {

    $("#restart-button").css("display", "none");
    gameStart();

}



$('button').on('click', gameStartHandler);
$('#restart-button').on('click', reStartGameHandler);
$('#answer-option-1').on('click', answerButtonHandler);
$('#answer-option-2').on('click', answerButtonHandler);
$('#answer-option-3').on('click', answerButtonHandler);
$('#answer-option-4').on('click', answerButtonHandler);