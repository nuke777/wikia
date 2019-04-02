import {html, render} from 'https://unpkg.com/lit-html?module';

class CommentedShipDisplay extends HTMLElement{
		constructor() {
			super();
			this.shipName = "";
			this.shipHull = "";
			this.shipNavy = "";
			this.shipID = "";
			this.shipIcon = "";
			this.shipRarity = "";
			this.parentID = "_" + util.guidGenerator();
			this.root = this.attachShadow({mode: "open"});
			render(this.template(),this.root);
			this.loadShip();
		}

		get ship(){
			return this.getAttribute('ship');
		}

		set ship(value){
			this.setAttribute('ship', value);			
			render(this.template(),this.root);
			this.loadShip();
		}

		get comment(){
			return this.getAttribute('comment');
		}

		set comment(value){
			return this.setAttribute('comment', value);
		}

		get skin(){
			return this.getAttribute('skin');
		}

		get skinLimited(){
			return this.getAttribute('skin-limited');
		}

		get skinEvent(){
			return this.getAttribute('skin-event');
		}

		get skinBg(){
			return this.getAttribute('skin-bg');
		}

		get skinL2d(){
			return this.getAttribute('skin-l2d');
		}

		get retrofit(){
			return this.getAttribute('retrofit');
		}

		get new(){
			return this.getAttribute('new');
		}

		get discount(){
			return this.getAttribute('discount');
		}

		template(){
			return html`
			<div style="float:left;margin:10px 0px 0px 10px;" id="${this.parentID}">
					<div style="border-radius: 10px;border: 3px double #ffffff;background: #24252d;width: 100px;height: 220px; position: relative">
						<div style="width: 33px;height: 27px;float:left;text-align:center;color:white;padding-top:6px;font-size:13px;">
							<img src="${this.shipHull}" style="padding-left:3px">
						</div>
						<div style="width: 34px;height: 33px;float:left;text-align:center;">
							<img src="${this.shipNavy}">
						</div>
						<div style="width: 33px;height: 27px;float:left;text-align:center;color:white;padding-top:6px;font-size:13px;">${this.shipID}</div>
						<div style="${this.shipRarity};border-top: 2px solid #ffffff;border-bottom: 2px solid #ffffff;width:100px; height:144px; float:left;">
							<a href="ship#${this.ship}"><img src="${this.shipIcon}" style="height:144px;width: 100px"></a>
						</div>
						<div style="float:left; display:block; text-align: center;vertical-align: middle;line-height: 33px;width:100px; height:33px; color:white; font-size:10px;">
							<a href="ship#${this.ship}" style="color:white; font-size:10px;text-decoration:none">${this.shipName}</a>
						</div>
						<div style="width: 60px; height: 19px; background: url('Images/skin_event.png'); position: absolute; top: 38px; right: 8px; display: none" id="event${this.parentID}"></div> 
						<div style="position: absolute; top: 38px; right: 8px; display: none; color: #8ed141; text-shadow: 0px 0px 4px #000000;" id="discount${this.parentID}"></div>
						<div style="width: 70px; height: 16px; background: url('Images/skin_limited.png'); position: absolute; top: 38px; right: 8px; display: none" id="limited${this.parentID}"></div>
						<div style="width: 30px; height: 26px; background: url('Images/skin_bg.png'); position: absolute; bottom: 43px; left: 5px; display: none" id="bg${this.parentID}"></div>
						<div style="width: 30px; height: 18px; background: url('Images/skin_l2d.png'); position: absolute; bottom: 47px; right: 8px; display: none" id="l2d${this.parentID}"></div>
						<div style="width: 73px; height: 66px; background: url('Images/new.png'); position: absolute; top: -25px; left: -30px; display: none" id="new${this.parentID}"></div>
					</div>
					
				</div>	
			`;
		}

