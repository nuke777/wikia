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
			this.loadShip();
		}

		get ship(){
			return this.getAttribute('ship');
		}

		get comment(){
			return this.getAttribute('comment');
		}

		template(){
			return html`
			<div style="float:left;margin:10px 0px 0px 10px;" id="${this.parentID}">
					<div style="border-radius: 10px;border: 3px double #ffffff;background: #24252d;width: 100px;height: 176px;">
						<div style="width: 33px;height: 27px;float:left;text-align:center;color:white;padding-top:6px;font-size:13px;">
							<img src="${this.shipHull}" style="padding-left:3px">
						</div>
						<div style="width: 34px;height: 33px;float:left;text-align:center;">
							<img src="${this.shipNavy}">
						</div>
						<div style="width: 33px;height: 27px;float:left;text-align:center;color:white;padding-top:6px;font-size:13px;">${this.shipID}</div>
						<div style="${this.shipRarity};border-top: 2px solid #ffffff;border-bottom: 2px solid #ffffff;width:100px; height:104px; float:left;">
							<a href="ship#${this.ship}"><img src="${this.shipIcon}" style="height:100px;width: 100px"></a>
						</div>
						<div style="float:left; display:block; text-align: center;vertical-align: middle;line-height: 33px;width:100px; height:33px; color:white; font-size:10px;">
							<a href="ship#${this.ship}" style="color:white; font-size:10px;text-decoration:none">${this.shipName}</a>
						</div>
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
					self.shipIcon = "https://s3.us-east-2.amazonaws.com/alg-wiki.com/Ships/" + actual_JSON.file_id + "/Icon/icon.png";
					if (actual_JSON.hull == "Aircraft Carrier" || actual_JSON.hull == "Light Aircraft Carrier" ){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/cv.png";
					} else if (actual_JSON.hull == "Destroyer"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/dd.png";
					} else if (actual_JSON.hull == "Light Cruiser"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/cl.png";
					} else if (actual_JSON.hull == "Heavy Cruiser"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/ca.png";
					} else if (actual_JSON.hull == "Battleship" || actual_JSON.hull == "Battlecruiser" || actual_JSON.hull == "Monitor"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/bb.png";
					} else if (actual_JSON.hull == "Submarine"){						
						self.shipHull = "http://alg-wiki.com/Images/Hull/ss.png";
					} else if (actual_JSON.hull == "Repair Ship"){						
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
					if (actual_JSON.rarity == "Super Rare" || actual_JSON.rarity == "Priority"){
						self.shipRarity = "background-color:#beb988";
					} else if (actual_JSON.rarity == "Elite"){
						self.shipRarity = "background-color:#b080b0";
					} else if (actual_JSON.rarity == "Rare"){
						self.shipRarity = "background-color:#8cb3b8";
					}
					render(self.template(),self.root);
					self.addComment();
				});
		}

		addComment(){
			var comment = this.comment.split("|");
			console.log(document.getElementById(self.parentID));
			for (var i = 0; i < comment.length; ++i){
				var div = document.createElement('div')
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

			if (actual_JSON.rarity == "Common"){
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

customElements.define('commented-ship-display',CommentedShipDisplay);
customElements.define('icon-display',IconDisplay);