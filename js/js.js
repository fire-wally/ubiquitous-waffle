// js goes here
var Segment = function(name) {
  this.segmentName = name;
  this.weightMagnitude = 0.0;
  this.weightOffset = 0.0;
  this.startPt = {}
  this.endPt = {}
  this.COMMagnitude = 0.0;
  this.segmentMass = function(weight){
    return this.segmentMagnitude * weight + this.weightOffset;
  };
  this.segmentCOM = function(){
    return {
      x: this.startPt.x + (this.COMMagnitude * (this.endPt.x - this.endPt.x)),
      y: this.startPt.y + (this.COMMagnitude * (this.endPt.y - this.endPt.y)),
    };
  };

};

var Body = function() {
  this.head = new Segment("head");
  this.head.weightMagnitude = 0.032;
  this.head.weightOffset = 18.7;
  this.head.COMMagnitude = 0.663;

  this.rightUpperArm = new Segment("rightUpperArm");
  this.rightUpperArm.weightMagnitude = 0.022;
  this.rightUpperArm.weightOffset = 4.76;
  this.rightUpperArm.COMMagnitude = 0.507;

  this.rightForearm = new Segment("rightForearm");
  this.rightForearm.weightMagnitude = 0.013;
  this.rightForearm.weightOffset = 2.41;
  this.rightForearm.COMMagnitude = 0.417;

  this.rightHand = new Segment("rightHand");
  this.rightHand.weightMagnitude = 0.005;
  this.rightHand.weightOffset = 0.75;
  this.rightHand.COMMagnitude = 0.51;

  this.leftUpperArm = new Segment("leftUpperArm");
  this.leftUpperArm.weightMagnitude = 0.022;
  this.leftUpperArm.weightOffset = 4.76;
  this.leftUpperArm.COMMagnitude = 0.507;

  this.leftForearm = new Segment("leftForearm");
  this.leftForearm.weightMagnitude = 0.013;
  this.leftForearm.weightOffset = 2.41;
  this.leftForearm.COMMagnitude = 0.417;

  this.leftHand = new Segment("leftHand");
  this.leftHand.weightMagnitude = 0.005;
  this.leftHand.weightOffset = 0.75;
  this.leftHand.COMMagnitude = 0.51;

  this.rightThigh = new Segment("rightThigh");
  this.rightThigh.weightMagnitude = 0.127;
  this.rightThigh.weightOffset = -14.82;
  this.rightThigh.COMMagnitude = .398;

  this.rightShank = new Segment("rightShank");
  this.rightShank.weightMagnitude = 0.044;
  this.rightShank.weightOffset = -1.75;
  this.rightShank.COMMagnitude = .413;

  this.rightFoot = new Segment("rightFoot");
  this.rightFoot.weightMagnitude = 0.009;
  this.rightFoot.weightOffset = 2.48;
  this.rightFoot.COMMagnitude = 0.4;

  this.leftThigh = new Segment("leftThigh");
  this.leftThigh.weightMagnitude = 0.127;
  this.leftThigh.weightOffset = -14.82;
  this.leftThigh.COMMagnitude = .398;

  this.leftShank = new Segment("leftShank");
  this.leftShank.weightMagnitude = 0.044;
  this.leftShank.weightOffset = -1.75;
  this.leftShank.COMMagnitude = .413;

  this.leftFoot = new Segment("leftFoot");
  this.leftFoot.weightMagnitude = 0.009;
  this.leftFoot.weightOffset = 2.48;
  this.leftFoot.COMMagnitude = 0.4;

  this.trunk = new Segment("trunk");
  this.trunk.weightMagnitude = 0.532;
  this.trunk.weightOffset = -6.93;
  this.trunk.COMMagnitude = 0.4;

  this.segments = [this.head, this.rightUpperArm, this.rightForearm, this.rightHand, 
                    this.leftUpperArm, leftForearm, leftHand,
                    rightThigh, rightShank, rightFoot, 
                    leftThigh, leftShank, leftFoot, trunk];
};

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

function makeACircle(x, y, connectToPrevious){
  // Add a circle at the point of user click
  var circle = new createjs.Shape();
  circle.graphics.beginFill("red").drawCircle(0, 0, 4);
  circle.x = x;
  circle.y = y;

  // connect this circle to the previous circle with a line.
  if (allCircles.length > 0 && connectToPrevious){
    connectTheDots(allCircles[allCircles.length - 1], circle);
  }

  allCircles.push(circle) // add circle to list of circles so we can connect the dots later

  stage.addChild(circle); // add to stage
  stage.update(); // show the new circle
}

function stageClick(evt){

  var coordinate = Coordinate();
  coordinate.x = evt.stageX;
  coordinate.y = evt.stageY;
  allCoordinates.push(coordinate);

  makeACircle(evt.stageX, evt.stageY, true); // this last boolean draws a line to previous circle

}
stage.on("stagemousedown", stageClick);