		loadShip(){
			var self = this;
			util.loadShipJSON(this.ship, function(response, shipname){
					var actual_JSON = JSON.parse(response);
					self.shipName = actual_JSON.name;
					self.shipID = actual_JSON.ID;
					var rarity = "";
					var hull = "";

					if (self.retrofit == "true"){
						rarity = actual_JSON.retroParameter.split(",")[0].trim();
						hull = actual_JSON.retroParameter.split(",")[1].trim();
					} else {
						rarity = actual_JSON.rarity;
						hull = actual_JSON.hull;
					}

					if (self.skin != null){
						self.comment = actual_JSON.skin[self.skin+""].name;
						if (self.retrofit == "true")
							self.shipIcon = "https://s3.us-east-2.amazonaws.com/alg-wiki.com/Ships/" + actual_JSON.file_id + "/Icon/skin"+actual_JSON.retroParameter.split(",")[2].trim()+"_half.png";
						else
							self.shipIcon = "https://s3.us-east-2.amazonaws.com/alg-wiki.com/Ships/" + actual_JSON.file_id + "/Icon/skin"+self.skin+"_half.png";
					} else {
						if (self.retrofit == "true")
							self.shipIcon = "https://s3.us-east-2.amazonaws.com/alg-wiki.com/Ships/" + actual_JSON.file_id + "/Icon/skin"+actual_JSON.retroParameter.split(",")[2].trim()+"_half.png";
						else
							self.shipIcon = "https://s3.us-east-2.amazonaws.com/alg-wiki.com/Ships/" + actual_JSON.file_id + "/Icon/skin1_half.png";
					}
						
					if (hull == "Aircraft Carrier" || hull == "Light Aircraft Carrier" ){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/cv.png";
					} else if (hull == "Destroyer"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/dd.png";
					} else if (hull == "Light Cruiser"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/cl.png";
					} else if (hull == "Heavy Cruiser"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/ca.png";
					} else if (hull == "Battleship" || hull == "Battlecruiser" || hull == "Monitor"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/bb.png";
					} else if (hull == "Submarine"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/ss.png";
					} else if (hull == "Repair Ship"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/ar.png";
					}
					if (actual_JSON.navy == "Eagle Union") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/uss_icon.png";
					} else if (actual_JSON.navy == "Sakura Empire") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/ijn_icon.png";
					} else if (actual_JSON.navy == "Royal Navy") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/hms_icon.png";
					} else if (actual_JSON.navy == "Ironblood") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/kms_icon.png";
					} else if (actual_JSON.navy == "Dragon Empery" || actual_JSON.navy == "Dragon Empire" || actual_JSON.navy == "Eastern Radiance") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/roc_icon.png";
					} else if (actual_JSON.navy == "Northern Parliament" || actual_JSON.navy == "North Union") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/sn_icon.png";
					} else if (actual_JSON.navy == "Vichya Dominion") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/mnf_icon.png";
					} else if (actual_JSON.navy == "Iris Libre") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/ffnf_icon.png";
					} else if (actual_JSON.navy == "Universal") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/univ_icon.png";
					} else if (actual_JSON.navy == "Neptunia") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/hnd_icon.png";
					} else if (actual_JSON.navy == "Utawarerumono") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/uwrr_icon.png";
					} else if (actual_JSON.navy == "Bilibili") {
						self.shipNavy = "http://alg-wiki.com/Images/Navy/bili_icon.png";
					}
					if (rarity == "Super Rare" || rarity == "Priority"){
						self.shipRarity = "background-color:#beb988";
					} else if (rarity == "Elite"){
						self.shipRarity = "background-color:#b080b0";
					} else if (rarity == "Rare"){
						self.shipRarity = "background-color:#8cb3b8";
					} else if (rarity == "Common" || rarity == "Normal"){
						self.shipRarity = "background-color:#737373";
					}
					if (self.skinLimited == "true"){
						self.root.getElementById("limited"+self.parentID).style.display = "block";
					}
					if (self.skinEvent == "true"){
						self.root.getElementById("event"+self.parentID).style.display = "block";
					}
					if (self.skinBg == "true"){
						self.root.getElementById("bg"+self.parentID).style.display = "block";
					}
					if (self.skinL2d == "true"){
						self.root.getElementById("l2d"+self.parentID).style.display = "block";
					}
					if (self.new == "true"){
						self.root.getElementById("new"+self.parentID).style.display = "block";
					}
					if (self.discount != null){
						self.root.getElementById("discount"+self.parentID).style.display = "block";
						self.root.getElementById("discount"+self.parentID).innerHTML = "<b>"+self.discount+"</b>";
					}



					render(self.template(),self.root);
					self.addComment();
				});
		}

		addComment(){
			var comment = this.comment.split("|");
			console.log(document.getElementById(self.parentID));
			for (var i = 0; i < comment.length; ++i){
				var div = document.createElement('div');
				div.style = "width: 100px;height: auto;padding-top: 10px;text-align: center;white-space:pre-wrap;color:white"
				div.innerHTML = comment[i].trim();
				this.root.getElementById(this.parentID).appendChild(div);
			}
		}
}

