//全てのScriptの前に実行する

//画面作る
const root = document.querySelector(":root");

let windowWidth=window.innerWidth;
let windowHeight=window.innerWidth*(9/16);

let pass="./program/images/";

const haikeiFrame={
	Title : pass + "titleIllust.png",
	Mining : pass + "cave.png",
	Weeding : pass + "sougenKari.png"
};

const menuFrame={
	back : pass + "menuBack.png",
	mining : pass + "menuMine.png",
	weeding : pass + "menuWeed.png",
};

const canvas=document.getElementById("base");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const haikei=document.createElement("img");
haikei.width=windowWidth;
haikei.height=windowHeight;
canvas.insertAdjacentElement("beforebegin", haikei);
haikei.src=haikei.src;
haikei.id="haikei";

let camera;

const protagonist=new Image();

	//image.decodeを使い回す
function drawImageLoaded(img, x, y, width, height){
	img
	.decode()
	.then(()=>{
		ctx.drawImage(img, 0, 0,  windowWidth, windowHeight);
	})
	.catch((encodingError)=>{
	});
}

const windowAdjustResolution = () => {
	if(windowWidth>document.documentElement.clientWidth){
		windowWidth=document.documentElement.clientWidth;
		windowHeight=windowWidth*(9/16);
	}
	if(windowHeight>document.documentElement.clientHeight){
		windowWidth=document.documentElement.clientHeight*(16/9);
		windowHeight=document.documentElement.clientHeight;
	}
	Math.floor(windowWidth);
	Math.floor(windowHeight);
	root.style.setProperty("--ww", windowWidth);
	root.style.setProperty("--wh", windowHeight);
	haikei.width=windowWidth;
	haikei.height=windowHeight;
	windowWidth*=dpr;
	windowHeight*=dpr;
	canvas.width=windowWidth;
	canvas.height=windowHeight;
	
}
windowAdjustResolution();

const windowDraw=class{
	constructor(camera, pro, place){
		this.camera=camera;
		this.pro=pro;
		this.place=place;
	}
	drawHaikei(){
	}
	drawBase(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.drawHaikei();
	}
	overRide(){}
	draw(){
		this.drawBase();
		this.overRide();
	}
	
};

let wDraw=new windowDraw(0, 0, haikeiFrame);

//タイマー用意
let timer;

//ボタンとかのベース用意
let buttonBase=document.createElement("div");

	//addButtonの引数は"で囲う
function addButton(className, textOrImageSrc, destination, type){
	let moveButton=document.createElement("button");
	if(className === "menuElement"){
		moveButton=document.createElement("img");
		moveButton.classList.add(className);
		menuBase.insertAdjacentElement("beforeend", moveButton);
		moveButton.id=textOrImageSrc;
		moveButton.src=menuFrame[textOrImageSrc];
		moveButton.classList.add("onlyNotDoing");
	}
	else{
		moveButton.classList.add(className);
		moveButton.id=className;
		moveButton.textContent=textOrImageSrc;
		console.log(className);
		buttonBase.insertAdjacentElement("beforeend", moveButton);
	}
	if(type === "change"){
		moveButton.onclick=()=>{changeScene(destination)};
	}
	else{
		moveButton.onclick=()=>{destination();};
	}
	return moveButton;
}

//テキストを画面に追加
let textDown=10;
const freeTexts=document.getElementsByClassName("freeTextArea");
function addText(idName, X, Y, width, height, content, isNotContinued){
	if(isNotContinued != null && isNotContinued != "dontInsert"){
		removeElement(idName);
	}
	let textArea=document.createElement("div");
	textArea.classList.add("freeTextArea");
	textArea.style.setProperty("--x", X);
	textArea.style.setProperty("--y", Y);
	textArea.style.setProperty("--w", width);
	textArea.style.setProperty("--h", height);
	textArea.id=idName;
	textArea.textContent=content;
	if(isNotContinued != "dontInsert"){
		gameContentBase.insertAdjacentElement("beforeend", textArea);
	}
	if(X === 0){
		textArea.style.left=0;
	}
	if(Y === 0){
		textArea.style.top=0;
	}
	return textArea;
}

//メニューを用意
let menuBase=document.createElement("div");
menuBase.classList.add("menuBase");
canvas.insertAdjacentElement("afterend", menuBase);

let menuMine=addButton("menuElement", "mining", "Mining", "change");
let menuWeed=addButton("menuElement", "weeding", "Weeding", "change");
let menuBack=addButton("menuElement", "back", "Title", "change");
canvas.insertAdjacentElement("afterend", menuBase);

