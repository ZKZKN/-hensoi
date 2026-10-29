
window.addEventListener("load", gameBase.update);

//gameContentBaseにHTML要素を追加

result=addText("gameText", 0, textDown / 2, windowWidth, windowHeight,"ここに結果を表示");

addText("gameText", 0, 0, windowWidth, windowHeight, "鉱石を掘って金を稼ぎましょう！");
addText("gameText", 0, textDown, windowWidth, windowHeight, "※5秒を超えると落としてしまいます");

gameContentBase.insertAdjacentElement("beforeend", result);


//描画オーバーライド

wDraw=overRide(windowDraw,
	() =>{
		crystal.src=crysFrame[0];
		ctx.drawImage(bag, windowWidth*5/7, windowHeight-94.5+35, 40, 60);
		ctx.drawImage(crystal, windowWidth*3/5, windowHeight-70.2,  scaleWidth/5, scaleHeight/5);
	}
);


//キャラとか動かす

function weigh(){
	let dif=(performance.now()-startTime)/1000-10;
	if(dif>=-10){bag.src=bagFrame[0]}
	if(dif>=-6){bag.src=bagFrame[1]}
	if(dif>=-3){bag.src=bagFrame[2]}
	if(dif>=0){bag.src=bagFrame[3]}
	console.log(dif);
}

//ゲーム部分


body=document.body;


gameBase=overRide(gameParts, ()=>{
	startGame.textContent="もう一回";
	endTime= (performance.now()-startTime)/1000;

	let difference=Math.abs(endTime-5);
	addMoney=Math.trunc(500/difference-50);
	endTime=Math.trunc(endTime*100)/100;

	result.textContent=endTime+"秒が経過しました", "dontInsert";
});

gameBase=overRide(gameBase, "game", ()=>{
	startGame.textContent="クリックで停止";
	let seconds=0;
	startTime=performance.now();
	result.textContent="測定中…", "dontInsert";
}, "continuing");

gameBase=overRide(gameBase, "protDoing", () =>{
		animateSprite(protagonist, protSpriteNum, protFrame, 3, 3, protX, protY, windowHeight);
		animateSprite(protagonist, protSpriteNum, protFrame, 3, 2, protX / 1.45, protY, windowHeight, 2);
		protSpriteNum >= protFrame -1 ? protSpriteNum=0 : protSpriteNum++;
}, "continuing");


gameBase.protSrc="./program/images/moyasiMining.png";
gameBase.emptyIdle=1;

gameBase.startUpdate();
startGame.classList.remove("onlyNotDoing");

for(let item of freeTexts){
	item.style.color="white";
}
startGame.style.setProperty("--buttonColor1", "#B97A7A");
startGame.style.setProperty("--buttonColor2", "#B16868");
startGame.style.setProperty("--buttonBorder", "#E8D3D4");