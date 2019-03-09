window.folder = "https://s3.us-east-2.amazonaws.com/alg-wiki.com/Ships/";
window.l2dfolder = "Live2D/";
window.sdfolder = "";
window.hull = "";
window.rarity = "";

function loadJSON(callback) {   
	var hash = window.location.hash;
	var hashTrimmed = hash.substr(1);
	var path = "Ships/" + hashTrimmed + ".json";
	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
	xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		  if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		  }
	};
	xobj.send(null);  
}

function loadList(callback) {
	var path = "json/shiplist.json";
	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
	xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		  if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		  }
	};
	xobj.send(null);  
}

function init() {
	 loadJSON(function(response) {
	  // Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		console.log(actual_JSON);
		window.folder = window.folder + actual_JSON.file_id;
		window.l2dfolder = window.l2dfolder + actual_JSON.file_id;
		viewer.init(window.folder + "/SD");
		document.title = actual_JSON.prefix + " " + actual_JSON.name + " - /alg/ Azur Lane General Wiki";
		document.getElementById("shipHeader").innerHTML = actual_JSON.prefix + " " + actual_JSON.name + " \(JP: " + actual_JSON.nameJP + ", CN: " + actual_JSON.nameCN + "\)";
		document.getElementById("shipID").innerHTML = actual_JSON.ID;
		document.getElementById("shipStarRating").innerHTML = actual_JSON.initialStar;			
		document.getElementById("shipRarity").innerHTML = actual_JSON.rarity;	
		window.rarity = actual_JSON.rarity;		
		document.getElementById("shipHull").innerHTML = actual_JSON.hull;	
		window.hull = actual_JSON.hull;					
		document.getElementById("shipNavy").innerHTML = actual_JSON.navy;					
		document.getElementById("shipBuildTime").innerHTML = actual_JSON.buildTime;					
		document.getElementById("shipAcquisition").innerHTML = actual_JSON.acquisitionMethod;	
		document.getElementById("shipEnhancementFirepower").innerHTML = actual_JSON.enhance.firepower;
		document.getElementById("shipEnhancementTorpedo").innerHTML = actual_JSON.enhance.torpedo;
		document.getElementById("shipEnhancementAviation").innerHTML = actual_JSON.enhance.aviation;
		document.getElementById("shipEnhancementReload").innerHTML = actual_JSON.enhance.reload;
		document.getElementById("shipScrapIncomeGold").innerHTML = actual_JSON.scrap.gold; 
		document.getElementById("shipScrapIncomeOil").innerHTML = actual_JSON.scrap.oil;
		document.getElementById("shipScrapIncomeMedal").innerHTML = actual_JSON.scrap.medal;
		document.getElementById("shipReleaseDateJP").innerHTML = "JP: " + actual_JSON.releaseDate.JP;
		document.getElementById("shipReleaseDateCN").innerHTML = "CN: " + actual_JSON.releaseDate.CN;
		document.getElementById("shipReleaseDateKR").innerHTML = "KR: " + actual_JSON.releaseDate.KR;
		document.getElementById("shipReleaseDateEN").innerHTML = "EN: " + actual_JSON.releaseDate.EN;
		document.getElementById("shipVoiceActress").innerHTML = actual_JSON.voiceActress;
		document.getElementById("shipIllustrator").innerHTML = actual_JSON.artist.name;
		document.getElementById("shipIllusWeibo").innerHTML = actual_JSON.artist.name;
		document.getElementById("shipIllusWeiboLink").href = actual_JSON.artist.weibo;
		document.getElementById("shipIllusTwitter").innerHTML = actual_JSON.artist.name;
		document.getElementById("shipIllusTwitterLink").href = actual_JSON.artist.twitter;
		document.getElementById("shipIllusPixiv").innerHTML = actual_JSON.artist.name;
		document.getElementById("shipIllusPixivLink").href = actual_JSON.artist.pixiv;
		document.getElementById("shipIllusOther").innerHTML = actual_JSON.artist.name;
		document.getElementById("shipIllusOtherLink").href = actual_JSON.artist.other;		
		document.getElementById("shipIcon").src = window.folder + "/Icon/icon.png";
		document.getElementById("shipParameterHP").innerHTML = actual_JSON.parameters.hp;
		document.getElementById("shipParameterAntiAir").innerHTML = actual_JSON.parameters.antiAir;
		document.getElementById("shipParameterEvasion").innerHTML = actual_JSON.parameters.evasion;
		document.getElementById("shipParameterAviation").innerHTML = actual_JSON.parameters.aviation;
		document.getElementById("shipParameterTorpedo").innerHTML = actual_JSON.parameters.torpedo;
		document.getElementById("shipParameterFirepower").innerHTML = actual_JSON.parameters.firepower;
		if (actual_JSON.rarity != "Priority"){
			document.getElementById("shipLimitBreakT1").innerHTML = actual_JSON.limitBreak.tier1;
			document.getElementById("shipLimitBreakT2").innerHTML = actual_JSON.limitBreak.tier2;
			document.getElementById("shipLimitBreakT3").innerHTML = actual_JSON.limitBreak.tier3;
		} else if (actual_JSON.rarity == "Priority"){
			setPriorityLimitBreaks(actual_JSON.strengthenLevel);
		}
		document.getElementById("shipEquipmentLoadoutType1").innerHTML = actual_JSON.equipmentLoadout["1"].type;
		document.getElementById("shipEquipmentLoadoutType2").innerHTML = actual_JSON.equipmentLoadout["2"].type;
		document.getElementById("shipEquipmentLoadoutType3").innerHTML = actual_JSON.equipmentLoadout["3"].type;
		document.getElementById("shipEquipmentLoadoutType4").innerHTML = actual_JSON.equipmentLoadout["4"].type;
		document.getElementById("shipEquipmentLoadoutType5").innerHTML = actual_JSON.equipmentLoadout["5"].type;
		document.getElementById("shipEquipmentLoadoutEfficiency1").innerHTML = actual_JSON.equipmentLoadout["1"].efficiency;
		document.getElementById("shipEquipmentLoadoutEfficiency2").innerHTML = actual_JSON.equipmentLoadout["2"].efficiency;
		document.getElementById("shipEquipmentLoadoutEfficiency3").innerHTML = actual_JSON.equipmentLoadout["3"].efficiency;
		document.getElementById("shipEquipmentLoadoutEfficiency4").innerHTML = actual_JSON.equipmentLoadout["4"].efficiency;
		document.getElementById("shipEquipmentLoadoutEfficiency5").innerHTML = actual_JSON.equipmentLoadout["5"].efficiency;
		document.getElementById("shipEquipmentLoadoutQuantity1").innerHTML = actual_JSON.equipmentLoadout["1"].amount;
		document.getElementById("shipEquipmentLoadoutQuantity2").innerHTML = actual_JSON.equipmentLoadout["2"].amount;
		document.getElementById("shipEquipmentLoadoutQuantity3").innerHTML = actual_JSON.equipmentLoadout["3"].amount;
		document.getElementById("shipEquipmentLoadoutQuantity4").innerHTML = actual_JSON.equipmentLoadout["4"].amount;
		document.getElementById("shipEquipmentLoadoutQuantity5").innerHTML = actual_JSON.equipmentLoadout["5"].amount;
		document.getElementById("shipEquipmentLoadoutPreload1").innerHTML = actual_JSON.equipmentLoadout["1"].preload;
		document.getElementById("shipEquipmentLoadoutPreload2").innerHTML = actual_JSON.equipmentLoadout["2"].preload;
		document.getElementById("shipEquipmentLoadoutPreload3").innerHTML = actual_JSON.equipmentLoadout["3"].preload;
		document.getElementById("shipEquipmentLoadoutPreload4").innerHTML = actual_JSON.equipmentLoadout["4"].preload;
		document.getElementById("shipEquipmentLoadoutPreload5").innerHTML = actual_JSON.equipmentLoadout["5"].preload;
		document.getElementById("shipLightBuildJP").innerHTML = actual_JSON.build.light.JP;
		document.getElementById("shipLightBuildCN").innerHTML = actual_JSON.build.light.CN;
		document.getElementById("shipLightBuildEN").innerHTML = actual_JSON.build.light.EN;
		document.getElementById("shipHeavyBuildJP").innerHTML = actual_JSON.build.heavy.JP;
		document.getElementById("shipHeavyBuildCN").innerHTML = actual_JSON.build.heavy.CN;
		document.getElementById("shipHeavyBuildEN").innerHTML = actual_JSON.build.heavy.EN;
		document.getElementById("shipSpecialBuildJP").innerHTML = actual_JSON.build.special.JP;
		document.getElementById("shipSpecialBuildCN").innerHTML = actual_JSON.build.special.CN;
		document.getElementById("shipSpecialBuildEN").innerHTML = actual_JSON.build.special.EN;
		document.getElementById("shipLimitedBuildJP").innerHTML = actual_JSON.build.limited.JP;
		document.getElementById("shipLimitedBuildCN").innerHTML = actual_JSON.build.limited.CN;
		document.getElementById("shipLimitedBuildEN").innerHTML = actual_JSON.build.limited.EN;		
		document.getElementById("shipConstructionBuildTime").innerHTML = actual_JSON.buildTime;	
		
		setShipHullIcon(actual_JSON.hull);
		setShipNavyIcon(actual_JSON.navy);
		setShipSkinNav(actual_JSON);
		setDefaultEquipment(actual_JSON);
		setSkillSet(actual_JSON);
		setShipDropEventSelection(actual_JSON);
		setDialogueSkinNav(actual_JSON);
		setRetrofit(actual_JSON);
		loadShipList();
		
		
		
		
		//need last
		setShipRarityHighlight(actual_JSON.rarity);
	 });
}

