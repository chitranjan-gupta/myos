function valu(val) {
	document.getElementById("display").value += val;
}
function clea(val) {
	document.getElementById("display").value = val;
}
function but() {
	try {
		clea(eval(document.getElementById("display").value))
	}
	catch (clea) {
		clea('Error')
	}
}
