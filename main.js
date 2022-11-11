img = "";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(500,350);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status !="");
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);
        }
    }
    //fill("red");
    //text("Dog", 45, 75);
    //noFill();
    //stroke("red");
    //rect(30, 60, 450, 350);

    //fill("red");
    //text("Cat", 320, 120);
    //noFill();
    //stroke("red");
    //rect(300, 90, 270, 320);
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}