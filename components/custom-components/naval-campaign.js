function setActive(guid, a){
	var length = document.querySelector('#'+guid).shadowRoot.getElementById('ul'+guid).children.length;
	for (var i = 0; i < length; ++i){
		if (i == a)
			document.querySelector('#'+guid).shadowRoot.getElementById('li'+i+guid).className = "tabbed-pill active";
		else
			document.querySelector('#'+guid).shadowRoot.getElementById('li'+i+guid).className = "tabbed-pill";
	}
	length = document.querySelector('#'+guid).getElementsByTagName('chapter-element').length;
	for (var i = 0; i < length; ++i){
		if (i == a)
			document.querySelector('#'+guid).getElementsByTagName('chapter-element')[i].active = "true";
		else
			document.querySelector('#'+guid).getElementsByTagName('chapter-element')[i].active = "false";
	}
}