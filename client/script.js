
const video = document.getElementById('video')
var thecanvas = document.getElementById('canvas');
var context = thecanvas.getContext('2d');

var img = thecanvas;

var FaceDetect = 0;
// Bridge ip-adresse. Find den fx i hue app'en
var switchOnoff = true;
var url = '192.168.0.102';
// Fælles brugernavn
var username = 'lNTrkztmTnvxvxMHkCR0e3Ju2bNlnhHVj3-umlez';
var dimmer, temper, breather, on;
//Den pære du vil kontrollere
var lightNumber = 13;

var canvas;
var canvasH, canvasW;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia({
            video: {}
        },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', () => {
    canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {
        //width: video.width,
        //height: video.height
        width: canvasW,
        height: canvasH
    }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        FaceDetect = resizedDetections[0];
        if (FaceDetect != undefined) {
            FaceDetect = FaceDetect["detection"];
            if (FaceDetect != undefined) {
                FaceDetect = FaceDetect["_score"];
                if (FaceDetect = undefined) {
                    FaceDetect = 0;
                }
            } else {
                FaceDetect = 0;
            }
        } else {
            FaceDetect = 0;
        }
    }, 100)
})

function setup() {
    canvasH = 400;
    canvasW = 500;
    createCanvas(canvasW, canvasH);
    
 
    canvas = video;

    connect(); // connect to Hue hub; it will show all light states

}

function draw() {
    if (FaceDetect != 0) {
        console.log("Face is detected!")
        //on();
        breathe();
        //saveAndSendImage();
    }
    FaceDetect = 0;
}

/*
This function makes the HTTP GET call to get the light data:
HTTP GET http://your.hue.hub.address/api/username/lights/
*/
function connect() {
    url = "http://" + url + '/api/' + username + '/lights/';
    httpDo(url, 'GET', getLights);
}

/*
this function uses the response from the hub
to create a new div for the UI elements
*/
function getLights(result) {
    resultDiv.html("<hr/>" + result);
}

function changeBrightness() {
    var brightness = this.value(); // get the value of this slider
    var lightState = { // make a JSON object with it
        bri: brightness,
        on: true
    }
    // make the HTTP call with the JSON object:
    setLight(lightNumber, lightState);
}

function changeTemperature() {
    var temperature = this.value(); // get the value of this slider
    var lightState = { // make a JSON object with it
        ct: temperature,
        on: true
    }
    // make the HTTP call with the JSON object:
    setLight(lightNumber, lightState);
}

function breathe() {
    var lightState = { // make a JSON object with it
        alert: "select",
        on: true
    }
    // make the HTTP call with the JSON object:
    setLight(lightNumber, lightState);
}

function on() {

    var lightState = {
        on: true,
    }
    setLight(lightNumber, lightState);
}

function setLight(whichLight, data) {
    var path = url + whichLight + '/state/';

    var content = JSON.stringify(data); // convert JSON obj to string
    httpDo(path, 'PUT', content, 'text', getLights); //HTTP PUT the change
}

function saveAndSendImage() {
    if (FaceDetect == undefined) {
        console.log("Fuck all of ya niggas");
      
        var delayInMilliseconds = 2000; //1 second - value / 1000 = irl sec.

        setTimeout(function () {
            //Your code to be executed after 2 second
            let cv = thecanvas;
            //let billede = context.drawImage(video, 0, 300, canvasW, canvasH);
            setTimeout(function(){
               // image(billede, 100, 100);
                save('output.png');
            }, delayInMilliseconds);
            
        }, delayInMilliseconds);


        twitterAPI.uploadAndSendTweet(); ;
        //twitter.draw();
    }
}