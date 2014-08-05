function supportsMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

// cross-browser support for getUserMedia
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

window.URL = window.URL || window.webkitURL;

window.requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame
})();

window.AudioContext = window.AudioContext || window.webkitAudioContext;


var mediaStream;

// global variables for showing/encoding the video
var mediaInitialized = false;
var recording = false;
var videoCanvas;
var videoContext;
var frameTime;
var imageArray = [];

// global variables for recording audio
var audioContext;
var audioRecorder;

// function for requesting the media stream
function setupMedia() {
    if (true) {
        audioContext = new AudioContext();

        navigator.getUserMedia(
            {
                video: true,
                audio: true
            },
            function (localMediaStream) {
                // map the camera
                var video = document.getElementById('live_video');
                video.src = window.URL.createObjectURL(localMediaStream);

                // create the canvas & get a 2d context
                videoCanvas = document.createElement('canvas');
                videoContext = videoCanvas.getContext('2d');

                // setup audio recorder
                var audioInput = audioContext.createMediaStreamSource(localMediaStream);
                //audioInput.connect(audioContext.destination);
                // had to replace the above with the following to mute playback
                // (so you don't get feedback)
                var audioGain = audioContext.createGain();
                audioGain.gain.value = 0;
                audioInput.connect(audioGain);
                audioGain.connect(audioContext.destination);

                audioRecorder = new Recorder(audioInput);
                mediaStream = localMediaStream;
                mediaInitialized = true;

                document.getElementById('uploading').hidden = true;
                
                document.getElementById('record').hidden = false;
            },
            function (e) {
                console.log('web-cam & microphone not initialized: ', e);
                document.getElementById('media-error').hidden = false;
            }
        );
    }
};


var jp_start = function() {

  console.log("click #start-recording");

  document.getElementById('stop-recording').disabled = false;
  document.getElementById('start-recording').disabled = true;
  startRecording();
  
}

var jp_stop = function() {
    
  console.log("click #stop-recording");

  document.getElementById('stop-recording').disabled = true;
  document.getElementById('start-recording').disabled = false;
  stopRecording();
    
}

function startRecording() {
    console.log("Begin Recording");

    videoElement = document.getElementById('live_video');
    videoCanvas.width = videoElement.width;
    videoCanvas.height = videoElement.height;

    imageArray = [];

    // do request frames until the user stops recording
    recording = true;
    frameTime = new Date().getTime();
    requestAnimationFrame(recordFrame);

    // begin recording audio
    audioRecorder.record();
}

function stopRecording() {
    console.log("End Recording");
    recording = false;
}

function completeRecording() {
    // stop & export the recorder audio
    audioRecorder.stop();

   
    console.log("completeRecording: ");

    document.getElementById('uploading').hidden = false;

    audioRecorder.exportWAV(function (audioBlob) {
        // save to the db
        BinaryFileReader.read(audioBlob, function (err, fileInfo) {
            //TODO send post?
            /*
            UserAudios.insert({
                userId: user._id,
                audio: fileInfo,
                save_date: Date.now()
            });
            */
            $.ajax({
              type: 'POST',
              url: '/tracks/test',
              data: {data: fileInfo},
              success: function(data, status) {
                console.log(data);
                console.log(status);
              }
            });
            console.log(fileInfo);
        });
        console.log("Audio uploaded");
        
    });

    // do the video encoding
    // note: tried doing this in real-time as the frames were requested but
    // the result didn't handle durations correctly.
    var whammyEncoder = new Whammy.Video();
    for (i in imageArray) {
        videoContext.putImageData(imageArray[i].image, 0, 0);
        whammyEncoder.add(videoContext, imageArray[i].duration);
        delete imageArray[i];
    }
    var videoBlob = whammyEncoder.compile();

    BinaryFileReader.read(videoBlob, function (err, fileInfo) {
        //TODO send post?
        console.log(fileInfo)
        /*
        UserVideos.insert({
            userId: user._id,
            video: fileInfo,
            save_date: Date.now()
        });
        
        $.ajax({
          type: 'POST',
          url: '/tracks/test',
          data: {data: fileInfo},
          success: function(data, status) {
            console.log(data);
            console.log(status);
          }
        })
*/
        //console.log('video');
        //console.log(fileInfo);
    });
    console.log("Video uploaded");

    // stop the stream & redirect to show the video
    mediaStream.stop();
    console.log('Now we are done');
}

function recordFrame() {
//    console.log("-frame");

    if (recording) {
        var image;
        // draw the video to the context, then get the image data
        var video = document.getElementById('live_video');
        var width = video.width;
        var height = video.height;
        videoContext.drawImage(video, 0, 0, width, height);

        // optionally get the image, do some filtering on it, then
        // put it back to the context
        imageData = videoContext.getImageData(0, 0, width, height);
        // - do some filtering on imageData
        videoContext.putImageData(imageData, 0, 0);

        var frameDuration = new Date().getTime() - frameTime;

        console.log("duration: " + frameDuration);
        //whammyEncoder.add(videoContext, frameDuration);
        imageArray.push(
            {
                duration: frameDuration,
                image: imageData
            });
        frameTime = new Date().getTime();

        // request another frame
        requestAnimationFrame(recordFrame);
    }
    else {
        completeRecording();
    }
}


var BinaryFileReader = {
    read: function (file, callback) {
        var reader = new FileReader;

        var fileInfo = {
            name: file.name,
            type: file.type,
            size: file.size,
            file: null
        }

        reader.onload = function () {
            fileInfo.file = new Uint8Array(reader.result);
            callback(null, fileInfo);
        }
        reader.onerror = function () {
            callback(reader.error);
        }

        reader.readAsArrayBuffer(file);
    }
}