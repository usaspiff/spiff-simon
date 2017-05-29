//Initial game conditions
var steps = [];
var playerSteps = [];
var colors = ["green", "red", "blue", "yellow"];
var strict = false;
var time = 200;
var running;

//sound files
var green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var red = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

//board keys
var objKeys = {
  green: green,
  red: red,
  blue: blue,
  yellow: yellow
};

//Random color selection for each turn of the series
function colorSeries() {
  steps.push(colors[Math.floor(Math.random() * colors.length)]);
  var turn = steps.length;
  if (turn < 10) {
    $("#steps").text("0" + turn);
  } else {
    $("#steps").text(turn);
  }
  console.log("Level "+ turn + " , play "+ steps);
}

colorSeries();

//Play button functionality
$("#onOff").on('click', function() {
  activateKey(steps);
});

//Activate the game keys
function activateKey(items) {
  $("#" + items[0])
    .addClass("active", time, function() {
      objKeys[items[0]].play();
    })
    .removeClass("active", time, function() {
      activateKey(items.slice(1));
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
  $(this).addClass('active', time, function() {
    objKeys[$(this).attr('class').split(' ')[0]].play();
  }).removeClass('active', time, function() {

    playerSteps.push($(this).attr('class').split(' ')[0]);
    var currentSteps = playerSteps.length;
    var currentLevel = steps.length;
    if (playerSteps[currentSteps -1] === steps[currentSteps -1]) {
      if (currentSteps === currentLevel) {
        if (currentSteps !== 20) {
          playerSteps = [];
          $('.green, .red, .yellow, .blue').removeClass('enabled');
          $('.correct').fadeIn(500, function() { //Edit string to personalize effect
            $('.correct').fadeOut(500, function() { //Edit string to personalize effect

              colorSeries();
              setTimeout(
              function() {
                activateKey(steps);
              }, 200);
            });
          });
        } else {
          $('.trophy').fadeIn(1000, function() {
            green.play();
            red.play();
            yellow.play();
            blue.play();
            $('.trophy').fadeOut(1000, function() {
              reset();
            });
          });
        }
      }

    } else {
      playerSteps = [];
      $('.green, .red, .yellow, .blue').removeClass('enabled');
      $('.wrong').fadeIn(500, function() {
        $('.wrong').fadeOut(500, function() {
          setTimeout(
          function() {
            activateKey(steps);
          }, 200);
        });
      });
    }
    running = false;
  });
});


//Disply reset function after winning or losing in Strict modwe
function newDisplay() {
  $(".keys, .button, .footer").fadeIn();
  $(".header").html("SIMON GAME");
  reset();
}

//Winning animation after 20 successful steps
function weHaveWinner() {
  $(".header").html("YOU WIN!!!");
  $(".keys, .button, .footer").fadeOut("slow");
  setTimeout(newDisplay, 5000);
  console.log("winner!");
}

//Change string below to assign to winning condition and target Strict button properly
$("#strict").click(function() {
  weHaveWinner();
});

//Animation after losing in Strict mode
function weHaveLoser() {
  $(".header").html("YOU LOST!!!");
  $(".keys, .button, .footer").fadeOut("fast");
  setTimeout(newDisplay, 3000);
  console.log("You lost!");
}

//Reset function tied to Reset button and winning or losing condiditions
function reset() {
  steps = [];
  playerSteps = [];
  console.log("game has been reset");
  colorSeries();
  activateKey(steps);

}

//Reset button action
$("#reset").click(function() {
  reset();
});
