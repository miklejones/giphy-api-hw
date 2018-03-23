//Setup Variables
//==================================
var feelings = ["sad", "happy", "hurt", "helped", "insecure", "confident", "tired", "energized"];

var allFeelings = [];

var authKey = "jVuZK9CxhiLm1SiZmlMtg6djlkDeX9C3";

//URL Base
var queryURLBase = 'https://api.giphy.com/v1/gifs/search?api_key=' + authKey;






























//Functions
//==================================

//Function to add feeling as a button
function newBtn(emotion) {
    allFeelings.push(emotion);
    //jQuery to create button from the given emotion
    var newBtn = "<button id='emotionBtn'>" + emotion + "</button>";
    $('.emotionBtnsList').append(newBtn);

}

function runQuery(numArticles, queryURL) {
    //Ajax
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (GIFData) {
            console.log(GIFData);
        })

}




























//Main Process
//==================================
$('.emotionBtnsList').on('click', 'button#emotionBtn', function () {
    // queryTerm = 
    // runQuery(10, '');
    console.log(this);

});


$('#addEmotion').on('click', function () {
    event.preventDefault();
    var emotionAdd = $('#emotion-input').val().trim();
    if (allFeelings.includes(emotionAdd)) {
        alert('You already added that emotion.');
    } else {
        newBtn(emotionAdd);
    };
});


$(document).ready(function () {


    //Loop to add feelings to DOM
    for (let f = 0; f < feelings.length; f++) {
        let emotion = feelings[f];
        newBtn(emotion);
    };


});