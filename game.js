var buttonColor = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0,
  k, index = 0;
$(document).on("keypress", function() {
  if (level === 0) {
    nextSequence();
  }
});
$("h1").on("click", function() {
  if (level === 0) {
    nextSequence();
  }
});
// if(level===0)
// {
//   $(document).on("keypress", function() {
//      nextSequence();
//  }
//  $("body").on("click", function() {
//     nextSequence();
// }
// }

$(".btn").on("click", function handler(event) {
  k++;
  var userChosenColour = (event.currentTarget.id);
  animatePress(userChosenColour)
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(k, index);
  index++;
});

function nextSequence() {
  userClickedPattern = [];
  k = 0;
  index = 0;
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(k, indu) {
  console.log("k=" + k + "\nlevel=" + level);
  if (k != level) {
    if (gamePattern[indu] != userClickedPattern[indu]) {
      $("h1").text("Game Over, Press Any Key or CLICK HERE to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 100);
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      gamePattern = [];
      userClickedPattern = [];
      index = 0;
      level = 0;
    }
  } else {
    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
      setTimeout(nextSequence, 1000);
    } else {
      console.log("gamePattern=" + gamePattern);
      console.log("userClickedPattern=" + userClickedPattern);
      $("h1").text("Game Over, Press Any Key or CLICK HERE to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 100);
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      gamePattern = [];
      userClickedPattern = [];
      index = 0;
      level = 0;
    }
  }
}
