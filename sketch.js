let catputer;
let posenet;
let noseX, noseY;
let singlePose, skeleton;
var w = window.innerWidth/2;
var h = window.innerHeight/2;
let imge="";
let mouth;
let goggles;
let face;
let goldChain;
let noFace;
var i1 = 'img/goggles.png';
var i2 = 'img/goldChain.png';
var i3 = 'img/mouth.png';
var i4 = 'img/face.png';
var i5 = 'img/noFace.png';
function img1(){
    imge = i1;
}
function img2(){
    imge = i2;
}
function img3(){
    imge = i3;
}
function img4(){
    imge = i4;
}
function img5(){
    imge = i5;
}

function preload() {
  }
function setup() {
    var myCanvas = createCanvas(w, h);
    myCanvas.parent("canvasContainer");
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
    goggles = loadImage('img/goggles.png');
    goldChain = loadImage('img/goldChain.png');
    mouth = loadImage('img/mouth.png');
    face = loadImage('img/face.png');
    noFace = loadImage('img/none.png');
    //console.log(face);
}
// function getRandomArbitary(min, max){
//     return Math.random()*(max-min)+min;
// }
function receivedPoses(poses){
    console.log(poses);
    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
    //console.log(noseX+" "+noseY);
}
function modelLoaded(){
    console.log('Model Loaded..');
}
function draw(){
    //r = getRandomArbitary(0, 255);
    //g = getRandomArbitary(0, 255);
    //b = getRandomArbitary(0, 255);
    //fill(r, g, b);
    //rect(mouseX, mouseY, 50, 50);
    image(capture, 0, 0);
    fill(0, 255, 0);
    if(singlePose){
        for(let i=5; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 10);
  
        }
        stroke(255, 255, 255);
        strokeWeight(2);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
            
        }
        if(imge == i4){

            image(face, (singlePose.keypoints[3].position.x + singlePose.keypoints[4].position.x)/2-70, singlePose.keypoints[1].position.y-50, 150, 150);
        }
        if(imge == i3){

            image(mouth, singlePose.nose.x-100, singlePose.nose.y+0, 100, 100);
        }
        if(imge == i2){

            image(goldChain, (singlePose.keypoints[5].position.x + singlePose.keypoints[6].position.x)/2-70, singlePose.keypoints[5].position.y-50, 150, 100);
        }
        if(imge == i1){
            image(goggles, singlePose.keypoints[1].position.x-130, singlePose.keypoints[1].position.y-80, 200, 150);
            //image(goggles, singlePose.rightEye.x, singlePose.rightEye.y, 150, 150);
        }
        if(imge == i5 || imge==""){
            for(let i=0; i<5; i++){
                ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 10);
      
            }
        }
    }
    //clear();
    //background(200);
    //break;
    //keypoints

}