class IconDisplay extends HTMLElement{
	constructor() {
		super();
		this.icon = "";
		this.bgimg = "";
		this.root = this.attachShadow({mode: "open"});
		this.init();
	}

	get description(){
		return this.getAttribute('description');
	}

	set description(value){
		this.setAttribute('description', value);
		render(this.template(),this.root);
	}

	get item(){
		return this.getAttribute('item');
	}

	set item(value){
		this.setAttribute('item', value);
		this.init();
	}

	get ship(){
		return this.getAttribute('ship');
	}

	set ship(value){
		this.setAttribute('ship', value);
		this.init();
	}

	connectedCallback(){

	}

	template(){
		return html`
		<style>
			.icon {
			position: relative;
			height: 64px;
			width: 64px;
			border-style:solid;  
			border-color:white;
			border-radius: 5px;
			border-width:2px;
			margin: 10px 0px 0px 10px;
			float: left;
			}

			.text {
			position: absolute;
			right: 6px;
			top: 38px;
			font-size: 14px;
			text-align: right;
			text-shadow: 0px 0px 5px black;
			color: white;
			}
		</style>
		<div class="icon" style="background:url('${this.icon}'), url('${this.bgimg}'); background-size:100% 100%;">
			<b><font class="text">${this.description}</font></b>
		</div>
		`;
	}

	init() {
		if (this.ship != null && this.item != null){
			this.loadShip();
		} else if (this.ship != null){
			this.loadShip();
		} else if (this.item != null){
			this.loadItem();
		}
	}

	loadItem(){
		if (this.item.substring(0,2) == "bp"){
			this.icon = "../Images/Items/" + this.item + ".png";

			if (this.item.substring(2,4) == "t1"){
				this.bgimg = "../Images/bg2.png";
			} else if (this.item.substring(2,4) == "t2"){
				this.bgimg = "../Images/bg3.png";
			} else if (this.item.substring(2,4) == "t3"){
				this.bgimg = "../Images/bg4.png";
			}
		} else if (this.item.substring(0,2) == "pl"){
			this.icon = "../Images/Items/" + this.item + ".png";

			if (this.item.substring(2,4) == "t1"){
				this.bgimg = "../Images/bg1.png";
			} else if (this.item.substring(2,4) == "t2"){
				this.bgimg = "../Images/bg2.png";
			} else if (this.item.substring(2,4) == "t3"){
				this.bgimg = "../Images/bg3.png";
			}
		} else if (this.item == "gold"){
			this.icon = "../Images/gold.png";
			this.bgimg = "../Images/bg4.png";
		}
		render(this.template(),this.root);
	}

