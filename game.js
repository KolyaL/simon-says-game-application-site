var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
started=false;

$(document).keypress(function(){
    if (!started){
        $('#level-title').text("Level " + level );
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
    console.log(userClickedPattern);
})
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("."+randomChosenColour).fadeOut(250).fadeIn(250);
    userClickedPattern=[];
    level++;
    $('#level-title').text("Level " + level );
}

function playSound(name) {
    var colourSound = new Audio("sounds/"+ name + ".mp3");
    colourSound.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass('pressed')
    setTimeout(function(){
        $("."+currentColour).removeClass('pressed');
    }, 100)

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success")
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $('#level-title').text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("Wrong")
    }

}

function startOver(){
    level = 0;
    gamePattern = []
    started=false;

}

