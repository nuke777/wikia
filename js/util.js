var util = {
	ifFileExists: function(file){
		var http = new XMLHttpRequest();

	    http.open('HEAD', file, false);
	    http.send();
	    return (http.status != 404 && http.status != 403);
	},
	clearAllChildren: function(element){
		var myNode = document.getElementById(element);
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	},
	loadShipList: function(callback){
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', 'json/shiplist.json', true); // Replace 'my_data' with the path to your file
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				callback(xobj.responseText);
			  }
		};
		xobj.send(null); 
	},
	loadShipJSON: function(ship, callback){
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', 'Ships/'+ship+'.json', true); // Replace 'my_data' with the path to your file
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				callback(xobj.responseText, ship);
			  }
		};
		xobj.send(null); 
	},
	guidGenerator: function(){
		var S4 = function() {
       		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}	
}
