# ALG wiki

Azur Lane © is owned by Shanghai Manjuu, Xiamen Yongshi, Shanghai Yostar | All logos and trademarks are property of their respective owners.
Special thanks to /alg/, English Koumakan Wiki, Chinese Wikis, Japanese Wikis, and to all our contributors. /alg/ wiki © 2019. This is a non-profit website.

# Contribute

## Ship JSON files

If you want to help contribute in building ship pages, use this json template https://github.com/alg-wiki/wikia/blob/master/Ships/aurora.json and use a json online editor like this https://jsoneditoronline.org/. Just replace the values with the ff:

Some are self explanatory so I did not include them here


```json
"file_id": ""
```
Should have a value with this format <3 digit id>_<shipname with starting capital letter>
  
  
```json
"1":{},
"2":{},
```
This usually applies to items where you can have more than one of it like skins, expressions, skills, lines. If you want to add one, just increment the number from the last one while keeping format. eg. "3":{},


```json
"stats":{}
```
If the bote does not have a retrofit, do not remove the "100retrofit" and "120retrofit" part, just leave the values blank. eg. ""


```json
"equipmentLoadout": {
    "1": {
      "type": "CL Main Gun",
      "efficiency": "125%/127%/130%/135%",
      "amount": "1/1/1/1",
      "preload": "0/0/0/0"
    },
```
Efficiency, amount, and preload values are based on limit break ranks, being rank0/rank1/rank2/rank3. Enclose retrofit values on parenthesis. eg. retrofit has +5% MG on 2nd rank, "125%/127%/130%(135%)/135%(140%)


```json
"drop": {
    "droppable": "false"
```
Set to false if it doesn't drop to any map, world or events. 


```json
"list": {
      "1": {
        "event": "World",
 ```