	loadShip(){
		var self = this;
		util.loadShipJSON(this.ship, function(response, shipname){
			var actual_JSON = JSON.parse(response);
			self.icon = "https://s3.us-east-2.amazonaws.com/alg-wiki.com/Ships/" + actual_JSON.file_id + "/Icon/icon.png";

			if (actual_JSON.rarity == "Common" || actual_JSON.rarity == "Normal"){
				self.bgimg = "../Images/bg1.png";
			} else if (actual_JSON.rarity == "Rare"){
				self.bgimg = "../Images/bg2.png";
			} else if (actual_JSON.rarity == "Elite"){
				self.bgimg = "../Images/bg3.png";
			} else if (actual_JSON.rarity == "Super Rare" || actual_JSON.rarity == "Priority"){
				self.bgimg = "../Images/bg4.png";
			} else if (actual_JSON.rarity == "Ultra Rare"){
				self.bgimg = "../Images/bg5.png";
			}
			render(self.template(),self.root);
		});		
	}

}

class NavalCampaign extends HTMLElement{
	constructor() {
		super();
		this.parentID = "_" + util.guidGenerator();
		this.setAttribute('id', this.parentID);
		this.root = this.attachShadow({mode: "open"});
		this.init();
	}

	get chapter(){
		return this.getAttribute('chapter');
	}

	set chapter(value){
		this.setAttribute('chapter', value);
		render(this.template(),this.root);
	}

	template(){
		return html`
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
			<style>
				.tabbed-pill{
			    white-space: nowrap;
			    height: 30px;
			    background-color:#24252d;  
			    border-style:solid;  
			    border-color:#5c5d70;
			    border-width:1px;
			    cursor: pointer;  
			    padding: 2px 7px 0px 7px;
			    font-size: 14px;
			    color:white;
			    margin-right: 5px;
			    margin-bottom: 5px;
			}
			.tabbed-pill:hover {
			    box-shadow: 0px 0px 10px white;
			}
			.tabbed-pill:active {
			    box-shadow: 1px 1px 4px white, -1px 1px 4px white, 1px -1px 4px white, -1px -1px 4px white;
			}
			.tabbed-pill.active {
			    background-color:white; 
			    border-style:solid;   
			    border-color:gray;
			    border-width:1px;
			    color:#24252d;
			    box-shadow: 1px 1px 4px white, -1px 1px 4px white, 1px -1px 4px white, -1px -1px 4px white;
			}			
			</style>
			<ul class="nav nav-tabs" id="ul${this.parentID}">

            </ul>

            <div id="content${this.parentID}">
            	<slot></slot>
            </div>
		`;
	}

	init(){
		render(this.template(),this.root);
		var chapter = this.chapter.split(";");
		for (var i = 0; i < chapter.length; ++i){
			var li = document.createElement('li');
			if (i == 0)
				li.className = "tabbed-pill active";
			else
				li.className = "tabbed-pill";
			li.setAttribute('onclick','setActive(\''+this.parentID+'\',\''+i+'\')');
			li.id = "li"+i+this.parentID;
			li.innerHTML = chapter[i].trim();
			this.root.getElementById("ul"+this.parentID).appendChild(li);			
		}
		var script = document.createElement('script');
		script.src = "/components/custom-components/naval-campaign.js";
		this.root.appendChild(script);
	}

}

class ChapterElement extends HTMLElement{
	constructor(){
		super();
		this.parentID = "_" + util.guidGenerator();
		this.setAttribute('id', this.parentID);
		this.root = this.attachShadow({mode: "open"});
		render(this.template(),this.root);
		this.init();
	}

	get active(){
		return this.getAttribute('active');
	}

	set active(value){
		this.setAttribute('active', value);
		this.init();
	}

	template(){
		return html`
		<div id="content${this.parentID}">
            <slot></slot>
        </div>
		`;
	}

	init(){
		if (this.active == "true"){
			this.root.getElementById("content"+this.parentID).style = "display: block;";
		} else if (this.active == "false" || this.active == null){
			this.root.getElementById("content"+this.parentID).style = "display: none;";
		}				
	}
}

