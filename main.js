img = "";
status = "";
objects = [];
function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status = Detecting objects...";
}
function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            objectDetector.detect(video, gotResult);
            document.getElementById("status").innerHTML = "Object Detected!";
            document.getElementById("no_of_object").innerHTML = "Cocossd has identified " + objects.length + " objects!!!"
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            percent = floor(objects[i].confidence  * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){

console.log("Model Loaded!!!");
status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}