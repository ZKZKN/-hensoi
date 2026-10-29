

result=document.createElement("p");


wDraw=overRide(windowDraw, 
	() =>{
	
	}
);

function addOkGrass(price){
	let grassImage=new Image();
	let okGrass={
			"type" : "OK",
			"imgSrc" : "./program/images/okGrasses.png",
			"dangerLevel" : 0,
			"price" : price,
			"numOfX" : 4,
			"numOfY" : 0,
			"img" : grassImage,
			"species" : 0
	};
	okGrass.img.src=okGrass.imgSrc;
	okGrasses.push(okGrass);
}

function addNgGrass(name, effect, dangerLevel, numOfX){
	let grassImage=new Image();
	let ngGrass={
			"name" : name,
			"type" : "NG",
			"effect" : effect,
			"imgSrc" : "./program/images/ngGrasses/" + name + ".png",
			"dangerLevel" : dangerLevel,
			"numOfX" : numOfX,
			"numOfY" : 1,
			"img" : grassImage,
			"species" : 0,
			"price" : dangerLevel*200
	};
	ngGrass.img.src=ngGrass.imgSrc;
	ngGrasses.push(ngGrass);
}
addOkGrass(300);
addNgGrass("mandragora", grassScreem, 3, 6);

speciesOfGrasses=new Array(...okGrasses, ...ngGrasses);

for(let i=0; i<=okGrasses.length; i++){
	if(speciesOfGrasses[i].type === "OK"){
		speciesOfGrasses[i].species=i+1;
		speciesOfGrasses[i].numOfY=okGrasses.length;;
	}
	else{
		speciesOfGrasses[i].species=i-okGrasses.length+1;
	}
}

//エンターで判定
function weeding(e){
	if(e.key !== " " && e.key !== "Enter"){
		return;
	}
	isWeeded=true;
	if(e.key === " "){
		isWeedingSkipped=true;
	}

}

function addNextGrass(){
	if(grasses < thisGameGlasses){
		nowGrass=nextGrass;
	}
	if(grasses <= 1){
		return;
	}
	nextGrass=Math.random() * speciesOfGrasses.length;
	nextGrass=Math.floor(nextGrass);
	nextGrass=speciesOfGrasses[nextGrass];
	drawNextGrass(nextGrass);
	if(grasses >= thisGameGlasses){
		nowGrass=nextGrass;
	}
}

function drawGrass(grassFrameInHere){
	if(grasses <= 0){
		return;
	}
	if(nowGrass.type === "OK"){
	animateSprite(nowGrass.img, grassFrameInHere, 4, okGrasses.length, nowGrass.species,
		protX, protY * 1.25, windowHeight, "overlay");
	}
	if(nowGrass.type === "NG"){
		animateSprite(nowGrass.img, grassFrameInHere, nowGrass.numOfX, 1, 1,
		protX, protY * 1.25, windowHeight, "overlay")
	}
}


function drawNextGrass(grasFrameInHere, isSkippedInThere){
	if(grasses <= 0){
		return;
	}
	numOfX=nextGrass.numOfX;
	nextGrassImage.src=nextGrass.imgSrc;
	console.log(nowGrass);
	if(isSkippedInThere !== undefined){
		animateSprite(nowGrass.img, 0, nowGrass.numOfX, nowGrass.numOfY, nowGrass.numOfY,
		protX * (isSkippedInThere /10 + 1) , protY * 1.25, windowHeight,"overlay");
		return;
	}
	if(grasFrameInHere != null){
		animateSprite(nextGrassImage, 0, numOfX, 1, 1,
		protX / 2 * (grasFrameInHere /10 + 1), protY * 1.25, windowHeight,"overlay");
		
	}
	else{
		animateSprite(nextGrassImage, 0, numOfX, 1, 1,
		protX / 2, protY * 1.25, windowHeight, "overlay")
	}
}

