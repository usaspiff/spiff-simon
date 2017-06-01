var turns = [];
var colors = ["green", "red", "blue", "yellow"];
var recording = [];
var speed = 200;
var strictMode = false;
var running;

//Audio files for button sounds
var green = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var red = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

var obj = {
  "green": green,
  "red": red,
  "yellow": yellow,
  "blue": blue
};

//Random color selection for each turn of the series
function addRandomColor() {
  turns.push(colors[Math.floor(Math.random() * colors.length)]);
  var level = turns.length;
  //$('.level').text(level);
  if (level < 10) {
    $("#level").text("0" + level);
  } else {
    $("#level").text(level);
  }
  console.log("Level "+ level + " , play "+ turns);
}


addRandomColor();

//Play button functionality
$('#play').on('click', function() {
  console.log("Let's play"); //Remove after testing
  nextItemActivate(turns);
});

// Animation callback to start next fade-in
function nextItemActivate(items) {
  // Fade in the first element in the collection

  $('.' + items[0]).addClass('active', speed, function() {

    obj[items[0]].play();
  }).removeClass('active', speed, function() {

    // Recurse, but without the first element
    nextItemActivate(items.slice(1));
  });
  console.log("Check 1"); //Remove after testing
  if (items.length === 0) {
    $('.green, .red, .yellow, .blue').addClass('enabled');
    console.log("Check 2"); //Remove after testing
  }
}

$('body').on('click', '.enabled', function() {
  if (running){
    return false;
    //console.log("Check 3"); //Remove after testing
  }
  //console.log("Check 4"); //Remove after testing
  running = true;
  $(this).addClass('active', speed, function() {
    obj[$(this).attr('class').split(' ')[0]].play();
  }).removeClass('active', speed, function() {

    recording.push($(this).attr('class').split(' ')[0]);
    var currentMoves = recording.length
    var currentLevel = turns.length
    if (recording[currentMoves - 1] === turns[currentMoves - 1]) {
      if (currentMoves === currentLevel) {
        if (currentMoves !== 3) {
          recording = [];
          $('.green, .red, .yellow, .blue').removeClass('enabled');
          $('.correct').fadeIn(500, function() {
            $('.correct').fadeOut(500, function() {

              addRandomColor();
              setTimeout(
                function() {
                  nextItemActivate(turns);
                }, 200);
            });
          });
        } else {
          weHaveWinner();
        }

      }

    } else {
      recording = [];
      $('.green, .red, .yellow, .blue').removeClass('enabled');
      $('.wrong').fadeIn(500, function() {
        $('.wrong').fadeOut(500, function() {
          setTimeout(
            function() {
              nextItemActivate(turns);
            }, 200);
        });
      });

    }
    running = false;
  });

})

//reset function tied to Reset button and winning or losing (Strict mode) conditions
function reset() {
  if ($('.green, .red, .yellow, .blue').hasClass('enabled')) {
    turns = [];
    recording = [];
    speed = 200;
    console.log('Game has been reset');
    addRandomColor();
    nextItemActivate(turns);
    var strict = false;
  }

}

//Reset button action
$('button.reset').on('click', function() {
  reset();
})

//Strict function tied to Strict button
function toggleStrict(){
  $('#strict').toggleClass('strict');
  console.log('Strict mode activated. Good luck!');
  var strict = true;
}

//Strict button action
$('#strict').click(toggleStrict);

//Disply reset function after winning or losing in Strict modwe
function newDisplay() {
  $(".keys, .button, .footer").fadeIn();
  $(".header").html("SIMON GAME");
  reset();
}

//Winning animation after 20 successful steps
function weHaveWinner() {
  $(".header").html("YOU WIN!!!");
  playWinningTune()
  $(".keys, .button, .footer").fadeOut("slow");
  setTimeout(newDisplay, 5000);
  console.log("Winner!");
}

//Animation after losing in Strict mode
function weHaveLoser() {
  $(".header").html("YOU LOST!!!");
  $(".keys, .button, .footer").fadeOut("fast");
  setTimeout(newDisplay, 3000);
  console.log("You lost!");
}

//Keys play after winning
function playWinningTune() {
          green.play();
          red.play();
          yellow.play();
          blue.play();
        };