function setShipHullIcon(hull){
	if (hull == "Aircraft Carrier" || hull == "Light Aircraft Carrier") {
		document.getElementById("shipHullIcon").src = "Images/Hull/cv.png";
	} else if (hull == "Destroyer") {
		document.getElementById("shipHullIcon").src = "Images/Hull/dd.png";
	} else if (hull == "Light Cruiser") {
		document.getElementById("shipHullIcon").src = "Images/Hull/cl.png";
	} else if (hull == "Heavy Cruiser") {
		document.getElementById("shipHullIcon").src = "Images/Hull/ca.png";
	} else if (hull == "Battleship" || hull == "Battlecruiser" || hull == "Monitor") {
		document.getElementById("shipHullIcon").src = "Images/Hull/bb.png";
	} else if (hull == "Submarine") {
		document.getElementById("shipHullIcon").src = "Images/Hull/ss.png";
	} else if (hull == "Repair Ship") {
		document.getElementById("shipHullIcon").src = "Images/Hull/ar.png";
	}
}

function setShipNavyIcon(navy){
	if (navy == "Eagle Union") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/uss_icon.png";
	} else if (navy == "Sakura Empire") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/ijn_icon.png";
	} else if (navy == "Royal Navy") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/hms_icon.png";
	} else if (navy == "Ironblood") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/kms_icon.png";
	} else if (navy == "Dragon Empery" || navy == "Eastern Radiance" || navy == "Dragon Empire") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/roc_icon.png";
	} else if (navy == "Northern Parliament" || navy == "North Union") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/sn_icon.png";
	} else if (navy == "Vichya Dominion") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/mnf_icon.png";
	} else if (navy == "Iris Libre") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/ffnf_icon.png";
	} else if (navy == "Universal") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/univ_icon.png";
	} else if (navy == "Neptunia") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/hdn_icon.png";
	} else if (navy == "Utawarerumono") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/uwrr_icon.png";
	} else if (navy == "Bilibili") {
		document.getElementById("shipNavyIcon").src = "Images/Navy/bili_icon.png";
	}
}