function runWeeding(){
	if(nowGrass.type === "NG" && isWeedingSkipped === false){
		gameover=true;
		isWeeded=false;
		// nowGrass.effect(nowGrass.name);
		return;
	}
	grassFrame += 1;
	protSpriteNum++;
	if(isWeedingSkipped === true && grassFrame < 3){
		drawNextGrass(0, grassFrame);
	}
	else if(isWeedingSkipped === false){
		addMoney+=nowGrass.price/3;
		let grassPriceInHere=addText("addMoney", 1.16 / protX, 1.6, 
			3, 2, "+" + nowGrass.price, true);
		timer=setTimeout(() => {
			grassPriceInHere.remove();
		}, 500);
		drawGrass(grassFrame);
	}
	if(grasses > 1){
		drawNextGrass(grassFrame);
	}
	if(grassFrame < 3){
		return;
	}
	protSpriteNum=1;
	grasses-=1;
	isWeeded=false;
	isWeedingSkipped=false;
	grassFrame=0;
	nextGrassImage.src="";
	if(grasses > 0){
		addNextGrass();
	}
}

function grassScreem(){
	animateSprite(nowGrass.img, grassFrame, 6, 1, nowGrass.species,
	windowWidth/1.5, protY, windowWidth/2, "overlay");
	grassFrame < 6 ? grassFrame + 1 : grassFrame - 1;
}

function modInterval(){
	clearInterval(sceneUpdate);
	sceneUpdate=setInterval( () => {
		gameBase.isRunning();
		console.log("oi");
		if(nowMoney > debt){
			isMoneySaved=true;
			changeScene("Movie");
		}
	}, 90);
	return sceneUpdate;
}

gameBase=overRide(gameParts, () =>{
	protX=0.35;
});

gameBase=overRide(gameBase, "game", () =>{
	protX=5/7;
	thisGameGlasses=30;
	startGame.style.visibility ="hidden";
	protFrame=4;
	protSpriteNum=1;
	startTime=performance.now();
	grasses=thisGameGlasses;
	addNextGrass();
	document.body.addEventListener("keydown", weeding);
	timeLeft=30;
}, "continuing");

gameBase=overRide(gameBase, "isRunning", () =>{
	if(running === false){
		isWeeded=false;
		gameBase.protIdling(protSpriteNum);
		return;
		}
	timeLeft-=0.1;
	if(isWeeded === true){
		wDraw.draw();
		gameBase.protDoing();
		runWeeding();
		return;
	}
	wDraw.draw();
	gameBase.protDoing();
	if(grasses <= 0 || timeLeft <= 0 || gameover === true){
		gameover=false;
		protFrame=5;
		gameBase.gameOnOff();
		return;
	}
	if(grasses > 1){
		drawNextGrass();
	}
	drawGrass(0);
}, "continuing");


gameBase=overRide(gameBase, "protIdling", () =>{
	let protSpriteNumInteger=Math.floor(protSpriteNum);
	animateSprite(protagonist, protSpriteNumInteger, protFrame, 3, 1, protX, protY, windowHeight);
	protSpriteNum >= protFrame - gameBase.emptyIdle -0.5 ? protSpriteNum=0 : protSpriteNum+=0.5;
}, "continuing");

gameBase=overRide(gameBase, "protDoing", () =>{
	animateSprite(protagonist, protSpriteNum, protFrame, 3, 2, protX, protY, windowHeight * 1.25);
}, "continuing");


gameBase.protSrc="./program/images/moyasiWeeding.png";
gameBase.emptyIdle=1;
gameBase.startUpdate();

addText("gameText", 0, 0, windowWidth, windowHeight, "草むしりの報酬で金を稼ぎましょう！");
addText("gameText", 0, textDown, windowWidth, windowHeight, "※濃い草をむしらないように注意！");
addText("gameText", 0, textDown/2, windowWidth, windowHeight, "Enter：むしる");
addText("gameText", 0, textDown/3, windowWidth, windowHeight, "Spase：スキップ");
sceneUpdate=modInterval();

for(let item of freeTexts){
	item.style.color="black";
}

startGame.style.setProperty("--buttonColor1", "#1FB327");
startGame.style.setProperty("--buttonColor2", "#0CA11B");
startGame.style.setProperty("--buttonBorder", "#F0F5E0");