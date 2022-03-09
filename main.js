song=""
statuss="";
objects=[];
function setup()
{
canvas= createCanvas(640,420);
canvas.center()
video = createCapture(VIDEO);
video.size(640,420);
video.hide();
objectDetector= ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML= "STATUS : DETECTING OBJECTS";
}
function preload()
{
    song= loadSound("audio.wav")
}
 function modelLoaded()
 {
     console.log("Model Loaded");
     statuss= true;

 }

 function gotResult(error, results)
 {
     if (error)
     {
         console.error(error);
     }
     else{
         console.log(results);
         objects=results
     }
 }
function draw()
{
image(video,0,0, 640,420);
if( statuss !="")
{
    r= random(255);
    g= random(255);
    b= random(255);
     objectDetector.detect(video, gotResult);

     for (i=0; i < objects.length; i++)
     {
    document.getElementById("status").innerHTML= "status : Object Detected";
     fill(r,g,b);
     percent = floor(objects[i].confidence*100);
     text(objects[i].label+ "" + percent + "%", objects[i].x+ 15, objects[i].y + 15);
     noFill();
     stroke(r,g,b);
     rect(objects[i].x, objects[i].y, objects[i].width, objects[i].width)
     document.getElementById("number-of-object").innerHTML= "baby found"
     song.stop();
     }
    }
    else
    {
        document.getElementById("number-of-object").innerHTML= "baby not found"
        song.play();
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}