function ifFileExists(file){

    var http = new XMLHttpRequest();

    http.open('HEAD', file, false);
    http.send();
    return (http.status != 404 || http.status != 403);

}

function clearAllChildren(element){
	var myNode = document.getElementById(element);
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
}