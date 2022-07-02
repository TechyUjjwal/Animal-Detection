status = "";
objects = [];

function setup() {
    canvas = createCanvas(600,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(500,400);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded !");
    status = true;
    objectDetector.detect(video, gotResult); 
}

function draw() {
    image(video,0,0,600,400);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status:Object Detected";
            document.getElementById("name_of_obj").innerHTML = "Objects Detected " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);   
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
