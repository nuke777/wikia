function addSideBar(){
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "components/sidebar.txt", false);
	rawFile.onreadystatechange = function () {
		var allText = rawFile.responseText;
		document.getElementById("sidebar").innerHTML = allText;		
	}
	rawFile.send(null);

}
