var button = document.getElementById("startbtn");
var inputmessage = document.getElementById("message");
var ready = false;
var proofimage = null;
var confidence = document.getElementById("confidence");
var stats = document.getElementById("stats");
var percent;
var Checkbox =  document.getElementById("Checkbox");
var Checkboxstate = false;
function setup() {
    canvas = createCanvas(screen.width / 3, screen.height / 2);
    canvas.center();
    capture = createCapture(VIDEO);
    capture.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded() {
    console.log("Cocossd is loaded");
    document.getElementById("title").innerHTML = "CyberCamera";
    stats.innerHTML = "Status : Detecting Objects";
}
function draw() {
    image(capture, 0, 0, screen.width / 3, screen.height / 2);
    if (ready) {
        objectDetector.detect(capture, gotResult);
    }
}
function btnstart() {
    if (ready == false) {
        ready = true;
        button.innerHTML = "Stop";
    } else {
        ready = false;
        button.innerHTML = "Start";
        reload();
    }
}
function gotResult(error, results) {

    if (error) {
        console.log(error);
    } else {
        if (results.length > 0) {
            stats.innerHTML = "Status : Object Detected";
        }else {
            stats.innerHTML = "Status : No Objects Detected";
        }
        for (i = 0; i < results.length; i++) {
            percent = Math.floor(results[i].confidence * 100);
            if (results[i].label == "person") {
                confidence.innerHTML = "Confidence : " + percent + "% (Person)";
                saytext(inputmessage.value);
                if (proofimage == null) {
                    proofimage = "Found";
                    //capture.save('CyberCamPersonPicture','png');
                    if (Checkboxstate) {
                    save(capture,'CyberCamPersonPicture.png');
                    save('CyberCamPersonPicture.png');
                    }
                }
            }else {
                confidence.innerHTML = "Confidence : " + percent + "% (" + results[i].label + ")";
            }

        }
    }
}

function saytext(text) {
    if (ready) {
        const sound = new SpeechSynthesisUtterance(text);
        sound.rate = 1;
        speechSynthesis.speak(sound);
    }
}
function reload() {
    location.reload(true);
}
function inputdetect() {
if (Checkboxstate) {
    Checkboxstate = false;
}else {
    Checkboxstate = true;
}
}