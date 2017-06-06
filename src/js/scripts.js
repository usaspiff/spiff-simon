var turns = [];
var colors = ["green", "red", "blue", "yellow"];
var recording = [];
var speed = 300;
var strictMode = false;
var running;

//Audio files for button sounds
var green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var red = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

var obj = {
  green: green,
  red: red,
  yellow: yellow,
  blue: blue
};

//Random color selection for each turn of the series
function addRandomColor() {
  turns.push(colors[Math.floor(Math.random() * colors.length)]);
  var level = turns.length;
  if (level < 10) {
    $("#level").text("0" + level);
  } else {
    $("#level").text(level);
  }
  console.log("Level " + level + ": play " + turns);
}

//Play button functionality
$("#play").click(startTheGame);

function startTheGame() {
  console.log("Let's play!");
  addRandomColor();
  nextItemActivate(turns);
}

function nextItemActivate(items) {
  $("." + items[0])
    .addClass("active", speed, function() {
      obj[items[0]].play();
    })
    .removeClass("active", speed, function() {
      nextItemActivate(items.slice(1));
    });
  if (items.length === 0) {
    $(".green, .red, .yellow, .blue").addClass("enabled");
  }
}

$("body").on("click", ".enabled", function() {
  if (running) {
    return false;
   }

  running = true;
  $(this)
    .addClass("active", speed, function() {
      obj[$(this).attr("class").split(" ")[0]].play();
    })
    .removeClass("active", speed, function() {
      recording.push($(this).attr("class").split(" ")[0]);
      var currentMoves = recording.length;
      var currentLevel = turns.length;
      if (recording[currentMoves - 1] === turns[currentMoves - 1]) {
        if (currentMoves === currentLevel) {
          if (currentMoves !== 20) {
            recording = [];
            $(".green, .red, .yellow, .blue").removeClass("enabled");
            $(".correct").fadeIn(500, function() {
              $(".correct").fadeOut(500, function() {
                addRandomColor();
                setTimeout(function() {
                  nextItemActivate(turns);
                }, 200);
              });
            });
          } else {
            weHaveWinner();
          }
        }
      } else {
        if (!strictMode) {
          recording = [];
          $(".green, .red, .yellow, .blue").removeClass("enabled");
          $(".wrong").fadeIn(500, function() {
            $(".wrong").fadeOut(500, function() {
              $("h1").html("WRONG COLOR!");
              setTimeout(madeError, 3000);
              console.log("Oops, you made an error!");
              setTimeout(function() {
                nextItemActivate(turns);
              }, 3000);
            });
          });
        } else {
          weHaveLoser();
        }
      }
      running = false;
    });
});

//Reset function tied to Reset button and winning or losing (in Strict mode) conditions
function reset() {
  if ($(".green, .red, .yellow, .blue").hasClass("enabled")) {
    $("#strict").removeClass("strict");
    turns = [];
    recording = [];
    speed = 200;
    console.log("Game has been reset.");
    startTheGame();
    strictMode = false;
  }
}

//Reset button action
$("#reset").on("click", function() {
  reset();
});

//Strict function tied to Strict button
function toggleStrict() {
  $("#strict").toggleClass("strict");
  strictMode = !strictMode;
  if (strictMode) {
    console.log("Strict mode activated. Good luck!");
  } else {
    console.log("Strict mode deactivated.");
  }
}

//Strict button action
$("#strict").click(toggleStrict);

//Disply Reset function after winning or losing in Strict mode
function newDisplay() {
  $(".green, .red, .yellow, .blue, .btn, .footer").fadeIn();
  $("h1").html("SIMON GAME");
  reset();
}

//Winning animation after 20 successful steps
function weHaveWinner() {
  $("h1").html("YOU WIN!!!");
  playWinningTune();
  $(".green, .red, .yellow, .blue, .btn, .footer").fadeOut("slow");
  setTimeout(newDisplay, 5000);
  console.log("Winner!");
}

//Animation after losing in Strict mode
function weHaveLoser() {
  $("h1").html("YOU LOST!!!");
  $(".green, .red, .yellow, .blue, .btn, .footer").fadeOut("fast");
  setTimeout(newDisplay, 3000);
  console.log("Oh no, you lost!");
}

//Keys play after winning
function playWinningTune() {
  green.play();
  red.play();
  yellow.play();
  blue.play();
}

//Animation when player makes an error in standard mode
function madeError() {
  $("h1").html("SIMON GAME");
}
