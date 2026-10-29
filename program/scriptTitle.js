changeDoing("hidden");

//既存の変数をいじる

wDraw=overRide(windowDraw, 
	() =>{
		haikei
		.decode()
		.then(()=>{
		let titleX=title.width * windowWidth / 17500;
		let titleY=title.height * windowWidth / 17500;
			ctx.drawImage(haikei, 0, 0, windowWidth, windowHeight);
			ctx.drawImage(title, windowWidth/30, windowHeight/20,  titleX, titleY);
		})
		.catch((encodingError)=>{
	
		});
	}
);

ctx.clearRect(0, 0,  windowWidth * dpr, windowHeight * dpr);
wDraw.draw();

//本編
timer = setTimeout(() => {
	wDraw.overRide();
	addButton("startButton", "はじめる", "Movie", "change");
	addButton("optionButton", "せってい", () => {
		console.log("未完成");
	});
}, 100);

for(let item of freeTexts){
	item.style.color="black";
}