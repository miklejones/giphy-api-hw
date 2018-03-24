//Setup Variables
//==================================
var feelings = ["sad", "happy", "hurt", "helped", "insecure", "confident", "tired", "energized"];

var allFeelings = [];

var authKey = "jVuZK9CxhiLm1SiZmlMtg6djlkDeX9C3";

var queryTerm = '';

var numResults = 0;

var GIFData = {};

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

            for (let i = 0; i < 10; i++) {
                let GIFurl = GIFData.data[i].embed_url;
                console.log(GIFurl);

                //Start dumping to html
                var cardSection = $('<div>');
                cardSection.addClass('card');
                cardSection.attr('id', 'articleCard-' + i);
                $('#emotions').append(cardSection);

                // Attach the content to the appropriate card
                $('#articleCard-' + i).append(GIFurl);
            }


            // console.log(GIFData);
            // console.log(GIFData.data[0].embed_url);
        })

}









//Main Process
//==================================



//Add GIFs with button click
$('.emotionBtnsList').on('click', 'button#emotionBtn', function () {

    //set term from the text of button clicked
    queryTerm = $(this).text().trim();

    //Add in the queryTerm
    var newUrl = queryURLBase + "&q=" + queryTerm;
    runQuery(10, newUrl);

});




//Add button for emotion added
$('#addEmotion').on('click', function () {
    event.preventDefault();
    var emotionAdd = $('#emotion-input').val().trim();
    if (allFeelings.includes(emotionAdd)) {
        alert('You already added that emotion.');
    } else if (emotionAdd === "") {
        return false;
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