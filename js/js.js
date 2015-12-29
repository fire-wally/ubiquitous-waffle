// js goes here
var Segment = function() {
  this.segmentName = name;
  this.weightMagnitude = 0.0;
  this.weightOffset = 0.0;
  this.startPt = {}
  this.endPt = {}
  this.COMMagnitude = 0.0;
  this.setStart = function(node){
    this.startPt = {x:node.x, y:node.y};
  };
  this.setEnd = function(node){
    this.endPt = {x:node.x, y:node.y};
  };
  this.segmentMass = function(weight){
    return this.weightMagnitude * weight + this.weightOffset;
  };
  this.segmentCOM = function(){
    return {
      x: this.startPt.x + (this.COMMagnitude * (this.endPt.x - this.startPt.x)),
      y: this.startPt.y + (this.COMMagnitude * (this.endPt.y - this.startPt.y)),
    };
  };

};

var Body = function() {

  this.weight = 778 //In Newtons!

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
                    this.leftUpperArm, this.leftForearm, this.leftHand,
                    this.rightThigh, this.rightShank, this.rightFoot,
                    this.leftThigh, this.leftShank, this.leftFoot, this.trunk];

  this.centerOfMass = function(){
    var xSum = 0.0;
    var ySum = 0.0;
    for(var i = 0; i<this.segments.length; i++){
      var mass = this.segments[i].segmentMass(this.weight);
      var com = this.segments[i].segmentCOM()
      xSum += mass * com.x;
      ySum += mass * com.y
    }
    return {
      x: xSum / this.weight,
      y: ySum / this.weight
    }
  }

};

var bodyTest = function(){
  var b = new Body();
  b.head.startPt = {x:6,y:2};
  b.head.endPt = {x:6,y:4};

  b.rightUpperArm.startPt = {x:4,y:5};
  b.rightUpperArm.endPt = {x:2,y:7.5};

  b.rightForearm.startPt = {x:2,y:7.5};
  b.rightForearm.endPt = {x:1,y:10};

  b.rightHand.startPt = {x:1, y:10};
  b.rightHand.endPt = {x:0, y:12};

  b.leftUpperArm.startPt = {x:8,y:5};
  b.leftUpperArm.endPt = {x:10,y:7.5};

  b.leftForearm.startPt = {x:10,y:7.5};
  b.leftForearm.endPt = {x:12,y:10};

  b.leftHand.startPt = {x:12, y:10};
  b.leftHand.endPt = {x:13, y:12};

  b.rightThigh.startPt = {x:5, y:11.5};
  b.rightThigh.endPt = {x:4, y:14};

  b.rightShank.startPt = {x:4,y:14};
  b.rightShank.endPt = {x:3, y:15};

  b.rightFoot.startPt = {x:3, y:15};
  b.rightFoot.endPt = {x:2, y:16};

  b.leftThigh.startPt = {x:7.5, y:11.5};
  b.leftThigh.endPt = {x:8.5, y:14};

  b.leftShank.startPt = {x:8.5,y:14};
  b.leftShank.endPt = {x:9, y:15};

  b.leftFoot.startPt = {x:9, y:15};
  b.leftFoot.endPt = {x:9.5, y:16};

  b.trunk.startPt = {x:6.5, y:6};
  b.trunk.endPt = {x:6.5, y:10};

  return b
}

var loadButton = document.getElementById('loadButton');
loadButton.addEventListener('change', handleImage, false);

var saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveImage, false);

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetEverything, false);

var calcButton = document.getElementById('calculateButton');
calcButton.addEventListener('click', calculateCOM, false);

var canvas = document.getElementById('imageCanvas');
canvas.width = 600;
canvas.height = 600;
var ctx = canvas.getContext('2d');


function handleImage(e){

  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
        var bitmap = new createjs.Bitmap(img);
        var longDimension = img.height > img.width ? img.height : img.width;
        var scaleRatio = 700 / longDimension;
        bitmap.scaleY = scaleRatio;
        bitmap.scaleX = scaleRatio;
        stage.addChild(bitmap);
        stage.update();
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
  updateMessage("Select the Top of Head");
}

