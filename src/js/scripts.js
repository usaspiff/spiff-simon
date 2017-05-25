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

function colorSeries() {
  steps.push(colors[Math.floor(Math.random() * colors.length)]);
  var turn = steps.length;
  if (turn < 10) {
    $("#steps").text("0" + turn);
  } else {
    $("#steps").text(turn);
  }
}

colorSeries();

$("#onOff").click(function() {
  activateKey(steps);
});

function activateKey(items) {
  $("." + items[0])
    .addClass("active", time, function() {
      objKeys[items[0]].play();
    })
    .removeClass("active", time, function() {
      activateKeys(item.slice(1));
    });

  if (item.length === 0) {
    $(".green, .red, .yellow, .blue").addClass("active");
  }
}

$("body").on("click", ".active", function() {
  if (running) {
    return false;
  }
  running = true;
});


//Disply reset function after winning or losing in Strict modwe
function newDisplay() {
  $(".keys, .button, .footer").show();
  $(".header").html("SIMON GAME");
  reset();
}

//Winning animation after 20 successful steps
function weHaveWinner() {
  $(".header").html("YOU WIN!!!");
  $(".keys, .button, .footer").hide();
  setTimeout(newDisplay, 6000);
  console.log("winner!");
}

//Change string below to assign to winning condition and target Strict button properly
$("#strict").click(function() {
  weHaveWinner();
});

//Animation after losing in Strict mode
function weHaveLoser() {
  $(".header").html("YOU LOST!!!");
  $(".keys, .button, .footer").hide();
  setTimeout(newDisplay, 3000);
  console.log("You lost!");
}

//Reset function tied to Reset button and winning or losing condiditions
function reset() {
  steps = [];
  playerSteps = [];
  colorSeries();
  //activateKeys();
  console.log("game has been reset");
}

//Reset button action
$("#reset").click(function() {
  reset();
});
