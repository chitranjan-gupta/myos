var isLoading = false;
var value = [];
var position = 0;
var historylength = 20;
onload = function () {
	var view = document.querySelector('.view');

	document.querySelector('#back').onclick = function () {
		goBack();
	};

	document.querySelector('#forward').onclick = function () {
		goForward();
	};

	document.querySelector('#home').onclick = function () {
		navigateTo('http://www.google.com');
	};

	document.querySelector('#reload').onclick = function () {
		if (isLoading) {
			view.stop();
		} else {
			document.querySelector('.view').src = document.querySelector('.view').src;
		}
	};

	document.querySelector('#webpage').onsubmit = function (e) {
		e.preventDefault();
		navigateTo(document.querySelector('#site').value);
	};

	setInterval(function () {
		canGoBack();
		canGoForward();
	}, 1000);
}
function navigateTo(url) {
	var view = document.getElementsByTagName('iframe')[0];
	view.src = url;
	setHistory(view.src);
}

function handleKeyDown(event) {
	if (event.ctrlKey) {
		switch (event.keyCode) {
			// Ctrl+F.
			case 70:
				event.preventDefault();
				break;

			// Ctrl++.
			case 107:
			case 187:
				event.preventDefault();
				break;

			// Ctrl+-.
			case 109:
			case 189:
				event.preventDefault();
		}
	}
}

function goForward() {
	if (value.length >= 2) {
		for (var i = 0; i < historylength; i++) {
			if (value[i] == (document.querySelector('.view').src)) {
				if (i > -1 && i < historylength) {
					document.querySelector('.view').src = value[i + 1];
					document.querySelector('#site').value = value[i + 1];
					break;
				}
			}
		}
	} else {
		alert("Cannot Go Forward! No History Available");
	}
}
function goBack() {
	if (value.length >= 2) {
		for (var i = 0; i < 20; i++) {
			if (value[i] == (document.querySelector('.view').src)) {
				if (i > -1 && i < historylength) {
					document.querySelector('.view').src = value[i - 1];
					document.querySelector('#site').value = value[i - 1];
					break;
				}
			}
		}
	} else {
		alert("Cannot Go Backward! No History Available");
	}
}
function setHistory(url) {
	if (url != '') {
		value[position] = url;
		position++;
	}
}
function clearHistory() {
	while (value.length != 0) {
		value.pop();
	}
}
setInterval(function () {
	canGoBack();
	canGoForward();
}, 500);
function canGoBack() {
	if ((value.length >= 2) && (value.indexOf(document.querySelector('.view').src) > 0)) {
		document.querySelector('#back').disabled = false;
	} else {
		document.querySelector('#back').disabled = true;
	}
}
function canGoForward() {
	if ((value.length >= 2) && (value.indexOf(document.querySelector('.view').src) < (value.length - 1))) {
		document.querySelector('#forward').disabled = false;
	} else {
		document.querySelector('#forward').disabled = true;
	}
}
function stopLoading() {

}