function calculateCOM(e){
  var body = mapNodesToBody(allNodes);
  var com = body.centerOfMass();

  console.log(com);

  var circle = new createjs.Shape();
  circle.graphics.beginFill("lime").drawCircle(0, 0, 4);
  var outline = new createjs.Shape();
  outline.graphics.beginFill("black").drawCircle(0,0,5);
  circle.x = outline.x = com.x;
  circle.y  = outline.y = com.y;
  stage.addChild(outline); // add to stage
  stage.addChild(circle); // add to stage
  stage.update();

}

function mapNodesToBody(nodes){
  var body = new Body();
  for(var i = 0; i<nodes.length; i++){
    var n = nodes[i];
    switch (n.name){
      case "Top of Head":
        body.head.setStart(n);
        break;
      case "Chin-Neck Intersect":
        body.head.setEnd(n);
        break;
      case "Right Shoulder":
        body.rightUpperArm.setStart(n);
        break;
      case "Right Elbow":
        body.rightUpperArm.setEnd(n);
        body.rightForearm.setStart(n);
        break;
      case "Right Wrist":
        body.rightForearm.setEnd(n);
        body.rightHand.setStart(n);
        break;
      case "Right Hand":
        body.rightHand.setEnd(n);
        break;
      case "Left Shoulder":
        body.leftUpperArm.setStart(n);
        break;
      case "Left Elbow":
        body.leftUpperArm.setEnd(n);
        body.leftForearm.setStart(n);
        break;
      case "Left Wrist":
        body.leftForearm.setEnd(n);
        body.leftHand.setStart(n);
        break;
      case "Left Hand":
        body.leftHand.setEnd(n);
        break;
      case "Right Hip":
        body.rightThigh.setStart(n);
        break;
      case "Right Knee":
        body.rightThigh.setEnd(n);
        body.rightShank.setStart(n);
        break;
      case "Right Ankle":
        body.rightShank.setEnd(n);
        body.rightFoot.setStart(n);
        break;
      case "Right Fifth Metatarsil":
        body.rightFoot.setEnd(n);
        break;
      case "Left Hip":
        body.leftThigh.setStart(n);
        break;
      case "Left Knee":
        body.leftThigh.setEnd(n);
        body.leftShank.setStart(n);
        break;
      case "Left Ankle":
        body.leftShank.setEnd(n);
        body.leftFoot.setStart(n);
        break;
      case "Left Fifth Metatarsil":
        body.leftFoot.setEnd(n);
        break;
      default:
        console.log("unknown node", n);
        break;
    }

  }
  var hipMidPoint = {
    x: body.leftThigh.startPt.x - ((body.leftThigh.startPt.x - body.rightThigh.startPt.x) / 2),
    y: body.leftThigh.startPt.y - ((body.leftThigh.startPt.y - body.rightThigh.startPt.y) / 2)
  };
  var shoulderMidPoint = {
    x: body.leftUpperArm.startPt.x - ((body.leftUpperArm.startPt.x - body.rightUpperArm.startPt.x) / 2),
    y: body.leftUpperArm.startPt.y - ((body.leftUpperArm.startPt.y - body.rightUpperArm.startPt.y) / 2)
  };
  body.trunk.startPt = shoulderMidPoint;
  body.trunk.endPt = hipMidPoint;
  return body;
}

function saveImage(e){
  canvas.toBlob(function(blob) {
    saveAs(blob, "center-of-mass.png");
  });
}

function resetEverything(){
  stage.removeAllChildren();
  stage.update();
  allNodes = [];
  setupNodes();
  updateMessage("Click the button to choose an image from your computer");
}

function Coordinate(){
  return {x:0,y:0}
}



var stage = new createjs.Stage("imageCanvas");
//stage.setTransform(0, 0, 0, -1);
var allCoordinates = [];
var allNodes = [];
var allLines = [];

