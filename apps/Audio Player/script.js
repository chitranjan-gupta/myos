const player = document.querySelector('.box');
const audio = player.querySelector('#audi');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const progress = document.querySelector('.progress');
const progressBar = progress.querySelector('.progress__filled');
const ranges = document.querySelector('.player_slider');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
var va = 0;
var aaa = "0";
var aa = "0";
var sa = "0";
var as = "0";
var fz = "0";
var zf = "0";
var nam = document.getElementById("name");
var timenow = document.getElementById("timenow");
var totaltime = document.getElementById("totaltime");
function tPlay() {

	if (va === 1) {
		audio.play();
		play.style.display = "none";
		pause.style.display = "block";
		console.log("Playing");
	}
}
function tPause() {

	if (va === 1) {
		audio.pause();
		play.style.display = "block";
		pause.style.display = "none";
		console.log("Paused");
	}
}
function handleProgress() {
	const percent = (audio.currentTime / audio.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
	removethirdzero();
	removezero();
	removefourthzero();
	addzero();
	if ((Math.trunc(audio.currentTime)) >= 60) {
		timenow.innerHTML = sa + Math.trunc((Math.trunc(audio.currentTime)) / 60) + ":" + as + ((Math.trunc(audio.currentTime)) % 60);
	} else {
		timenow.innerHTML = "00" + ":" + aaa + Math.trunc(audio.currentTime);
	}
}
function handleRangeUpdate() {
	audio[this.name] = this.value;
}
function scrub(e) {
	if (va == 1) {
		const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
		audio.currentTime = scrubTime;
	}
}

audio.addEventListener('click', tPlay);
audio.addEventListener('timeupdate', handleProgress);
audio.addEventListener('loadedmetadata', (event) => {
	removesecondzero();
	totaltime.innerHTML = aa + (Math.trunc((Math.trunc(audio.duration)) / 60)) + ":" + ((Math.trunc(audio.duration)) % 60);
});

ranges.addEventListener('change', handleRangeUpdate);
ranges.addEventListener('mousemove', handleRangeUpdate);

progress.addEventListener('click', scrub);
progress.addEventListener('click', handleProgress);

forward.addEventListener('click', function (e) {
	if (va == 1) {
		audio.currentTime += 5;
	}
});
backward.addEventListener('click', function (e) {
	if (va == 1) {
		audio.currentTime -= 5;
	}
});
function myfile(event) {
	var output = document.getElementById('audi');
	if (event.target.files[0] != null) {
		output.src = URL.createObjectURL(event.target.files[0]);
		va = 1;
		nam.innerHTML = event.target.files[0].name;
		//console.log(returnFileSize(event.target.files[0].size));
		window.URL.revokeObjectURL(event.target.files[0]);
	}
}
function returnFileSize(number) {
	if (number < 1024) {
		return number + 'bytes';
	} else if (number >= 1024 && number < 1048576) {
		return (number / 1024).toFixed(1) + 'KB';
	} else if (number >= 1048576) {
		return (number / 1048576).toFixed(1) + 'MB';
	}
}
function removezero() {
	if ((Math.trunc(audio.currentTime)) >= 10) {
		aaa = "";
	}
}
function removesecondzero() {
	if ((Math.trunc((Math.trunc(audio.duration)) / 60) >= 10)) {
		aa = "";
	}
}
function removethirdzero() {
	if ((Math.trunc((Math.trunc(audio.currentTime)) / 60) >= 10)) {
		sa = "";
	}
}
function removefourthzero() {
	if (((Math.trunc(audio.currentTime)) % 60) >= 10) {
		as = "";
	}
}
function addzero() {
	if (((Math.trunc(audio.currentTime)) % 60) < 10) {
		as = "0";
	}
}