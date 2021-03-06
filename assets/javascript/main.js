//Setup Variables
//==================================
var feelings = ["sad", "happy", "surprise", "disgust", "fear", "anger", "tired", "energized"];
var allFeelings = [];
var authKey = "jVuZK9CxhiLm1SiZmlMtg6djlkDeX9C3";
var queryTerm = '';
var numResults = 0;
var GIFData = {};
var currentEmotion = "";
var extraInspiration = 1;
//URL Base
var queryURLBase = 'https://api.giphy.com/v1/gifs/search?api_key=' + authKey + '&limit=100';

//Functions
//==================================
//Function to add feeling as a button
function newBtn(emotion) {
    allFeelings.push(emotion);
    //jQuery to create button from the given emotion
    var newBtn = "<button id='emotionBtn'>" + emotion + "</button>";
    $('.emotionBtnsList').append(newBtn);
}

function runQuery(queryURL) {
    //Ajax
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (GIFData) {

            //Add options to add more gifs or get new ideas
            $('.options').empty();
            var moreInspiration = $('<button class="option more-inspiration">I Need More Inspiration</button>');
            $('.options').append(moreInspiration);

            $('#current-emotion').html(`You are looking at inspiration for the word, "${currentEmotion}."`);

            $('#emotions').empty();
            for (let i = 0; i < 10; i++) {
                let GIFStill = GIFData.data[i].images.fixed_height_small_still.url;
                console.log(GIFStill);
                console.log(GIFData);
                //Start dumping to html
                var emotionDiv = $('<div class="gifCards text-center">')
                var rating = $('<h5>GIF rating: ' + GIFData.data[i].rating.toUpperCase() + '</h5>');
                //GIFData.data[i].rating;
                var img = $('<img>');
                img.attr('src', GIFStill);
                img.addClass('card emotion-card');
                img.attr('id', 'articleCard-' + i);
                img.attr('data-still', GIFStill);
                img.attr('data-animate', GIFData.data[i].images.fixed_height_small.url);
                img.attr('data-state', 'still')
                emotionDiv.append(rating);
                emotionDiv.append(img);
                $('#emotions').append(emotionDiv);
            }
        })
}


function moreQuery(queryURL) {
    //Ajax
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (GIFData) {
            if (extraInspiration === 10) {
                alert('That is enough inspiration. Maybe you should read a book or something.:/')
            } else {

                for (let i = 0; i < 10; i++) {
                    console.log(GIFData);
                    var newI = i + (10 * extraInspiration);

                    let GIFStill = GIFData.data[newI].images.fixed_height_small_still.url;

                    console.log(newI);
                    //Start dumping to html
                    var emotionDiv = $('<div class="gifCards text-center">')
                    var rating = $('<h5>GIF rating: ' + GIFData.data[newI].rating.toUpperCase() + '</h5>');
                    //GIFData.data[i].rating;
                    var img = $('<img>');
                    img.attr('src', GIFStill);
                    img.addClass('card emotion-card');
                    img.attr('id', 'articleCard-' + newI);
                    img.attr('data-still', GIFStill);
                    img.attr('data-animate', GIFData.data[newI].images.fixed_height_small.url);
                    img.attr('data-state', 'still')
                    emotionDiv.append(rating);
                    emotionDiv.append(img);
                    $('#emotions').append(emotionDiv);
                };
                extraInspiration++;
            }
        })
}

//Main Process
//==================================
//Add GIFs with button click
$('.emotionBtnsList').on('click', 'button#emotionBtn', function () {
    //set term from the text of button clicked
    queryTerm = $(this).text().trim();
    currentEmotion = queryTerm;
    //Add in the queryTerm
    var newUrl = queryURLBase + "&q=" + queryTerm;
    runQuery(newUrl);
});

$('.options').on('click', 'button.more-inspiration', function () {
    //set term from the text of button clicked
    //Add in the queryTerm
    var newUrl = queryURLBase + "&q=" + queryTerm;
    moreQuery(newUrl);
    console.log('hmm');
});

//Animate GIF with click of GIF
$('#emotions').on('click', 'div.gifCards img', function () {
    console.log(this);
    var state = $(this).attr('data-state')
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
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

//Load buttons on page load
$(document).ready(function () {
    //Loop to add feelings to DOM
    for (let f = 0; f < feelings.length; f++) {
        let emotion = feelings[f];
        newBtn(emotion);
    };
});