var video = document.querySelector('video');
function myFunction() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (mediaStream) {
        window.stream = mediaStream;
        video.srcObject = mediaStream;
        video.play();
    });
}
take_photo_btn = document.querySelector('#take-photo');
download_photo_btn = document.querySelector('#down');
take_photo_btn.addEventListener("click", function (e) {

    e.preventDefault();

    var snap = takeSnapshot();

    download_photo_btn.href = snap;

});

function takeSnapshot() {

    var image = document.querySelector('snap');
    var hidden_canvas = document.querySelector('canvas'),
        context = hidden_canvas.getContext('2d');

    var width = video.videoWidth,
        height = video.videoHeight;

    if (width && height) {


        hidden_canvas.width = width;
        hidden_canvas.height = height;

        context.drawImage(video, 0, 0, width, height);


        return hidden_canvas.toDataURL('image/png');
    }
}