class ChapterNode extends HTMLElement{
	constructor(){
		super();
		this.parentID = "_" + util.guidGenerator();
		this.setAttribute('id', this.parentID);
		this.star = ["","",""];
		this.experience = ["","",""];
		this.bossShip = ["",""];
		this.root = this.attachShadow({mode: "open"});
		render(this.template(),this.root);
		this.init();
	}

	get title(){
		return this.getAttribute('title');
	}

	get description(){
		return this.getAttribute('description');
	}

	get requirement(){
		return this.getAttribute('requirement');
	}

	get starRequirement(){
		return this.getAttribute('star-requirement');
	}

	get cost(){
		return this.getAttribute('cost');
	}

	get enemyLevel(){
		return this.getAttribute('enemy-level');
	}

	get exp(){
		return this.getAttribute('exp');
	}

	get clears(){
		return this.getAttribute('clears');
	}

	get boss(){
		return this.getAttribute('boss');
	}

	get bossLocation(){
		return this.getAttribute('boss-location');
	}

	get bossLevel(){
		return this.getAttribute('boss-level');
	}

	get bossExp(){
		return this.getAttribute('boss-exp');
	}

	get bossBattlesRequired(){
		return this.getAttribute('boss-battles-required');
	}

	get map(){
		return this.getAttribute('map');
	}

	get note(){
		return this.getAttribute('note');
	}


