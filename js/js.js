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

var easelElements = {};
function setupCanvas(){
    //Create a stage by getting a reference to the canvas
    stage = new createjs.Stage("demoCanvas");
    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);
    //Update stage will render next frame
    stage.update();
    easelElements['stage'] = stage;
    alert('this ran');
}
setupCanvas();
