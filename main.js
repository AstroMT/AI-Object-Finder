var status = "";
objects = [];
current_status = "";

function preload() {}

function setup() {
    canvas = createCanvas(1240, 336);
    canvas.center();
 
    video = createCapture(VIDEO);
    video.size(1240, 336);
    video.hide();
 
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 300);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("Your model is loaded!");
    current_status = true;
}