	template(){
		return html`
		<style>
			table.wikitablewide {
			    margin: 1em 0;
			    background-color: #373743;
			    border-style: solid;
			    border-width: 1px;
			    border-color: #5c5d70;
			    border-collapse: collapse;
			    color: #ffffff;
			}
			table.wikitablewide td {
			    border-style: solid;
			    border-width: 1px;
			    border-color: #5c5d70;
			}
		</style>
		<table class="wikitablewide" style="width:100%;height:100%;text-align:left;margin:0 0 0 0;">
            <tr>
                <td colspan="2" style="background: #24252d;height:30px;padding-left: 10px;">
                    <b>
                        <font style="vertical-align: inherit;">${this.title}</font>
                    </b>
                </td>
            </tr>
            <tr>
                <td style="text-align:left;height:1px;">
                    <table class="wikitablewide" style="width:100%;height:100%;text-align:left;margin:0 0 0 0;">
                        <tr>
                            <td colspan="7" style="padding: 10px;">${this.description}</td>
                        </tr>
                        <tr style="width: 100%">
                            <td style="width: 16%; padding: 10px; background: #24252d;"><b>Requirement</b></td>
                            <td style="width: 16%; padding: 10px;">${this.requirement}</td>
                            <td style="width: 16%; padding: 10px;">★☆☆ ${this.star[0]}</td>
                            <td style="width: 16%; padding: 10px;">★★☆ ${this.star[1]}</td>
                            <td style="width: 16%; padding: 10px;">★★★ ${this.star[2]}</td>
                            <td style="width: 10%; padding: 10px; background: #24252d;"><b>Cost</b></td>
                            <td style="width: 10%; padding: 10px;">${this.cost}</td>
                        </tr>
                        <tr>
                            <td style="width: 16%; padding: 10px; background: #24252d;"><b>Enemy Level</b></td>
                            <td style="width: 16%; padding: 10px;">Lv. ${this.enemyLevel}</td>
                            <td style="width: 16%; padding: 10px; background: #24252d;"><b>EXP Gain</b></td>
                            <td colspan="2" style="width: 32%; padding: 10px;"><img src="Images/enemy_s.png">&emsp;${this.experience[0]}&emsp;<img src="Images/enemy_m.png">&emsp;${this.experience[1]}&emsp;<img src="Images/enemy_l.png">&emsp;${this.experience[2]}</td>
                            <td style="width: 10%; padding: 10px; background: #24252d;"><b>Clears</b></td>
                            <td style="width: 10%; padding: 10px;">${this.clears}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="text-align:left;height:1px;">
                    <table class="wikitablewide" style="width:100%;height:100%;text-align:left;margin:0 0 0 0;">
                        <tr>
                            <td colspan="5" style="background: #24252d;height:30px;padding-left: 10px;text-align: center;">
                                <b>
                                    <font style="vertical-align: inherit;">Boss</font>
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="width: 20%; padding: 10px; text-align: center;"><a href ="ship#${this.bossShip[0]}" style="text-decoration:none;color:white"><img src="https://s3.us-east-2.amazonaws.com/alg-wiki.com/qicon/${this.bossShip[0]}.png" style="width: 64px; height: 64px"><br>${this.bossShip[1]}</a></td>
                            <td style="width: 20%; padding: 10px; background: #24252d;"><b>Location</b></td>
                            <td style="width: 20%; padding: 10px;">${this.bossLocation}</td>
                            <td style="width: 20%; padding: 10px; background: #24252d;"><b>Level</b></td>
                            <td style="width: 20%; padding: 10px;">Lv. ${this.bossLevel}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%; padding: 10px; background: #24252d;"><b>EXP Gain</b></td>
                            <td style="width: 20%; padding: 10px;">${this.bossExp}</td>
                            <td style="width: 20%; padding: 10px; background: #24252d;"><b>Battles Required</b></td>
                            <td style="width: 20%; padding: 10px;">${this.bossBattlesRequired}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="text-align:left;height:1px;">
                    <table class="wikitablewide" style="width:100%;height:100%;text-align:left;margin:0 0 0 0;">
                        <tr>
                            <td colspan="2" style="background: #24252d;height:30px;padding-left: 10px;text-align: center;">
                                <b>
                                    <font style="vertical-align: inherit;">Map</font>
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 50%"><img src="${this.map}" style="height: auto;width: 100%"></td>
                            <td style="width: 50%"><slot></slot></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="text-align:left;height:1px;">
                    <table class="wikitablewide" style="width:100%;height:100%;text-align:left;margin:0 0 0 0;">
                        <tr>
                            <td colspan="2" style="background: #24252d;height:30px;padding-left: 10px;text-align: center;">
                                <b>
                                    <font style="vertical-align: inherit;">Reward</font>
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%; padding: 10px;">Clear Reward</td>
                            <td style="width: 80%; padding: 10px;"><slot name="clear"></slot></td>
                        </tr>
                        <tr>
                            <td style="width: 20%; padding: 10px;">★★★ Reward</td>
                            <td style="width: 80%; padding: 10px;"><slot name="three-star"></slot></td>
                        </tr>
                        <tr>
                            <td style="width: 20%; padding: 10px;">Item Drop</td>
                            <td style="width: 80%; padding: 10px;"><slot name="item"></slot></td>
                        </tr>
                        <tr>
                            <td style="width: 20%; padding: 10px;">Ship Drop</td>
                            <td style="width: 80%; padding: 10px;"><slot name="ship"></slot></td>
                        </tr>
                        <tr>
                            <td style="width: 20%; padding: 10px;">Notes</td>
                            <td style="width: 80%; padding: 10px;">${this.note}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
		`;
	}

	init(){
		if (this.starRequirement != null){
			for (var i = 0; i < this.star.length; ++i)
				this.star[i] = this.starRequirement.split(";")[i].trim();
		}
		if (this.exp != null){
			for (var i = 0; i < this.experience.length; ++i)
				this.experience[i] = this.exp.split(";")[i].trim();
		}
		if (this.boss != null){
			for (var i = 0; i < this.bossShip.length; ++i)
				this.bossShip[i] = this.boss.split(";")[i].trim();
		}
		render(this.template(),this.root);
	}
}

class NodeMap extends HTMLElement{
	constructor(){
		super();
		this.parentID = "_" + util.guidGenerator();
		this.setAttribute('id', this.parentID);
		this.root = this.attachShadow({mode: "open"});
		render(this.template(),this.root);
		this.init();
	}

	get size(){
		return this.getAttribute('size');
	}

