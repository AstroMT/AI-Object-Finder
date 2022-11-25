var current_status = "";
video = "";
objects = [];

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

var input = "";

function start() {
    input = document.getElementById("object_input").value;
    if(input = "") {
        document.getElementById("status_label").innerHTML = "Enter an input before starting";
        document.getElementById("found_label").innerHTML = "Error";
    } else {
        objectDetector = ml5.objectDetector('cocossd', modelLoaded());
        console.log(input);
        document.getElementById("status_label").innerHTML = "Status: Detecting Objects";    
    }
}

function modelLoaded() {
    console.log("Your model is loaded!");
    current_status = true;
}

function draw() {
    image(video, 0, 0, 500, 450);

    if (current_status != "") {
        objectDetector.detect(video, gotResult);
        document.getElementById("status_label").innerHTML = "Status: Detection Finished";
        input = document.getElementById("object_input").value;
        console.log(input);

        for (i = 0; i < objects.length; i++) {
            fill("red");

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);

            noFill();
            stroke("red");
            rect(objects[i].width, objects[i].height, objects[i].x, objects[i].y);

            if(objects[i].label == input) {
                document.getElementById("found_label").innerHTML = "A " + input + " was found"
            } else {
                document.getElementById("found_label").innerHTML = "A " + input + " was not found"
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        current_status = true;
        objects = results;
    }
}