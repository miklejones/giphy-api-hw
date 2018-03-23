//Setup Variables
//==================================
var feelings = ["sad", "happy", "hurt", "helped", "insecure", "confident", "tired", "energized"]








//Functions
//==================================

//Function to add feeling as a button
function newBtn(emotion) {
    //jQuery to create button from the given emotion
    var newBtn = "<button class='emotionBtn'>" + emotion + "</button>";
    $('.emotionBtns').append(newBtn);
}








//Main Process
//==================================
$(document).ready(function () {


    //Loop to add feelings to DOM
    for (let f = 0; f < feelings.length; f++) {
        let emotion = feelings[f];
        newBtn(emotion);
    };


})