function setShipRarityHighlight(rarity){
	if (rarity == "Super Rare" || rarity == "Priority") {
		document.getElementById("shipRarityColor").style = "background:#beb988;height:30px";
		document.getElementById("shipRarityColor2").style = "background:#beb988;height:30px";
		document.getElementById("shipRarityColor3").style = "background:#beb988;height:30px";
		document.getElementById("shipRarityColor4").style = "background:#beb988;height:30px";
		document.getElementById("shipRarityColor5").style = "background:#beb988;height:30px";
		document.getElementById("shipRarityColor6").style = "background:#beb988;height:30px";
		document.getElementById("shipRarityColor7").style = "background:#beb988;height:30px;width:40%;";
		document.getElementById("shipRarityColor8").style = "background:#beb988;height:30px;width:60%;";
		document.getElementById("shipRarityColor9").style = "background:#beb988;height:30px";
		document.getElementById("shipRarityColor10").style = "background:#beb988;height:30px";
	} else if (rarity == "Elite") {
		document.getElementById("shipRarityColor").style = "background:#b080b0;height:30px";
		document.getElementById("shipRarityColor2").style = "background:#b080b0;height:30px";
		document.getElementById("shipRarityColor3").style = "background:#b080b0;height:30px";
		document.getElementById("shipRarityColor4").style = "background:#b080b0;height:30px";
		document.getElementById("shipRarityColor5").style = "background:#b080b0;height:30px";
		document.getElementById("shipRarityColor6").style = "background:#b080b0;height:30px";
		document.getElementById("shipRarityColor7").style = "background:#b080b0;height:30px;width:40%;";
		document.getElementById("shipRarityColor8").style = "background:#b080b0;height:30px;width:60%;";
		document.getElementById("shipRarityColor9").style = "background:#b080b0;height:30px";
		document.getElementById("shipRarityColor10").style = "background:#b080b0;height:30px";
	} else if (rarity == "Rare") {
		document.getElementById("shipRarityColor").style = "background:#8cb3b8;height:30px";
		document.getElementById("shipRarityColor2").style = "background:#8cb3b8;height:30px";
		document.getElementById("shipRarityColor3").style = "background:#8cb3b8;height:30px";
		document.getElementById("shipRarityColor4").style = "background:#8cb3b8;height:30px";
		document.getElementById("shipRarityColor5").style = "background:#8cb3b8;height:30px";
		document.getElementById("shipRarityColor6").style = "background:#8cb3b8;height:30px";
		document.getElementById("shipRarityColor7").style = "background:#8cb3b8;height:30px;width:40%;";
		document.getElementById("shipRarityColor8").style = "background:#8cb3b8;height:30px;width:60%;";
		document.getElementById("shipRarityColor9").style = "background:#8cb3b8;height:30px";
		document.getElementById("shipRarityColor10").style = "background:#8cb3b8;height:30px";
	}
}	

