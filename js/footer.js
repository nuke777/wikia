function addFooter(){
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "components/footer.txt", false);
	rawFile.onreadystatechange = function () {
		var allText = rawFile.responseText;
		document.getElementById("footer").innerHTML = allText;		
	}
	rawFile.send(null);

}