	get spawn(){
		return this.getAttribute('spawn');
	}

	get terrain(){
		return this.getAttribute('terrain');
	}

	get fleet(){
		return this.getAttribute('fleet');
	}

	get boss(){
		return this.getAttribute('boss');
	}

	get ammo(){
		return this.getAttribute('ammo');
	}

	get bonus(){
		return this.getAttribute('bonus');
	}

	get humanoid(){
		return this.getAttribute('humanoid');
	}

	get memory(){
		return this.getAttribute('memory');
	}

	get artillery(){
		return this.getAttribute('artillery');
	}

	template(){
		return html`
		<style>
			table.wikitablewide {
			    margin: 1em 0;
			    background-color: #373743;
			    border-style: solid;
			    border-width: 1px;
			    border-color: #5c5d70;
			    border-collapse: collapse;
			    color: #ffffff;
			}
			table.wikitablewide td {
			    border-style: solid;
			    border-width: 1px;
			    border-color: #5c5d70;
			}
		</style>
		<table class="wikitablewide" style="text-align:left;margin:0 0 0 0;" id="content${this.parentID}">

        </table>
		`;
	}

	init(){
		if (this.size != null){
			this.generateTable(this.size.split("x")[0].trim(), this.size.split("x")[1].trim());
			if (this.spawn != null){
				this.setNode(this.spawn.split(" "), "Spawn");
			}
			if (this.boss != null){
				this.setNode(this.boss.split(" "), "Boss");
			}
			if (this.fleet != null){
				this.setNode(this.fleet.split(" "), "Fleet");
			}
			if (this.humanoid != null){
				this.setNode(this.humanoid.split(" "), "Humanoid");
			}
			if (this.ammo != null){
				this.setNode(this.ammo.split(" "), "Ammo");
			}
			if (this.bonus != null){
				this.setNode(this.bonus.split(" "), "Bonus");
			}
			if (this.memory != null){
				this.setNode(this.memory.split(" "), "Memory");
			}
			if (this.artillery != null){
				this.setArtillery(this.artillery.split(";"), "Artillery");
			}
			if (this.terrain != null){
				this.setTerrain(this.terrain.split(" "), "Terrain");
			}
		}
	}

	generateTable(width, height){
		var str = "_abcdefghijklmnopqrstuvwxyz";
		var html = "";
		for (var i = 0; i <= height;++i){
			html += '<tr>';
			for (var j = 0; j <= width; ++j){
				
				if (i == 0 || j == 0){
					html += '<td id="'+str.charAt(j)+i+this.parentID+'" style="height: 48px; width: 48px; text-align: center; background: #24252d;">';
					if (i == 0 && j != 0)
						html += str.charAt(j).toUpperCase();
					else if (j == 0 && i != 0)
						html += i;
					html += '</td>';
				} else {
					html += '<td id="'+str.charAt(j)+i+this.parentID+'" style="height: 48px; width: 48px; text-align: center; background: #243659"></td>';
				}
			}
			html += '</tr>';
		}
		this.root.getElementById("content"+this.parentID).innerHTML = html;
		render(this.template(),this.root);
	}

	setNode(node, type){
		for (var i = 0; i < node.length; ++i){
			this.root.getElementById(node[i].trim()+this.parentID).style.background = "url('Images/"+type+".png'), #243659";
			this.root.getElementById(node[i].trim()+this.parentID).style.backgroundSize = "80% 80%";
			this.root.getElementById(node[i].trim()+this.parentID).style.backgroundRepeat = "no-repeat";
			this.root.getElementById(node[i].trim()+this.parentID).style.backgroundPosition = "center";
			this.root.getElementById(node[i].trim()+this.parentID).title = type;
		}
	}

	setTerrain(node, type){
		for (var i = 0; i < node.length; ++i){
			this.root.getElementById(node[i].trim()+this.parentID).style.backgroundColor = "#313707"
			this.root.getElementById(node[i].trim()+this.parentID).title = type;
		}
	}

