Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML =  '<img id="captured_image" src="'+data_uri+'"/>';
    }
    );
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3XixdiqPe/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = document.getElementById("result_gesture_meaning");
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_meaning");
        speak();
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
            document.getElementById("result_gesture_meaning").innerHTML = "- This is Looking Amazing";
        }
        if(results[0].label == "Best")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
            document.getElementById("result_gesture_meaning").innerHTML = "- All the Best";
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996;";
            document.getElementById("result_gesture_meaning").innerHTML = "- That was a Marvelous Victory";
        }
        if(results[0].label == "Horn")
        {
            document.getElementById("update_gesture").innerHTML = "&#129304;";
            document.getElementById("result_gesture_meaning").innerHTML = "- Horn Please!";
        }
        if(results[0].label == "Bad")
        {
            document.getElementById("update_gesture").innerHTML = "&#128078;";
            document.getElementById("result_gesture_meaning").innerHTML = "- Bad Luck";
        }
    }
}