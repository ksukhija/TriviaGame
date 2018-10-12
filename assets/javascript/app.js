var correct_answer_count=0;
var incorrect_answer_count=0;
var current_active_question=0;

var question_answer_array = [

    /* Question */                              /* Ans - Option1 */   /* Ans - Option2 */   /* Ans - Option3*/      /* Ans - Option4*/       /* Correct Ans Id */
["What's North Carolina's Nickname",            "The 12th State",    "The Golden State",   "The Tar Heel State",   "The SunShine State",       "answer-option-3"],
["What's North Carolina's Approx Population",   "4 Million",         "17 Million",         "10 Million",           "29 Million",               "answer-option-3"],
["What's North Carolina's State Bird",          "Cardinal",          "Yellow Hammer",      "Wild Turkey",          "American Robin",           "answer-option-1"]

];


function gameStartHamdler() {
    //remove the section holding the button as we never go back to it.
    $(".game-start-section").remove();

    // Now start showing the counter and question area
    $("#timer-countdown").css("display", "block");
    $("#question-area").css("display", "block");
    $("#answer-options").css("display", "block");
    $(".btn-group").css("display", "block");
    
    current_active_question =2;
    //show first question 
     //show_question(1);
     show_question();
    // show_question(3);
     // start timer

}

function answerButtonHandler (event) {
    var option_selected  = event.currentTarget.id;
    
    if(option_selected == question_answer_array[current_active_question][5])
    {
        alert("You selected Correct Answer");
    }
    else {
        alert("You selected Wrong Answer");
    }

    }
    
}


function show_question() {

    var question_str = question_answer_array[current_active_question][0];
    var answer_option_1_str = question_answer_array[current_active_question][1];
    var answer_option_2_str = question_answer_array[current_active_question][2];
    var answer_option_3_str = question_answer_array[current_active_question][3];
    var answer_option_4_str = question_answer_array[current_active_question][4];

    $("#question-area").text(question_str);
    $("#answer-option-1").text(answer_option_1_str);
    $("#answer-option-2").text(answer_option_2_str);
    $("#answer-option-3").text(answer_option_3_str);
    $("#answer-option-4").text(answer_option_4_str);
    


}


$('button').on('click', gameStartHamdler);
$('#answer-option-1').on('click', answerButtonHandler);
$('#answer-option-2').on('click', answerButtonHandler);
$('#answer-option-3').on('click', answerButtonHandler);
$('#answer-option-4').on('click', answerButtonHandler);