var Node = function(name, connectTo) {
  this.x = 0.0;
  this.y = 0.0;
  this.sprite = null;
  this.lineSprite = null;
  this.name = name;
  this.connectTo = connectTo;
  this.setCoordinates = function(x, y){

    this.x = x;
    this.y = y;

    if (!this.sprite){
      var circle = new createjs.Shape();
      circle.graphics.beginFill("yellow").drawCircle(0, 0, 4);
      var outline  = new createjs.Shape();
      outline.graphics.beginFill("black").drawCircle(0,0,5);
      circle.x = outline.x = x;
      circle.y = outline.y = y;
      this.sprite = circle;
      stage.addChild(outline);
      stage.addChild(circle); // add to stage

      if(this.connectTo){
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(3).beginStroke("blue")
        line.graphics.moveTo(this.x, this.y);
        line.graphics.lineTo(connectTo.x, connectTo.y);
        this.lineSprite = line;
        stage.addChild(line); // add to stage
      }

    }
    else{
      this.sprite.x = x;
      this.sprite.y = y;

      if(this.connectTo){
        // redraw line
        this.lineSprite.graphics = null;
        this.lineSprite.graphics = new createjs.Graphics();
        line.graphics.setStrokeStyle(3).beginStroke("blue")
        line.graphics.moveTo(this.x, this.y);
        line.graphics.lineTo(connectTo.x, connectTo.y);
      }

    }

    stage.update(); // show the new circle

  };
  this.getX = function (){
    return this.x;
  }
  this.getY = function(){
    return canvas.height - this.y
  }
}

function setupNodes(){
  var node1 = new Node('Top of Head');
  var node2 = new Node('Chin-Neck Intersect', node1);

  var node3 = new Node('Right Shoulder');
  var node4 = new Node('Right Elbow', node3);
  var node5 = new Node('Right Wrist', node4);
  var node6 = new Node('Right Hand', node5);

  var node7 = new Node('Left Shoulder');
  var node8 = new Node('Left Elbow', node7);
  var node9 = new Node('Left Wrist', node8);
  var node10 = new Node('Left Hand', node9);

  var node11 = new Node('Right Hip');
  var node12 = new Node('Right Knee', node11);
  var node13 = new Node('Right Ankle', node12);
  var node14 = new Node('Right Fifth Metatarsil', node13);

  var node15 = new Node('Left Hip', node11);
  var node16 = new Node('Left Knee', node15);
  var node17 = new Node('Left Ankle', node16);
  var node18 = new Node('Left Fifth Metatarsil', node17);

  allNodes.push(node1);
  allNodes.push(node2);
  allNodes.push(node3);
  allNodes.push(node4);
  allNodes.push(node5);
  allNodes.push(node6);
  allNodes.push(node7);
  allNodes.push(node8);
  allNodes.push(node9);
  allNodes.push(node10);
  allNodes.push(node11);
  allNodes.push(node12);
  allNodes.push(node13);
  allNodes.push(node14);
  allNodes.push(node15);
  allNodes.push(node16);
  allNodes.push(node17);
  allNodes.push(node18);

}
setupNodes();

function connectTheDots(dot1, dot2){

  var line = new createjs.Shape();
  line.graphics.beginStroke("blue")
  line.graphics.moveTo(dot1.x, dot1.y);
  line.graphics.lineTo(dot2.x, dot2.y);
  stage.addChild(line); // add to stage
  stage.update(); // show the new circle

  allLines.push(line);
}

function updateMessage(newMsg){
  $('#message').text(newMsg);
}


function stageClick(evt){

  // find the next node without a sprite. break after finding that node.
  var foundIndex = -1;
  for (var i = 0; i < allNodes.length; i++){
    var node = allNodes[i];
    if (!node.sprite){
      node.setCoordinates(evt.stageX, evt.stageY);
      foundIndex = i;
      break;
    }
  }
  if (foundIndex < allNodes.length - 1)
    updateMessage("Select The " + allNodes[foundIndex +1].name);
  else if (foundIndex == allNodes.length - 1)
    updateMessage("All Nodes Entered. Click Calculate and then Save");
}
stage.on("stagemousedown", stageClick);
