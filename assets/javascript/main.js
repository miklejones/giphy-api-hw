//Setup Variables
//==================================
var feelings = ["sad", "happy", "hurt", "helped", "insecure", "confident", "tired", "energized"];
var allFeelings = [];
var authKey = "jVuZK9CxhiLm1SiZmlMtg6djlkDeX9C3";
var queryTerm = '';
var numResults = 0;
var GIFData = {};
var extraInspiration = 0;
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

function runQuery(queryURL) {
    //Ajax
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (GIFData) {

            //Add options to add more gifs or get new ideas
            $('.options').empty();
            var moreInspiration = $('<button class="more-inspiration">I Need More Inspiration</button>');
            $('.options').append(moreInspiration);
            var similarEmotion = $('<button class="do-more">Similar Emotions</button>');
            $('.options').append(similarEmotion);



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
            i = extraInspiration +10;

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

//Main Process
//==================================
//Add GIFs with button click
$('.emotionBtnsList').on('click', 'button#emotionBtn', function () {
    //set term from the text of button clicked
    queryTerm = $(this).text().trim();
    //Add in the queryTerm
    var newUrl = queryURLBase + "&q=" + queryTerm;
    runQuery(newUrl);
});

$('.options').on('click', 'button#emotionBtn', function () {
    //set term from the text of button clicked
    queryTerm = $(this).text().trim();
    //Add in the queryTerm
    var newUrl = queryURLBase + "&q=" + queryTerm;
    runQuery(newUrl);
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