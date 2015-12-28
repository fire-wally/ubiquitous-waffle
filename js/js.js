// js goes here

var loadButton = document.getElementById('loadButton');
  loadButton.addEventListener('change', handleImage, false);

  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveImage, false);

var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

function getSize(img){
  var imgWidth = img.width;
  var imgHeight = img.height;
  if (imgHeight <= 800 && imgWidth <= 800)
    return {height: imgHeight, width: imgWidth};
  else if (imgWidth > imgHeight) //if landscape
    return {height: 600, width: 800};
  else
    return {height: 800, width: 600};
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        canvas.width = 800;
        canvas.height = 600;
        img.onload = function(){
            var size = getSize(img);
            ctx.drawImage(img,0,0, size.width, size.height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function saveImage(e){
  canvas.toBlob(function(blob) {
    saveAs(blob, "center-of-mass.png");
  });
}

function Coordinate(){
  return {x:0,y:0}
}

var stage = new createjs.Stage("imageCanvas");
var allCoordinates = [];
var allCircles = [];
var allLines = [];

function connectTheDots(dot1, dot2){
  console.log(dot1.x);
  console.log(dot2.x);

  var line = new createjs.Shape();
  line.graphics.beginStroke("blue")
  line.graphics.moveTo(dot1.x, dot1.y);
  line.graphics.lineTo(dot2.x, dot2.y);
  stage.addChild(line); // add to stage
  stage.update(); // show the new circle

  allLines.push(line);
}

function stageClick(evt){
  // Add a circle at the point of user click

  var coordinate = Coordinate();
  coordinate.x = evt.stageX;
  coordinate.y = evt.stageY;
  allCoordinates.push(coordinate);

  var circle = new createjs.Shape();
  circle.graphics.beginFill("red").drawCircle(0, 0, 4);
  circle.x = coordinate.x;
  circle.y = coordinate.y;

  // connect this circle to the previous circle with a line.
  if (allCircles.length > 0){
    connectTheDots(allCircles[allCircles.length - 1], circle);
  }

  allCircles.push(circle) // add circle to list of circles so we can connect the dots later

  stage.addChild(circle); // add to stage
  stage.update(); // show the new circle
}
stage.on("stagemousedown", stageClick);