function setShipSkinNav(data){
	var firstIteration = true;
	var initial = "";
	var id = "";
	for (var x in data.skin) {
		var container = document.createElement('div');
		var escaped = JSON.stringify(data.skin[x]).replace(/'/g, "\\'");
		escaped = escaped.replace(/"/g, "\\\"");
		container.className = 'btnContainer';			
		container.setAttribute('onclick','onSkinNavButtonClick(\'' + escaped + '\',\''+x+'\')');
		if (firstIteration){
			container.innerHTML = 
			'<img class="btnImage" id="' + "skin" + x + '" src="' + window.folder + "/Icon/skin" + x + ".png" + '"></img>\
			<div class="btnOverlay activeButton" id="ovr_' + "skin" + x + '"></div>';
			firstIteration = false;
			initial = JSON.stringify(data.skin[x]);
			id = x;
		} else {
			container.innerHTML = 
			'<img class="btnImage" id="' + "skin" + x + '" src="' + window.folder + "/Icon/skin" + x + ".png" + '"></img>\
			<div class="btnOverlay" id="ovr_' + "skin" + x + '"></div>';
		}
		
		document.getElementById('shipSkinNav').appendChild(container);
	}
	onSkinNavButtonClick(initial, id);
}

function onSkinNavButtonClick(raw_skin, skinID){
	var skin = JSON.parse(raw_skin);		
	var id = "ovr_"+ "skin" + skinID;
	var obj = document.getElementById('shipSkinNav').children;
	
	for (var i = 0; i < obj.length; ++i){
		var child = obj[i].children;
		for (var j = 0; j < child.length; ++j){
			var identifier = child[j].id.substring(0,4);
			if (child[j].id == id) {
				document.getElementById(id).className = 'btnOverlay activeButton';
				loadShipSkinElements(skin, skinID);
			} else if (child[j].id != id && identifier == "ovr_"){
				document.getElementById(child[j].id).className = 'btnOverlay';
			}
		}	
	}
}


function loadShipSkinElements(skin, skinID){
	document.getElementById("shipSkinDesc").innerHTML = skin.description;
	document.getElementById("shipSkinName").innerHTML = '<b>' +skin.name+ '</b>';
	document.getElementById("shipSkinDisplay").src = window.folder + "/Sprite/skin" + skinID + "_expr1.png";
	document.getElementById("shipSkinDisplay").style = "max-width:100%;height:auto;visibility: visible;";
	document.getElementById("l2dContainer").style = "visibility:hidden";
	document.getElementById("toggleL2d").className = "btnGenericText";
	
	try {
		viewer.removeSd();
    } catch (err){

    }
	if (ifFileExists(window.folder + "/SD/skin" + skinID + ".png")){
		viewer.loadSd("skin" + skinID);
	}

	if (skin.l2d != null){
		if (skin.l2d == "true"){
			document.getElementById("toggleL2dVisibility").style = "position: absolute;left:0;top:0;visibility: visible;z-index: 999;";
			document.getElementById("toggleL2d").setAttribute('onclick','toggleL2dButton(\''+skinID+'\')');
		}
	} else {
		document.getElementById("toggleL2dVisibility").style = "position: absolute;left:0;top:0;visibility: hidden;z-index: 999;";
	}
	
	
	clearAllChildren("shipSkinExpressions");
	setShipExpressionNav(skin, skinID);
}

function setShipExpressionNav(data, skinID){
	var firstIteration = true;
	var initial = "";
	var id = "";
	for (var x in data.expression) {
		var container = document.createElement('img');		
		container.id = "expr_" + x;
		container.setAttribute('onclick','onExpressionNavButtonClick(\'' + JSON.stringify(data.expression[x]) + '\',\''+x+'\',\''+skinID+'\')');
		if (firstIteration){
			container.src = window.folder + "/Icon/skin" + skinID + "_expr" + x + ".png";
			container.className = "btnExprActive";
			firstIteration = false;
			initial = JSON.stringify(data.expression[x]);
			id = x;
		} else {
			container.src = window.folder + "/Icon/skin" + skinID + "_expr" + x + ".png";
			container.className = "btnExpr";
		}
		
		document.getElementById('shipSkinExpressions').appendChild(container);
	}
	onExpressionNavButtonClick(initial, id, skinID);
}

function onExpressionNavButtonClick(raw_expr, exprID, skinID){
	var expr = JSON.parse(raw_expr);	
	var id = "expr_"+exprID;
	var obj = document.getElementById('shipSkinExpressions').children;
	
	for (var i = 0; i < obj.length; ++i){
		if (obj[i].id == id) {
			document.getElementById(id).className = 'btnExprActive';
			loadShipSkinExpressionElements(expr, exprID, skinID);
		} else if (obj[i].id != id){
			document.getElementById(obj[i].id).className = 'btnExpr';	
		}
	}
}

function loadShipSkinExpressionElements(expr, exprID, skinID){
	document.getElementById("shipSkinDisplay").src = window.folder + "/Sprite/skin" + skinID + "_expr" + exprID + ".png";
}

function toggleL2dButton(skinID){
	if (document.getElementById("toggleL2d").className == "btnGenericText"){
		document.getElementById("toggleL2d").className = "btnGenericTextActive";

		document.getElementById("shipSkinDisplay").style = "max-width:100%;height:auto;visibility: hidden;";


		document.getElementById("l2dContainer").style = "visibility:visible;";
		loadLive2D(skinID);


		return;
	} else if (document.getElementById("toggleL2d").className == "btnGenericTextActive"){
		document.getElementById("toggleL2d").className = "btnGenericText";
		
		document.getElementById("l2dContainer").style = "visibility:hidden;";

		document.getElementById("shipSkinDisplay").style = "max-width:100%;height:auto;visibility: visible;";
		return;
	}
}

function loadLive2D(skinID){
	var script = document.createElement('script');
	script.onload = function () {
	    //do stuff with the script

	};
	script.src = window.l2dfolder+'/skin'+skinID+'/live2d.js';

	document.head.appendChild(script);
}

function setActiveFromButtonGroup(idList, activeId, jsonID){
	document.getElementById(activeId).className = "btnGenericTextActive";
	for (var i = 0; i < idList.length; ++i){
		if (idList[i] != activeId){
			document.getElementById(idList[i]).className = "btnGenericText";
		}
	}
	loadActiveStats(jsonID);
}

function loadActiveStats(stats){
	loadJSON(function(response) {
		var actual_JSON = JSON.parse(response);
		document.getElementById("shipStatsHP").innerHTML = actual_JSON.stats[stats].hp;
		document.getElementById("shipStatsReload").innerHTML = actual_JSON.stats[stats].reload;
		document.getElementById("shipStatsFirepower").innerHTML = actual_JSON.stats[stats].firepower;
		document.getElementById("shipStatsTorpedo").innerHTML = actual_JSON.stats[stats].torpedo;
		document.getElementById("shipStatsEvasion").innerHTML = actual_JSON.stats[stats].evasion;
		document.getElementById("shipStatsAntiAir").innerHTML = actual_JSON.stats[stats].antiAir;
		document.getElementById("shipStatsAviation").innerHTML = actual_JSON.stats[stats].aviation;
		document.getElementById("shipStatsCost").innerHTML = actual_JSON.stats[stats].cost;
		document.getElementById("shipStatsASW").innerHTML = actual_JSON.stats[stats].asw;
		document.getElementById("shipStatsSpeed").innerHTML = actual_JSON.stats[stats].speed;
		document.getElementById("shipStatsArmor").innerHTML = actual_JSON.stats[stats].armor;
		if (actual_JSON.stats[stats].luck != null){
			document.getElementById("shipStatsLuck").innerHTML = actual_JSON.stats[stats].luck;
		}

	});
}

function setDefaultEquipment(data){
	var i = 1;
	var text = "";
	for (var x in data.defaultEquipment) {
		text = text + '\
		<tr style="text-align:center">\
			<td style="width:20%">'+i+'</td>\
			<td style="width:80%">'+data.defaultEquipment[x]+'</td>\
		</tr>';
		++i;			
	}
	document.getElementById("shipDefaultEquipment").innerHTML = text;
}

function setSkillSet(data){
	var text = '\
		<tr style="text-align:center">\
			<td colspan="3"  style="background:#000000;height:30px" id="shipRarityColor6">\
				<b>\
					<font style="vertical-align: inherit;">Skillset</font>\
				</b>\
			</td>\
		</tr>\
		<tr style="text-align:center">\
			<td style="background:#24252d;height:30px">\
				<b>\
					<font style="vertical-align: inherit;">Skill Name</font>\
				</b>\
			</td>\
			<td style="background:#24252d;height:30px">\
				<b>\
					<font style="vertical-align: inherit;">Description</font>\
				</b>\
			</td>\
			<td style="background:#24252d;height:30px">\
				<b>\
					<font style="vertical-align: inherit;white-space: nowrap;padding: 0px 10px 0px 10px;">Unlock Requirements</font>\
				</b>\
			</td>\
		</tr>';
	for (var x in data.skill) {
		text = text + '\
		<tr>\
			<td style="text-align:left;padding:10px;white-space: nowrap;">\
				<img src="'+window.folder+"/Icon/skill"+x+".png"+'">&emsp;'+data.skill[x].name+'\
			</td>\
			<td style="text-align:left;padding:10px">'+data.skill[x].description+'</td>\
			<td style="padding:10px;white-space: nowrap;">'+data.skill[x].requirement+'</td>\
		</tr>';		
	}
	document.getElementById("shipSkillSet").innerHTML = text;
}

function setShipDropEventSelection(data){
	if (data.drop.droppable == "true"){
		var text = "";
		for (var x in data.drop.list){
			text = text + '\
			<option>'+data.drop.list[x].event+'</option>';
		}
		document.getElementById("shipDropEventSelection").innerHTML = text;
		var e = document.getElementById("shipDropEventSelection");
		var strUser = e.options[e.selectedIndex].text;
		onSelectShipDropEventSelection(strUser);
	} else {
		document.getElementById("shipDropEventSelection").disabled = true;
		document.getElementById("shipDropEventSelectionTitle").innerHTML = "Ship does not drop on any map";
	}
}

function onSelectShipDropEventSelection(){
	var e = document.getElementById("shipDropEventSelection");
	var strUser = e.options[e.selectedIndex].text;
	document.getElementById("shipDropEventSelectionTitle").innerHTML = strUser;
	setShipDropTable(strUser);
}

function setShipDropTable(selected){
	loadJSON(function(response) {
	  // Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		
		for (var x in actual_JSON.drop.list){
			if (actual_JSON.drop.list[x].event == selected){
				var text = 
				'<tr style="text-align:center;background-color:#24252d;">\
					<td style="width:1px;padding: 0px 5px 0px 5px;">\
						<b>Node</b>\
					</td>';
				
				for (var y in actual_JSON.drop.list[x].chapter){
					text = text + '\
					<td style="min-width:55px">\
						<b>'+actual_JSON.drop.list[x].chapter[y].label+'</b>\
					</td>';
				}
				
				text = text + '\
				</tr>';
				
				var count = 0;
				
				for (var y in actual_JSON.drop.list[x].chapter["1"].node){
					++count;
				}
				
				var node = 1;	

				if (actual_JSON.drop.list[x].chapter["1"].node[''+count] == null){
					node = 0;
					--count;
				}
				
				while (node <= count){

					text = text + '\
				<tr style="text-align:center;">\
					<td style="width:1px;padding: 0px 5px 0px 5px;background-color:#24252d;">\
						<b>'+node+'</b>\
					</td>';
					for (var y in actual_JSON.drop.list[x].chapter){
						text = text + '\
					<td style="min-width:55px">'+actual_JSON.drop.list[x].chapter[y].node[''+node].drop+'</td>';
					}
					text = text + '\
				</tr>';
					++node;
				}
					
									
				document.getElementById("shipDropTable").innerHTML = text;
			}
		}
		
	});
}

function playAudio(btnId,audioId){
	var sounds = document.getElementsByTagName('audio');
	
	for (var i = 0; i < sounds.length; ++i){
		if (sounds[i].id != audioId){
			sounds[i].pause();
		}
	}

	var audio = document.getElementById(audioId);
	if (!audio.paused){
		audio.pause();	
	} else {
		document.getElementById(btnId).src = "Images/sound_on.png";
		audio.play();			
	}
	audio.onended = function() {
		document.getElementById(btnId).src = "Images/sound_off.png";
	};
	
	audio.onpause = function() {
	  
		document.getElementById(btnId).src = "Images/sound_off.png";
	};
}

function setDialogueSkinNav(data){
	var firstIteration = true;
	var initial = "";
	for (var x in data.skin) {
		var container = document.createElement('div');
		container.className = 'btnContainer';			
		container.setAttribute('onclick','onDialogueSkinNavButtonClick(\'' + x + '\')');
		if (firstIteration){
			container.innerHTML = 
			'<img class="btnImage" id="diaNav_' + "skin" + x + '" src="' + window.folder + "/Icon/skin" + x + ".png" + '"></img>\
			<div class="btnOverlay activeButton" id="ovrDia_' + "skin" + x + '"></div>';
			firstIteration = false;
			initial = x;
		} else {
			container.innerHTML = 
			'<img class="btnImage" id="' + "skin" + x + '" src="' + window.folder + "/Icon/skin" + x + ".png" + '"></img>\
			<div class="btnOverlay" id="ovrDia_' + "skin" + x + '"></div>';
		}
		
		document.getElementById('shipDialogueSkinNav').appendChild(container);
	}
	onDialogueSkinNavButtonClick(initial);
}

function onDialogueSkinNavButtonClick(skinId){
	var id = "ovrDia_"+ "skin" + skinId;
	var obj = document.getElementById('shipDialogueSkinNav').children;
	
	for (var i = 0; i < obj.length; ++i){
		var child = obj[i].children;
		for (var j = 0; j < child.length; ++j){
			var identifier = child[j].id.substring(0,7);
			if (child[j].id == id) {
				document.getElementById(id).className = 'btnOverlay activeButton';
				loadShipDialogueElements(skinId);
			} else if (child[j].id != id && identifier == "ovrDia_"){
				document.getElementById(child[j].id).className = 'btnOverlay';
			}
		}	
	}
}

function loadShipDialogueElements(skinId){
	loadJSON(function(response) {
		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		var text = '\
		<tr style="background-color:#24252d;text-align:center;">\
			<td style="width:14%">\
				<b>Event</b>\
			</td>\
			<td style="width:3%"></td>\
			<td style="width:27%;cursor:pointer;" onclick="toggleChinese(&quot;'+skinId+'&quot;,&quot;cn_header&quot;)" id="cn_header">\
				<b>Chinese</b>\
			</td>\
			<td style="width:27%;cursor:pointer;" onclick="toggleJapanese(&quot;'+skinId+'&quot;,&quot;jp_header&quot;)" id="jp_header">\
				<b>Japanese</b>\
			</td>\
			<td style="width:27%">\
				<b>English</b>\
			</td>\
		</tr>';
		for (var x in actual_JSON.lines.skin){
			if (x == skinId){
				for (var y in actual_JSON.lines.skin[x].dialogue){		
					text = text + '\
		<tr style="text-align:left">\
			<td id="event_'+skinId+'_'+y+'" style="padding: 0px 5px 0px 5px;">'+actual_JSON.lines.skin[x].dialogue[y].event+'</td>\
			<td style="text-align:center;">';
			
					if (actual_JSON.lines.skin[x].dialogue[y].media != ""){
						text = text + '\
				<img id="btn_'+skinId+'_'+y+'" onclick="playAudio(\'btn_'+skinId+'_'+y+'\',\'audio_'+skinId+'_'+y+'\')" class="btnAudio" src="Images/sound_off.png">\
				<audio id="audio_'+skinId+'_'+y+'">\
				  <source src="'+window.folder+"/Sound/skin"+skinId+"_"+actual_JSON.lines.skin[x].dialogue[y].media+".ogg"+'" type="audio/ogg">\
				</audio>';
				
					}
					
					var chineseTL = actual_JSON.lines.skin[x].dialogue[y].chineseTL.replace(/"/g, "\\&quot;");
					var japaneseTL = actual_JSON.lines.skin[x].dialogue[y].japaneseTL.replace(/"/g, "\\&quot;");
				
					text = text + '\
			</td>\
			<td id="cn_'+skinId+'_'+y+'" style="padding: 0px 5px 0px 5px;cursor:pointer;" onclick="switchTranslation(&quot;'+chineseTL+'&quot;,\'cn_'+skinId+'_'+y+'\')">'+actual_JSON.lines.skin[x].dialogue[y].chinese+'</td>\
			<td id="jp_'+skinId+'_'+y+'" style="padding: 0px 5px 0px 5px;cursor:pointer;" onclick="switchTranslation(&quot;'+japaneseTL+'&quot;,\'jp_'+skinId+'_'+y+'\')">'+actual_JSON.lines.skin[x].dialogue[y].japanese+'</td>\
			<td id="en_'+skinId+'_'+y+'" style="padding: 0px 5px 0px 5px;">'+actual_JSON.lines.skin[x].dialogue[y].english+'</td>\
		</tr>';
				}
			}
		}
		
		document.getElementById('shipDialogueTable').innerHTML = text;
		
	});
}

//<source src="'+actual_JSON.lines.skin[x].dialogue[y].media+'" type="audio/ogg">\
		
function switchTranslation(translation, id){
	var temp = document.getElementById(id).innerHTML;
	temp = temp.replace(/"/g, "\\\"");
	document.getElementById(id).innerHTML = translation;
	if (document.getElementById(id).id.substring(0,3) != "tl_"){
		document.getElementById(id).id = "tl_" + id;
		document.getElementById("tl_" + id).setAttribute('onclick','switchTranslation("'+temp+'",\'tl_'+id+'\')');
	} else if (document.getElementById(id).id.substring(0,3) == "tl_"){
		document.getElementById(id).id = id.substring(3);
		document.getElementById(id.substring(3)).setAttribute('onclick','switchTranslation("'+temp+'",\''+id.substring(3)+'\')');
	}
}

function toggleChinese(skinId, id){
	var count = 1;		
	var length = 0;
	while (document.getElementById('event_'+skinId+'_'+count+'') != null){
		++length;
		++count;
	}
	count = 1;
	if (id.substring(0,3) != "tl_"){
		while (count <= length){
			if (document.getElementById('cn_'+skinId+'_'+count+'') == null){
				++count;
				continue;
			}
			document.getElementById('cn_'+skinId+'_'+count+'').click();
			++count;
		}
		document.getElementById(id).id = "tl_" + id;
		document.getElementById("tl_" + id).setAttribute('onclick','toggleChinese("'+skinId+'","tl_'+id+'")');
	} else if (id.substring(0,3) == "tl_"){
		while (count <= length){
			if (document.getElementById('tl_cn_'+skinId+'_'+count+'') == null){
				++count;
				continue;
			}
			document.getElementById('tl_cn_'+skinId+'_'+count+'').click();
			++count;
		}
		document.getElementById(id).id = id.substring(3);
		document.getElementById(id.substring(3)).setAttribute('onclick','toggleChinese("'+skinId+'","'+id.substring(3)+'")');
	}
}

function toggleJapanese(skinId, id){
	var count = 1;		
	var length = 0;
	while (document.getElementById('event_'+skinId+'_'+count+'') != null){
		++length;
		++count;
	}
	count = 1;
	if (id.substring(0,3) != "tl_"){
		while (count <= length){
			if (document.getElementById('jp_'+skinId+'_'+count+'') == null){
				++count;
				continue;
			}
			document.getElementById('jp_'+skinId+'_'+count+'').click();
			++count;
		}
		document.getElementById(id).id = "tl_" + id;
		document.getElementById("tl_" + id).setAttribute('onclick','toggleJapanese("'+skinId+'","tl_'+id+'")');
	} else if (id.substring(0,3) == "tl_"){
		while (count <= length){
			if (document.getElementById('tl_jp_'+skinId+'_'+count+'') == null){
				++count;
				continue;
			}
			document.getElementById('tl_jp_'+skinId+'_'+count+'').click();
			++count;
		}
		document.getElementById(id).id = id.substring(3);
		document.getElementById(id.substring(3)).setAttribute('onclick','toggleJapanese("'+skinId+'","'+id.substring(3)+'")');
	}
}

function loadShipList(){
	loadList(function(response) {
		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		text = "";

		for (var x in actual_JSON){
			var hash = window.location.hash;
			var hashTrimmed = hash.substr(1);

			if (hashTrimmed == actual_JSON[x].link){
				text = text + '\
				<option value="'+actual_JSON[x].link+'" selected>'+actual_JSON[x].name+'</option>';
			} else {
				text = text + '\
				<option value="'+actual_JSON[x].link+'">'+actual_JSON[x].name+'</option>';
			}


			
		}

		document.getElementById("shipList").innerHTML = text;

	});
}

function onSelectShip(){
	var e = document.getElementById("shipList");
	var strUser = e.options[e.selectedIndex].value;
	window.location.href = "ship#" + strUser;
}	

function setPriorityLimitBreaks(data){
	document.getElementById("shipEquipmentTableBody").removeChild(document.getElementById("lbRow2"));
	document.getElementById("shipEquipmentTableBody").removeChild(document.getElementById("lbRow3"));
	document.getElementById("lbRow1").innerHTML = "";
	document.getElementById("lbRow1").style = "";
	var text = '\
	<td style="text-align:left;height:1px;" colspan="5">\
		<table class="wikitablewide" style="width:100%;height:100%;text-align:left;margin:0 0 0 0;table-layout:fixed">\
			<tr>\
				<td style="width:20%;padding-left:5px;">Level 5</td>\
				<td style="width:80%;padding-left:5px;">'+data.level5+'</td>\
			</tr>\
			<tr>\
				<td style="width:20%;padding-left:5px;">Level 10</td>\
				<td style="width:80%;padding-left:5px;">'+data.level10+'</td>\
			</tr>\
			<tr>\
				<td style="width:20%;padding-left:5px;">Level 15</td>\
				<td style="width:80%;padding-left:5px;">'+data.level15+'</td>\
			</tr>\
			<tr>\
				<td style="width:20%;padding-left:5px;">Level 20</td>\
				<td style="width:80%;padding-left:5px;">'+data.level20+'</td>\
			</tr>\
			<tr>\
				<td style="width:20%;padding-left:5px;">Level 25</td>\
				<td style="width:80%;padding-left:5px;">'+data.level25+'</td>\
			</tr>\
			<tr>\
				<td style="width:20%;padding-left:5px;">Level 30</td>\
				<td style="width:80%;padding-left:5px;">'+data.level30+'</td>\
			</tr>\
		</table>\
	</td>';
	console.log(text);
	document.getElementById("lbRow1").innerHTML = text;
	document.getElementById("lbTitle").innerHTML = "Strengthen Level";
}

function setRetrofit(data){
	if (data.retrofit == null){
		document.getElementById("content").removeChild(document.getElementById("shipRetrofitTable"));
		return;
	}

	for (var x in data.retrofit){
		var nodeType = data.retrofit[x].nodeSettings.split(",")[0].trim();
		var nodeCell = data.retrofit[x].nodeSettings.split(",")[1].trim();
		var nodeConn = data.retrofit[x].nodeSettings.split(",")[2].trim();

		if (nodeType == "line"){
			document.getElementById(nodeCell).style.background = "url('../Images/Retrofit/"+nodeConn+".png')";
			continue;
		}

		var statType = data.retrofit[x].stat.split(",")[0].trim();
		var statModifier = data.retrofit[x].stat.split(",")[1].trim();
		var statChange = data.retrofit[x].stat.split(",")[2].trim();
		var stage = data.retrofit[x].stage.trim();
		var desc = data.retrofit[x].desc.trim();
		var level = data.retrofit[x].level.trim();
		var star = data.retrofit[x].limitBreak.trim();
		var materials = data.retrofit[x].material.trim();

		if (nodeType == "retronode"){
			var img = setRetrofitStatIcon(statType, statModifier, stage);
			setNode(nodeCell, nodeConn, img, stage, nodeConn, desc, statChange, level, star, materials);
			console.log(img);
		}


	}

}

function setRetrofitStatIcon(statType, statModifier, stage){
	if (statType == "antiair"){
		if (statModifier == "base"){
			return "../Images/Retrofit/aa_"+stage+".png";
		} else if (statModifier == "efficiency"){
			return "../Images/Retrofit/aaup_"+stage+".png";
		}
	} else if (statType == "aviation"){
		return "../Images/Retrofit/air_"+stage+".png";
	} else if (statType == "asw"){
		return "../Images/Retrofit/as_"+stage+".png";
	} else if (statType == "divebomber"){
		return "../Images/Retrofit/bfup_"+stage+".png";
	} else if (statType == "firepower"){
		return "../Images/Retrofit/cn_"+stage+".png";
	} else if (statType == "evasion"){
		return "../Images/Retrofit/dd_"+stage+".png";
	} else if (statType == "fighter"){
		return "../Images/Retrofit/ffup_"+stage+".png";
	} else if (statType == "hit"){
		return "../Images/Retrofit/hit_"+stage+".png";
	} else if (statType == "hp"){
		return "../Images/Retrofit/hp_"+stage+".png";
	} else if (statType == "maingun"){
		return "../Images/Retrofit/mgup_"+stage+".png";
	} else if (statType == "modernization"){
		if (statModifier == "defensive"){
			return "../Images/Retrofit/mt_blue.png";
		} else if (statModifier == "offensive"){
			return "../Images/Retrofit/mt_red.png";
		} else if (statModifier == "support"){
			return "../Images/Retrofit/mt_yellow.png";
		}
	} else if (statType == "reload"){
		return "../Images/Retrofit/rl_"+stage+".png";
	} else if (statType == "auxgun"){
		return "../Images/Retrofit/sgup_"+stage+".png";
	} else if (statType == "skill"){
		if (statModifier == "defensive"){
			return "../Images/Retrofit/skill_blue.png";
		} else if (statModifier == "offensive"){
			return "../Images/Retrofit/skill_red.png";
		} else if (statModifier == "support"){
			return "../Images/Retrofit/skill_yellow.png";
		}
	} else if (statType == "speed"){
		return "../Images/Retrofit/sp_"+stage+".png";
	} else if (statType == "torpedobomber"){
		return "../Images/Retrofit/tfup_"+stage+".png";
	} else if (statType == "torpedo"){
		if (statModifier == "base"){
			return "../Images/Retrofit/tp_"+stage+".png";
		} else if (statModifier == "efficiency"){
			return "../Images/Retrofit/tpup_"+stage+".png";
		}
	}
}

function setNode(nodeCell, nodeConn, img, stage, nodeConn, desc, statChange, level, star, materials){
	var nodeIcon = document.createElement('div');
	nodeIcon.className = "retroNodeIcon";
	nodeIcon.style.background = "url('"+img+"')";
	nodeIcon.innerHTML = '<b><font class="retroNodeStage">'+stage+'/'+stage+'</font></b>';
	nodeIcon.setAttribute("onclick", 'setRetrofitDetails(\''+desc+'\',\''+statChange+'\',\''+level+'\',\''+star+'\',\''+materials+'\')');

	document.getElementById(nodeCell).appendChild(nodeIcon);
	document.getElementById(nodeCell).style.background = "url('../Images/Retrofit/"+nodeConn+".png')";
}

function setRetrofitDetails(desc, statChange, level, star, materials){
	document.getElementById("retroTitle").innerHTML = desc;
	document.getElementById("retroDesc").innerHTML = statChange;
	document.getElementById("retroLevel").innerHTML = level;
	document.getElementById("retroLimitBreak").innerHTML = star;
	setRetrofitMaterialDetails(materials);
}

function setRetrofitMaterialDetails(materials){
	clearAllChildren("retroMats");
	var mats = materials.split(",");
	for (var i = 0; i < mats.length; ++i){
		var item = mats[i].trim().split(" ")[0];
		var amount = mats[i].trim().split(" ")[1];
		var img = "";
		var bgimg = "";

		if (item.substring(0,2) == "bp"){
			if (window.hull == "Destroyer"){
				img = "../Images/Items/" + item + "_dd.png";
			} else if (window.hull == "Heavy Cruiser" || window.hull == "Light Cruiser"){
				img = "../Images/Items/" + item + "_ca.png";
			} else if (window.hull == "Battleship" || window.hull == "Battlecruiser"){
				img = "../Images/Items/" + item + "_bb.png";
			} else if (window.hull == "Aircraft Carrier" || window.hull == "Light Aircraft Carrier"){
				img = "../Images/Items/" + item + "_cv.png";
			}

			if (item.slice(-2) == "t1"){
				bgimg = "../Images/bg2.png";
			} else if (item.slice(-2) == "t2"){
				bgimg = "../Images/bg3.png";
			} else if (item.slice(-2) == "t3"){
				bgimg = "../Images/bg4.png";
			}
		} else if (item.substring(0,2) == "pl"){
			img = "../Images/Items/" + item + ".png";

			if (item.substring(2,4) == "t1"){
				bgimg = "../Images/bg1.png";
			} else if (item.substring(2,4) == "t2"){
				bgimg = "../Images/bg2.png";
			} else if (item.substring(2,4) == "t3"){
				bgimg = "../Images/bg3.png";
			}
		} else if (item == "duplicate"){
			img = window.folder + "/Icon/icon.png";

			if (window.rarity == "Common"){
				bgimg = "../Images/bg1.png";
			} else if (window.rarity == "Rare"){
				bgimg = "../Images/bg2.png";
			} else if (window.rarity == "Elite"){
				bgimg = "../Images/bg3.png";
			} else if (window.rarity == "Super Rare" || window.rarity == "Priority"){
				bgimg = "../Images/bg4.png";
			} else if (window.rarity == "Ultra Rare"){
				bgimg = "../Images/bg5.png";
			}

		} else if (item == "gold"){
			img = "../Images/gold.png";
			bgimg = "../Images/bg4.png";
		}

		var materialIcon = document.createElement('div');
		materialIcon.className = "retroMaterial";
		materialIcon.style.background = "url('"+img+"'), url('"+bgimg+"')";
		materialIcon.style.backgroundSize = "100% 100%";
		materialIcon.innerHTML = '<b><font class="retroMaterialCount">'+amount+'</font></b>';

		document.getElementById("retroMats").appendChild(materialIcon);
	}
}

function centerSD(){
	var containerWidth = document.getElementById("containerSD").getBoundingClientRect().width;
	var sdWidth = viewer.sdWidth();
	document.getElementById("sdAnim").style.left = Math.floor((containerWidth / 2) - (sdWidth / 2)) + "px";
	console.log(((sdWidth / 2)) + "px");
}

window.onhashchange = function() {
	window.location.reload();
}

window.onresize = function(){
	viewer.onResize();
	centerSD();
}

window.onload = function() {
  init();
  setActiveFromButtonGroup(["shipStatBase","shipStatMax","shipStatMaxKai"],"shipStatBase","base");
  addFooter();
  addSideBar();
  addHeader();
  document.getElementById("sbar_Ship").className = "active";
  
};