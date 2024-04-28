var recordButton, stopButton, recorder, request, download;
window.onload = function () {
  request = document.getElementById('Confirm');
  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');
  download = document.getElementById('download');

  request.disabled = false;
  request.onclick = myFunction;
}
function myFunction() {
  navigator.mediaDevices.getUserMedia({
    audio: true
  })
    .then(function (stream) {
      recordButton.disabled = false;
      recordButton.addEventListener('click', startRecording);
      stopButton.addEventListener('click', stopRecording);
      recorder = new MediaRecorder(stream);
      request.disabled = true;
      recorder.addEventListener('dataavailable', onRecordingReady);
    });
};

function startRecording() {
  recordButton.disabled = true;
  stopButton.disabled = false;
  request.disabled = true;
  recorder.start();
}

function stopRecording() {
  recordButton.disabled = false;
  stopButton.disabled = true;
  recorder.stop();
}

function onRecordingReady(e) {
  var audio = document.getElementById('audio');
  audio.src = URL.createObjectURL(e.data);
  download.disabled = false;
}
function downloadlink(audio) {

}