	setArtillery(artillery, tip){
		var str = "_abcdefghijklmnopqrstuvwxyz";
		for (var i = 0; i < artillery.length; ++i){
			var node = artillery[i].split(",");
			if (node[1].trim() == "west"){
				var icon = node[0].trim().split(" ");
				for (var j = 0; j < icon.length; ++j){
					this.root.getElementById(icon[j].trim()+this.parentID).style.background = "url('Images/"+tip+"_West.png'), #243659";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundSize = "80% 80%";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundRepeat = "no-repeat";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundPosition = "center";
					this.root.getElementById(icon[j].trim()+this.parentID).title = tip;
					var index = -1;
					var limit = parseInt(node[2].trim());
					for (var a = 0; a < 27; ++a){
						++index;
						if (str.charAt(a) == icon[j].trim().charAt(0)){
							break;
						}
					}
					while (limit != 0){
						--index;
						this.root.getElementById(str.charAt(index)+icon[j].trim().charAt(1)+this.parentID).style.backgroundColor = "rgba(135,32,28,0.3)";
						--limit;
					}

				}
			} else if (node[1].trim() == "east"){
				var icon = node[0].trim().split(" ");
				for (var j = 0; j < icon.length; ++j){
					this.root.getElementById(icon[j].trim()+this.parentID).style.background = "url('Images/"+tip+"_East.png'), #243659";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundSize = "80% 80%";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundRepeat = "no-repeat";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundPosition = "center";
					this.root.getElementById(icon[j].trim()+this.parentID).title = tip;
					var index = -1;
					var limit = parseInt(node[2].trim());
					for (var a = 0; a < 27; ++a){
						++index;
						if (str.charAt(a) == icon[j].trim().charAt(0)){
							break;
						}
					}
					while (limit != 0){
						++index;
						this.root.getElementById(str.charAt(index)+icon[j].trim().charAt(1)+this.parentID).style.backgroundColor = "rgba(135,32,28,0.3)";
						--limit;
					}
				}
			} else if (node[1].trim() == "north"){
				var icon = node[0].trim().split(" ");
				for (var j = 0; j < icon.length; ++j){
					this.root.getElementById(icon[j].trim()+this.parentID).style.background = "url('Images/"+tip+"_North.png'), #243659";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundSize = "80% 80%";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundRepeat = "no-repeat";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundPosition = "center";
					this.root.getElementById(icon[j].trim()+this.parentID).title = tip;
					var index = icon[j].trim().charAt(1);
					var limit = parseInt(node[2].trim());
					while (limit != 0){
						--index;
						this.root.getElementById(icon[j].trim().charAt(0)+index+this.parentID).style.backgroundColor = "rgba(135,32,28,0.3)";
						--limit;
					}
				}
			} else if (node[1].trim() == "south"){
				var icon = node[0].trim().split(" ");
				for (var j = 0; j < icon.length; ++j){
					this.root.getElementById(icon[j].trim()+this.parentID).style.background = "url('Images/"+tip+"_South.png'), #243659";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundSize = "80% 80%";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundRepeat = "no-repeat";
					this.root.getElementById(icon[j].trim()+this.parentID).style.backgroundPosition = "center";
					this.root.getElementById(icon[j].trim()+this.parentID).title = tip;
					var index = icon[j].trim().charAt(1);
					var limit = parseInt(node[2].trim());
					while (limit != 0){
						++index;
						this.root.getElementById(icon[j].trim().charAt(0)+index+this.parentID).style.backgroundColor = "rgba(135,32,28,0.3)";
						--limit;
					}
				}
			}

		}
	}
}

customElements.define('commented-ship-display',CommentedShipDisplay);
customElements.define('icon-display',IconDisplay);
customElements.define('naval-campaign',NavalCampaign);
customElements.define('chapter-element',ChapterElement);
customElements.define('chapter-node',ChapterNode);
customElements.define('node-map',NodeMap);

