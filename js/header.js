function addHeader(){
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "components/header.txt", false);
	rawFile.onreadystatechange = function () {
		var allText = rawFile.responseText;
		document.getElementById("header").innerHTML = allText;		
	}
	rawFile.send(null);

}

function onButtonClick(){
	if (document.getElementById("sidebar").className != "active"){
		document.getElementById("sidebar").className = "active";
		document.getElementById("content").className = "active";
		document.getElementById("footer").className = "active";
		return;
	} else if (document.getElementById("sidebar").className == "active"){
		document.getElementById("sidebar").className = "";
		document.getElementById("content").className = "";
		document.getElementById("footer").className = "";
	}
}
