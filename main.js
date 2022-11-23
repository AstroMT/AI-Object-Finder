var status = "";
objects = [];
current_status = "";

function preload() {}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(800, 600);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_label").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("Your model is loaded!");
    current_status = true;
}

function gotResults(results) {
    if(results.length > 0) {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 800, 600);
    if (current_status != "") {
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status_label").innerHTML = "Status: Detection Complete";

            fill("red");

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);

            noFill();
            stroke("red");
            rect(objects[i].width, objects[i].height, objects[i].x, objects[i].y);

            if (objects[i].label == document.getElementByid("object_input").value) {
                document.getElementById("found_label").innerHTML = "Specified object was detected";
            } else {
                document.getElementById("found_label").innerHTML = "Specified object was not detected";
            }


        }
    }
}