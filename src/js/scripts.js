//Initial game conditions
var steps = [];
var playerSteps = [];
var colors = ["green", "red", "blue", "yellow"];
var onOff = true;
var strict = false

//sound files
var green = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var red = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//board keys
var objKeys = {
  "green": green,
  "red": red,
  "blue": blue,
  "yellow": yellow
};

function colorSeries() {
  steps.push(colors[Math.floor(Math.random()*colors.length)]);
  var turn = steps.length;
  if(turn<10){
    $("#steps").text("0"+turn);
  } else {
     $("#steps").text(turn);
  }
}

colorSeries();