The map or "event" that contains chapters and nodes. For example if the bote also drops on Crimson Echoes, add: "2": { "event": "Crimson Echoes",


```json
"chapter": {
          "1": {
            "label": "Ch.2",
```
The chapters in the "event". For "World", the label should be the chapter names, eg. "Ch.2". For events, the label should be "AX" or "BX" 


```json
"node": {
              "1": {
                "drop": "✓",
                "note": "JP Only"
              }
```
The nodes pertain to the playable stages inside the chapter. YOU SHOULD INCLUDE ALL NODES of a chapter in the json file even though the bote does not drop on that node. Just mark the "drop" as "-" instead of "✓"


```json
"lines": {
    "skin": {
      "1": {
        "label": "Default",
        "dialogue": {
          "1": {
            "event": "Ship Description",
            "media": "",
            "chinese": "",
            "chineseTL": "",
            "chineseNote": "",
            "japanese": "",
            "japaneseTL": "",
            "japaneseNote": "",
            "english": "",
            "englishNote": ""
          }
```
Each skin has its own different set of lines. If you notice the template, aurora has 3 skins so on the "skin": {"1"} part, you see this repeated 3 times. The "label" is the skin name but this doesn't appear on the page yet but make sure to fill it up with the correct details. the "media" corresponds to the "event" so this needs to be left as it is but if you are willing to help with the media files (in the section below) you can actually edit this to the filename of the sound file. Notes are to be implemented soon but there are already fields for it in the json file.
### Retrofit Section
![Retrofit Image](https://i.imgur.com/0JNgi0T.png)
```json
"1": {
	"nodeSettings": "retronode, a1, n n y n",
	"stat": "evasion, base, Evasion +5",
	"stage": "1",
	"desc": "Evasion Enhancement I",
	"level": "1",
	"limitBreak": "★★☆☆☆",
	"material": "bpt1 3, gold 600"
}
```
#### nodeSettings
nodeSettings has 3 fields, "nodetype, node, nodeconnections"
- "node" is the cell id if the node in the retrofit table in game. Like in microsoft excel or google sheets, the rows are defined by numbers while the columns are defined by letters
- "nodetype" is the type of node that fills the cell. Can only be of two, a "retronode" which is a1 in the example image and "line" which is c1 in the image
	- For "line" nodetype, you can omit the rest below like the ff example below:
```json
"5": {
	"nodeSettings": "line, c1, n y n y"
}
```
- "nodeconnections" is the directions on where the node connects to. y means yes, n means no. The format is top right bottom left. In the sample image, a1 connects to the lower cell a2, so the connections are "n n y n" which means: top = no, left = no, bottom = yes, right = no.

#### stat
stat has 3 fields, "stat, modifier, description"
- "stat" is basically the stat of the ship that is increased. Can be one of the following values: aviation, asw, divebomber, firepower, evasion, fighter, hit, hp, maingun, modernization, reload, auxgun, skill, speed, torpedobomber, torpedo.
- "modifier" is which type of stat increase it does. It can be of the two values: "base" is flat increase, "efficiency" is percentage increase. There is an exception for stats tagged as "skill" and "modernization", in this case, the "modifier" can be: offensive, defensive or support.
- "description" is the general description of the stat increase. eg. "Evasion +5"

#### stage
Up to how many times the node can be reinforced. In the case of d1 in the sample image, it's 2

#### desc
This is the description you see in the node in the sample image, in the case of a1, it's "Evasion Enhancement I"

#### level
The level where the node can be unlocked

#### limitBreak
The limit break rank allowed for the node to be unlocked

#### material
Can be of multiple field entries, but the format is generally
````
item amount, item amount, item amount
````
- "item" can only have fixed values like the following:
	- For blueprints, the format is bpt1 where t1 is the tier of the blueprint up to t3
	- For upgrade plates, the format is plt1_aux where t1 is the tier of the upgrade plate up to t3 and the value after the underscore can be of any of the ff:
		- aux = auxilliary plates
		- torp = torpedo plates
		- gun = gun plates
		- air = aircraft plates
	- For gold, just type "gold"
	- For limitbreak material (bullins/dupe) just use "duplicate"
	- For special items like san diego and warspite's items, use "special"
- "amount" is the number of needed items
## Media files

If you have extra time to assemble the media files as well, you can check the file structure from this link https://mega.nz/#!1Q9mWSZR!qpC2DluKhYgfq1LrT3ofW_9Tm0LhpaSV7zB9dqk5Sd4. It contains the format of the file names as well as the image resolutions. 

Also a few notes
- For sprites, get full resolution as much as possible, if you're ripping it from the current english wiki, be sure to get the original resolution since the one posted in the pages are scaled. 
- If you try and compress an image for size, be sure to compare the pixel quality to the original.

## Patch Notes

Compose a markdown using this website 
- http://demo.showdownjs.com/

The left pane is where you input the code, the right is the visuals it shows. After you are finised, copy the code from the left and paste it in a notepad then save it as:
````
"<yyyy>_<mm>_<dd>_patch_<server>.txt" 
````
and put it on: 
````
Patchnotes/<server>/
````
Then update the json file of the corresponding server at the json directory adding a line to the new file 
```json
{
	"1": {
		"filename": "2019_02_14_patch_jp",
		"title": "Valentines Patch",
		"date": "2019/02/14"
	}
}
```
to
```json
{
	"1": {
		"filename": "2019_02_14_patch_jp",
		"title": "Valentines Patch",
		"date": "2019/02/14"
	},
  "2": {
		"filename": "2019_02_21_patch_jp",
		"title": "x3 Hard mode",
		"date": "2019/02/21"
	}
}
```
  

## Submission
Just reply to the current OP post in /alg/ if you have a submission. 

# Updates

Adding the following json files provided by anons below:

- -

Also
- Add jukebox section [https://mega.nz/#F!SaZkHAIL!v2vRbqpbeOEjz9-tTDe94A](https://mega.nz/#F!SaZkHAIL!v2vRbqpbeOEjz9-tTDe94A)
- Filters on ship list
- Equipment page

