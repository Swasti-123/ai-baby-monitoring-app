status1=false;


function preload(){
    alarm=loadSound("nuclear-alarm-6997.mp3");
}

function setup(){
    canvas=createCanvas(650,450);
    canvas.center();
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML=" Status: Detecting Baby";

}

function modelLoaded(){
    console.log("Model Loaded");
    status1=true;
    object_detector.detect(img, gotResult);
}

function gotResult(error, results){
if (error){
    console.error(error);
}
console.log(results);
objects=results;
}

function draw(){
    image(img,0,0,650,450);

    for(i=0; i<objects.length; i++){
        stroke("black");
        fill("black");
        text(objects[i].label +"  " + Math.floor(objects[i].confidence * 100) + "%", objects[i].x  , objects[i].y -10);
        noFill();
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


        if(objects[i].label == person){
            document.getElementById("status").innerHTML= "Baby Detected";
            alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML= "Baby Not Detected";
                alarm.play();  
            }
    }
    
    if(objects.length < 0){
        document.getElementById("status").innerHTML= "Baby Not Detected";
                alarm.play(); 
    }
}