for(i=0; i<Object.keys(menuFrame).length; i++){
	let plus=document.getElementsByClassName("menuElement");
	plus[i].style.setProperty("--num", (i+1) *10);
}

//金を用意
let debt=100000;
let nowMoney=0;
let addMoney=0;
let debtBase=addText("debt", 1.3,  3.5, 3, 30, debt, "dontInsert");
let nowMoneyBase=addText("nowMoney", 1.3,  5, 3, 30, nowMoney, "dontInsert");
canvas.insertAdjacentElement("afterend", debtBase);
canvas.insertAdjacentElement("afterend", nowMoneyBase);

let onlyNotDoingArray=new Array(menuBase, debtBase, nowMoneyBase);
for(let item of onlyNotDoingArray){
	item.classList.add("onlyNotDoing");
}
let onlyNotDoing=document.querySelector(".onlyNotDoing")

const changeDoing= (designate) =>{
	onlyNotDoingArray=document.querySelectorAll(".onlyNotDoing");
	let resultInHere=designate != null ? designate :
		onlyNotDoing.style.visibility === "hidden" ? "visible" : "hidden";
	for(let item of onlyNotDoingArray){
		item.style.visibility = resultInHere;
	}
	onlyNotDoing.style.visibility = resultInHere;
}

//クラスをオーバーライドする
function overRide(superClass, methodOrBaseName, modBaseMethod, continuing){
	if(continuing != null){
		superClass[methodOrBaseName]=function(){
			modBaseMethod();
		};
		return superClass;
	}
	let kariClass;
	let newClass;
	kariClass=class extends superClass{
	
	};
	if(modBaseMethod == null){
		newClass=new kariClass(0, 0, 0);
		newClass["overRide"]=function(){
			methodOrBaseName();
		};
		return newClass;
	}
	newClass=new kariClass(0, 0, 0);
		newClass[methodOrBaseName]=function(){
			modBaseMethod();
		
	};
	console.log(newClass);
	return newClass;
}

//リサイズで調整

let scaleWidth=windowHeight*canvas.width*9/16;
if(scaleWidth>1900){scaleWidth=1900}
let scaleHeight=canvas.height/scaleWidth;

window.addEventListener('resize', () => {
  timer = setTimeout(() => {
	windowAdjustResolution();
	haikei.width=windowWidth/dpr;
	haikei.height=windowHeight/dpr;
	wDraw.draw();
  }, 300);
});

//キャラ動かす
//単体で動くのではなくframeをforとかで動かすのとセットで作動する
	
function animateSprite(chara, frame, maxNumOfX, maxNumOfY, useNumOfY, X, Y, size, overlap){
	let frameW=chara.width/maxNumOfX;
	let frameH=chara.height/maxNumOfY
	let divisor = frameW > frameH ? frameW - frameH : frameH - frameW;
	let sizeY=frameW/divisor;
	let sizeX=frameH/divisor;
	while(!Number.isInteger(sizeX)){
		sizeX+=sizeX;
		sizeY+=sizeY;
	}
	if(overlap == null){
		wDraw.draw();
	}
	for(let i=0; i<maxNumOfX; i++){
		if(i==frame){
			ctx.drawImage(chara,
			frameW*frame, frameH * (useNumOfY-1),
			chara.width/maxNumOfX, chara.height/maxNumOfY,
			windowWidth*X, windowHeight*Y,  size / 3, size / 3 * sizeX / sizeY);
		}
	}
}

//シーンを置く場所を定義
let gameContentBase=document.createElement("div");
gameContentBase.classList.add("center");

let white=document.createElement("div");
white.classList.add("whiteOut");
canvas.insertAdjacentElement("afterend", white);
white.style.visibility ="hidden";

//シーン変更
let sceneUpdate;
let nowScene=document.createElement("script");
nowScene.id="scene";

function changeScene(next){
	changeDoing("hidden");
	running=false;
	clearTimeout(timer);
	clearInterval(sceneUpdate);
	wDraw=new windowDraw(0, 0, haikei);
	let nextSrc="./program/script" + next + ".js";
	if(nowScene.id == next){return;}

	if(next === "Movie"){
	isMoneySaved === false ? next="Op" : next="Ed";
	}
	else{
		haikei.src=haikeiFrame[next];
	}

	gameContentBase=resetElement(gameContentBase, "div", "beforeend", "center");

	buttonBase=resetElement(buttonBase, "div", "beforeend", "buttonBase");

	removeElement(nowScene.id);
	nowScene=resetElement(nowScene, "script", "beforeend", next);
	nowScene.src=nextSrc;
	nowScene.id="nowScene";
	wDraw.draw();
}


