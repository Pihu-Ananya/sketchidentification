function preload() {
    classifier=ml5.imageClassifier("DoodleNet")
}

function setup() {
canvas=createCanvas(380 , 380);
canvas.center()
background("white");
 canvas.mouseReleased(classifyCanvas)
 synth=window.speechSynthesis;
}

function clearcanvas() {
    background("white")
}

function draw() {
    strokeWeight(7)
    stroke(0)

    if(mouseIsPressed){
        line(pmouseX , pmouseY , mouseX , mouseY)
    }
}

function classifyCanvas() {
    classifier.classify(canvas,gotResult)

}

function gotResult(error , results) {
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        document.getElementById("label").innerHTML=results[0].label
        document.getElementById("confiedence").innerHTML=Math.round(results[0].confidence*100)+"%"
        utter=new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utter)
    }
}