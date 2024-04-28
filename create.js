var jsonfile;
function handlefile(event) {
	//event.stopPropagation();
	event.preventDefault();
	console.log("File(s) Dropped");
	//alert(event.dataTransfer.files[0].name);
	var installer = document.getElementById("installer");
	var insicon = document.getElementById("insicon");
	var insname = document.getElementById("namein");
	var fileName = 0;
	/**	if((window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem)){//&&(window.directoryEntry = window.directoryEntry || window.webkitDirectoryEntry)){
		console.log("Supported");
		var items = event.dataTransfer.items;
			event.preventDefault();
			for(var i=0;i<items.length;i++){
				var item = items[i].webkitGetAsEntry();

				if(item){
					scanFiles(item,listing);
				}
			}
	}else{
		alert("Not Supported");
	}**/
	/**if(window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem)
{
	console.log("Supported");
	//alert("Supported");
	var requestedBytes = 1024*1024*28;
   navigator.webkitPersistentStorage.requestQuota(requestedBytes,function(grantedBytes){
	   window.webkitRequestFileSystem(PERSISTENT,grantedBytes,function(){
			console.log("Came To Me");
			folder.getFile('settings.json',{},function(fileEntry){
			fileEntry.file(function(filenfile){
			var reader = new FileReader();
			reader.onload = receivedText;
			reader.readAsText(filenfile);
		});
	},errorover);
	   },errorHandler);
	   console.log('we were granted ', grantedBytes, 'bytes');
   },function(e){
   console.log('Error ',e);}
   );
}
else{
	console.log("Not Supported");
	alert("Not Supported");
}**/
	if (event.dataTransfer.items) {
		for (var i = 0; i < event.dataTransfer.items.length; i++) {
			if (event.dataTransfer.items[i].kind === 'file') {
				var filen = event.dataTransfer.items[i].getAsFile();
				console.log('File[' + i + '].name = ' + filen.name);
				//console.log('File['+ i + '].path= '+filen.fullPath);
				var reader = new FileReader();
				if (filen.name == 'settings.json') {
					//jsonfile=filen.name;
					fileName = 1;
					console.log("Received");
					console.log(filen.name);
					reader.onload = receivedText;
					reader.readAsText(filen);
				}
			}
		}
	}
	else {

		for (var i = 0; i < event.dataTransfer.files.length; i++) {

			console.log('file[' + i + '].name = ' + event.dataTransfer.files[i].name);

		}
	}
	if (fileName == 1) {
		installer.style.display = "block";
	}
	/**var xhttp = new XMLHttpRequest();
	xhttp.withCredentials = true;
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var javaobj = JSON.parse(xhttp.response);
			//alert(javaobj.name);
			//create(javaobj.name,javaobj.windows,javaobj.windows_width,javaobj.windows_height);
			//createmain(javaobj.name,javaobj.icon);
			insicon.src = javaobj.icon;
			insname.innerHTML = javaobj.name;
		}
	};
	if("withCredentials" in xhttp){
	xhttp.open("GET",jsonfile,true);
		}else if(typeof XDomainRequest != "undefined"){
			xhttp = new XDomainRequest();
			xhttp.open("GET",jsonfile);
		}
		else{
			xhttp = null;
		}
		xhttp.onerror = function(){
			alert("CORS not supported in chrome and opera || It works in Firefox");
		};
	xhttp.send();**/
}
function receivedText(e) {
	var insicon = document.getElementById("insicon");
	var insname = document.getElementById("namein");
	console.log("Received");
	let lines = e.target.result;
	jsonfile = JSON.parse(lines);
	console.log(jsonfile);
	insicon.src = jsonfile.icon;
	insname.innerHTML = jsonfile.name;
}
function installapp() {
	var installer = document.getElementById("installer");
	var insticon = document.getElementById("insicon");
	insticon.style.display = "none";
	var instname = document.getElementById("namein");
	instname.style.display = "none";
	var instbut = document.getElementById("install");
	instbut.style.display = "none";
	var inloading = document.getElementById("spinner");
	inloading.style.display = "block";
	var installing = document.getElementById("installing");
	installing.style.display = "block";
	var exitinstall = document.getElementById("exitinstall");
	exitinstall.style.display = "none";
	setTimeout(function () {
		installer.style.display = "none";
		create(jsonfile.name, jsonfile.windows, jsonfile.windows_width, jsonfile.windows_height);
		createmain(jsonfile.name, jsonfile.icon);
		createtask();
		/**var xhttp = new XMLHttpRequest();  // Using this it shows cors error
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var javaobj = JSON.parse(xhttp.response);
			//alert(javaobj.name);
			create(javaobj.name,javaobj.windows,javaobj.windows_width,javaobj.windows_height);
			createmain(javaobj.name,javaobj.icon);
		}
	};
	xhttp.open("GET",jsonfile,true);
	xhttp.send();**/
	}, 5000);
}
var initX, initY, firstX, firstY;
function create(name, windows, width, height) {

	var divapp = document.createElement("div");
	divapp.setAttribute('id', name);

	var divheader = document.createElement("div");
	divheader.id = "diviheader";

	var a = document.createElement("a");

	var img = document.createElement("img");
	img.setAttribute('src', 'window_assets/exit.jpg');
	img.setAttribute('width', '20');
	img.setAttribute('height', '20');
	img.addEventListener('click', function () {
		divapp.style.display = "none";
		var d = document.getElementById("taskbardiv");
		if (d.style.display === "block") {
			d.style.display = "none";
		}
	}, false);
	img.addEventListener('dblclick', function () {
		divapp.style.display = "none";
		var e = document.getElementById("taskbardiv");
		if (e.style.display === "block") {
			e.style.display = "none";
		}
	}, false);

	var textnode = document.createElement("p");
	textnode.innerHTML = name;
	textnode.style.position = "absolute";
	textnode.style.textAlign = "center";
	textnode.style.top = "-3%";
	textnode.style.left = "40%";
	a.appendChild(img);
	divheader.appendChild(a);
	divheader.appendChild(textnode);

	var iframe = document.createElement("iframe");
	iframe.setAttribute('src', windows);
	iframe.setAttribute('width', width);
	iframe.setAttribute('height', height);
	iframe.setAttribute('scrolling', 'no');

	divapp.appendChild(divheader);
	divapp.appendChild(iframe);
	divapp.style.position = "absolute";
	divapp.style.zIndex = "1";
	divapp.style.backgroundColor = "light blue";
	divapp.style.display = "none";

	var screen = document.getElementById("screen");
	screen.appendChild(divapp);
	divapp.addEventListener('mousedown', function (e) {

		e.preventDefault();
		initX = this.offsetLeft;
		initY = this.offsetTop;
		firstX = e.pageX;
		firstY = e.pageY;
		this.addEventListener('mousemove', dragIt, false);
		window.addEventListener('mouseup', function () {
			divapp.removeEventListener('mousemove', dragIt, false);
		}, false);
	}, false);
	divapp.addEventListener('touchstart', function (e) {
		e.preventDefault();
		initX = this.offsetLeft;
		initX = this.offsetTop;
		var touch = e.touches;
		firstX = touch[0].pageX;
		firstY = touch[0].pageY;

		this.addEventListener('touchmove', swipeIt, false);
		window.addEventListener('touchend', function (e) {
			e.preventDefault();
			divapp.removeEventListener('touchmove', swipeIt, false);
		}, false);
	}, false);
}
function createmain(name, icon) {

	var mag = document.createElement("div");
	mag.style.position = "absolute";
	//mag.setAttribute('id',name+"icon");
	//mag.style.backgroundColor = "pink";
	//mag.innerHTML="Hello";

	var figure = document.createElement("FIGURE");

	var a2 = document.createElement("a");

	var img2 = document.createElement("img");
	img2.setAttribute('src', icon);
	img2.setAttribute('width', '72');
	img2.setAttribute('height', '72');
	img2.addEventListener('click', function () {
		document.getElementById(name).style.display = "block";
		var d = document.getElementById("taskbardiv");
		d.style.display = "block";
		createrecent(name, icon);
	}, false);

	a2.appendChild(img2);
	figure.appendChild(a2);

	var figcaption = document.createElement("FIGCAPTION");
	figcaption.innerHTML = name;
	figcaption.style.textAlign = "center";

	figure.appendChild(figcaption);
	mag.appendChild(figure);

	var fd = document.getElementById("appicon-container");
	fd.appendChild(mag);

	mag.addEventListener('mousedown', function (e) {
		e.preventDefault();
		initX = this.offsetLeft;//this
		initY = this.offsetTop;//this
		firstX = e.pageX;
		firstY = e.pageY;
		this.addEventListener('mousemove', dragIt, false);//this
		window.addEventListener('mouseup', function () {
			mag.removeEventListener('mousemove', dragIt, false);
		}, false);
	}, false);
	mag.addEventListener('touchstart', function (e) {
		e.preventDefault();
		initX = mag.offsetLeft;//this
		initX = mag.offsetTop;//this
		var touch = e.touches;
		firstX = touch[0].pageX;
		firstY = touch[0].pageY;

		this.addEventListener('touchmove', swipeIt, false);
		window.addEventListener('touchend', function (e) {
			e.preventDefault();
			mag.removeEventListener('touchmove', swipeIt, false);
		}, false);
	}, false);
}
function dragIt(e) {
	this.style.left = initX + e.pageX - firstX + 'px';
	this.style.top = initY + e.pageY - firstY + 'px';
}
function swipeIt(e) {
	var contact = e.touches;
	this.style.left = initX + contact[0].pageX - firstX + 'px';
	this.style.top = initY + contact[0].pageY - firstY + 'px';
}
function exitinstall() {
	var installer = document.getElementById("installer");
	installer.style.display = "none";
}
function createtask() {
	var taskdiv = document.createElement("div");
	taskdiv.id = "taskbardiv";
	taskdiv.style.position = "absolute";
	taskdiv.style.top = "0%";
	taskdiv.style.left = "10%";
	taskdiv.style.width = "39px";
	taskdiv.style.height = "36px";
	taskdiv.style.display = "none";
	//taskdiv.style.backgroundColor="white";
	taskdiv.style.border = "2px green solid";
	var img3 = document.createElement("img");
	img3.id = "taskbaricon";
	img3.src = jsonfile.icon;
	img3.style.width = "37px";
	img3.style.height = "35px";
	img3.style.display = "block";
	img3.addEventListener('click', function () {
		var appn = document.getElementById(jsonfile.name);
		if (appn.style.display == "none") {
			appn.style.display = "block";
		}
		else {
			appn.style.display = "block";
		}
	}, false);
	taskdiv.appendChild(img3);
	var taskbar = document.getElementById("taskbar");
	taskbar.appendChild(taskdiv);
}
function errorHandler(e) {
	console.log('Error Occured');
}
function errorover(e) {
	console.log("Error Occured");
}
function scanFiles(item, container) {
	console.log(item.name);
	console.log(item.fullPath);
	console.log("Folder :" + item.isDirectory);
	console.log("File :" + item.isFile);

	/**if(item.isDirectory){
		console.log("RE");
		var directoryReader = item.createReader();
		var directoryContainer = document.createElement("ul");
			container.appendChild(directoryContainer);

			directoryReader.readEntries(function(entries){
				console.log("RE2");
				entries.forEach(function(entry){
					scanFiles(entry,directoryContainer);
				});
			}); **/
	/**item.getFile('settings.json',{},function(fileEntry){
		console.log("Got");
	fileEntry.file(function(filenfile){
	var reader = new FileReader();
	reader.onload = receivedText;
	reader.readAsText(filenfile);
	},errorHandler);
},errorHandler);**/
	/**	}
		else{
			 console.log("R");
		}**/
}
function showrecent() {
	console.log("Reached To Show Hide Function");
	var recent = document.getElementById("recent");
	if (recent.style.display == "none") {
		recent.style.display = "block";
	}
	else if (recent.style.display = "block") {
		recent.style.display = "none";
	}
}
function createrecent(N, I) {
	console.log("Reached To Create Recent Function");
	var recent = document.getElementById("recent");
	var appview = document.createElement("div");
	appview.style.position = "relative";
	appview.style.left = "1.5%";
	appview.style.width = "345px";
	appview.style.height = "150px";
	appview.style.marginTop = "17px";
	appview.setAttribute("draggable", "false");

	var appname = document.createElement("div");
	appname.style.position = "absolute";
	appname.style.top = "0%";
	appname.style.left = "0%";
	appname.style.width = "90px";
	appname.style.height = "50px";
	appname.style.color = "#FFFFFF";
	appname.style.borderBottom = "1px solid #BABABA";
	appname.setAttribute("draggable", "false");

	var nameapp = document.createElement("p");
	nameapp.style.position = "relative";
	nameapp.style.color = "white";
	nameapp.style.left = "0%";
	nameapp.style.bottom = "-16px";
	nameapp.setAttribute("draggable", "false");
	nameapp.innerHTML = N;

	var appscreen = document.createElement("img");
	appscreen.src = "error.png";
	appscreen.style.position = "relative";
	appscreen.style.top = "0%";
	appscreen.style.left = "25%";
	appscreen.style.width = "250px";
	appscreen.style.height = "150px";
	appscreen.setAttribute("draggable", "false");
	appscreen.style.border = "2px solid #0084F0";
	appscreen.style.boxShadow = "0 0 30px 3px #808080";

	var recenticon = document.createElement("img");
	recenticon.src = I;
	recenticon.style.position = "absolute";
	recenticon.style.top = "7%";
	recenticon.style.left = "27%";
	recenticon.style.width = "50px";
	recenticon.style.height = "47px";
	recenticon.style.zIndex = "1";


	appname.appendChild(nameapp);
	appview.appendChild(appname);
	appview.appendChild(recenticon);
	appview.appendChild(appscreen);
	recent.appendChild(appview);
}
function clearrecent() {
	var tobe = document.getElementById("recent");
	while (tobe.firstChild) {
		tobe.removeChild(tobe.firstChild);
	}
	tobe.text = "No Recently Used WebApps";
	console.log("No Recently Used WebApps");
}
/**document.oncontextmenu = function(event){
	event.preventDefault();
	var a = document.getElementById("contextmenu");
	a.style.opacity="1";
	a.style.position="absolute";
	a.style.top=event.pageX+'px';
	a.style.left=event.pageX+'px';
};**/