function removeElement(idName){
	let nowElement=document.getElementById(idName);
	while(nowElement!= null){
		nowElement.remove();
		nowElement=document.getElementById(idName);
	}
}

function resetElement(target, theirType, position, classInHere){
	removeElement(classInHere);
	target=document.createElement(theirType);
	document.body.insertAdjacentElement(position, target);
	if(classInHere != null){
		target.id=classInHere;
		target.classList.add(classInHere);
	}
	return target;
}


//ゲーム部分汎用
let running=false;
let startGame;
let result;
let body;
let protSpriteNum=0;
let protFrame=5;
let isMoneySaved=false;

let gameParts = class{
	constructor(protSrc, emptyIdle, emptyDo){
		this.protSrc=protSrc;
		this.emptyIdle=emptyIdle;
		this.emptyDo=emptyDo;
	}

	isRunning(){
		if(running==false){
			this.protIdling(protSpriteNum);
			}
		if(running==true){
			this.protDoing(protSpriteNum);
			}
	}

	//IdlingとDoingは基本的にオーバーライドして使う
	protIdling(){
		animateSprite(protagonist, protSpriteNum, protFrame, 3, 1, protX, protY, windowHeight);
		protSpriteNum >= protFrame - this.emptyIdle -1 ? protSpriteNum=0 : protSpriteNum++; 
	}

	protDoing(){
		animateSprite(protagonist, protSpriteNum, protFrame, 3, 3, protX, protY, windowHeight);
		protSpriteNum >= protFrame - this.emptyDo -1 ? protSpriteNum=0 : protSpriteNum++; 
	}

	gameOnOff(){
		changeDoing();
		running=!running;
		running === true ? this.game() : this.gameResult();
		
	}

	//オーバーライド前提
	overRide(){
	
	}

	game(){
		
	}

	gameResult(){
		this.overRide();
		nowMoney+=addMoney;
		document.getElementById("nowMoney").textContent=nowMoney;
		let resultContent=addText("result", 1.5, 2, 
			3, 2, addMoney + "円ゲット！", true);
		timer=setTimeout(() => {
			resultContent.remove();
		}, 1000);
		addMoney=0;
	}
	//ここまで
	
	startUpdate(protSrc){
		startGame=addButton("gameButton", "クリックで開始", ()=>{
			this.gameOnOff();
		});
		startGame.classList.add("onlyNotDoing");
		changeDoing("visible");
		if(this.protSrc != null){
			protagonist.src=this.protSrc;
		}
		wDraw.draw();
		sceneUpdate=setInterval( () => {
			this.isRunning();
			if(nowMoney > debt){
				isMoneySaved=true;
				changeScene("Movie");
			}
		}, 150);
		setInterval(sceneUpdate);
	}
}

let gameBase=new gameParts("./program/images/moyasiMining.png", 1, 0);

//各所で使う変数とかを事前に宣言しておく

//共通＋wait用
let skip=false;
let wait=false;

function needToGo(func, time){
	if(wait==false){
		wait=true;
		timer=setTimeout(()=>{
			wait=false;
			func();
		}, time);
		
	}
}

let protX=0.35;
let protY=5/11;
let gameover=false;

//Title
const title=new Image();
title.src="./program/images/title.png";

//OP
const opNowImage=new Image();
let opImages=new Array();

for(let i=1; i<12; i++){
	opImages.push("./program/images/op/" + i + ".PNG");
}

const edNowImage=new Image();
let edImages=new Array();

for(let i=1; i<12; i++){
	edImages.push("./program/images/ed/" + i + ".PNG");
}

let movieNum=1;
let moviePage=1;
let didMovieAnimeRan=false;
let movieAnimeLoop;
let movieAnimeLoopHaikei;
let endPage;
const movieTexture=new Image();
movieTexture.src="./program/images/movieTexture.png";
movieTexture.id=movieTexture;
let nTG;
let nowMovieEvent;

//Mining
const bag=new Image();
let bagFrame=new Array("./program/images/バッグ1.png","./program/images/バッグ2.png","./program/images/バッグ3.png","./program/images/バッグ破裂.png");

const crystal=new Image();
let crysFrame=new Array("./program/images/鉱石.png");
crystal.src=crysFrame[0];

let startTime;
let endTime;

//Weeding
let timeLeft;
let speciesOfGrasses;
const okGrasses=new Array();
const ngGrasses=new Array();
let nowGrass;
let isWeedingSkipped=false;
let isWeeded=false;
let grassFrame=0;
let grasses=0;
let thisGameGlasses;
const nextGrassImage=new Image();

//以降追記

//ここから実行
changeScene("Title");
