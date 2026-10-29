
if(isMoneySaved === false){
	endNum=12;
	wDraw=overRide(windowDraw, ()=>{
		drawOpImage();
	});
	nowMovieEvent=drawOpText;
}
else{
	endNum=5;
	wDraw=overRide(windowDraw, ()=>{
		drawEdImage();
	});
	nowMovieEvent=drawEdText;
}

wDraw=overRide(wDraw, "drawHaikei", () =>{
		ctx.clearRect(0, 0, windowWidth, windowHeight);
		ctx.fillStyle="#BFB8A5";
		ctx.fillRect(0, 0, windowWidth, windowHeight);
		let imageInHere=new Image();
		imageInHere.src= pass + "movieTexture" + ".png";
		imageInHere
		.decode()
		.then(()=>{
			ctx.globalCompositeOperation="multiply";
			ctx.drawImage(imageInHere, 0, 0,  windowWidth, windowHeight);
			imageInHere.src= pass + "movieTexture2" + ".png";
			ctx.globalCompositeOperation="screen";
			ctx.drawImage(imageInHere, 0, windowHeight / 300 * dpr, windowWidth, windowHeight);
			ctx.globalCompositeOperation="source-over";
		})
		.catch((encodingError)=>{
	
		});
	}, "continuing"
);

wDraw.draw();

document.body.addEventListener("click", nowMovieEvent);
nowMovieEvent(0);
document.body.addEventListener("keydown", skipMovie);

nTG=(e)=>{
	if(timer != null){
		window.clearTimeout(timer);
	}
	removeElement("movieText");
	document.body.removeEventListener("click", nTG);
	didAnimeMovieRan=false;
	clearInterval(movieAnimeLoop);
	clearInterval(movieAnimeLoopHaikei);
	if(movieNum<endNum){
		movieNum++;
		wDraw.draw();
		isMoneySaved === false ? drawOpText() : drawEdText();
		return;
	}
	didAnimeMovieRan=false;
	movieNum=1;
	moviePage=1;
	nowMoney=0;
	document.body.removeEventListener("keydown", skipMovie);
	document.body.removeEventListener("click", nowMovieEvent);
	if(isMoneySaved === false){
		changeScene("Mining");
	}
	else{
		changeScene("Title");
		isMoneySaved=false;
	}

}


function drawOpText(e){
	if(e !== undefined && e.type === "resize"){
		return;
		}

	skip=false;
	let allowToGoNext=false;
	let allow=()=>{
		allowToGoNext=true;
	}

	document.body.removeEventListener("click", nTG);
	document.body.addEventListener("click", nowMovieEvent);

	if(moviePage===1){
		addMovieText(0, 0, "あるところに、一人の人間がいました。");
		addMovieText(0, textDown, "その人間は、のどかで平和な日々を送っていました。", true);
	}
	if(moviePage===2){
		addMovieText(0, 0, "ですが、その人間は退屈していました。");
		addMovieText(0, textDown, "贅沢に金を使い、非日常を味わいたいと、常日頃から考えていました。", true);
		allow();
	}
	if(moviePage===3){
		addMovieText(0, 0, "さて、彼が今日も今日とて暇をしていた、ある日のことでした。");
	}
	if(moviePage===4){
		drawOpImage();
		document.body.removeEventListener("click", drawOpText);
		timer=setTimeout(()=>{
			addMovieText(1.5,8, "こんにちは。");
			addMovieText(1.5,4, "わたしは　天使", true);
			addMovieText(1.5,3, "ダイ＝マーメンです。", true);
			addMovieText(0, 0, "光の中から謎の生物が現れたのです。", true);
			movieNum++;
			wDraw.draw();
			moviePage++;
			document.body.addEventListener("click", drawOpText);
		}, 1000);
		return;
	}
	if(moviePage===5){
		drawOpImage();
		addMovieText(0, 0, "迷える子ひつじよ。あなたに　富を授けましょう。");
		addMovieText(0, textDown, "ダイ＝マーメンはそう言うと、", true);
		addMovieText(0, textDown/2, "およそ" + debt + "円を", true);
		addMovieText(0, textDown/3, "どこからともなく", true);
		addMovieText(0, textDown/4, "取り出しました。", true);
		allow();
	}
	if(moviePage === 6){
		document.body.removeEventListener("click", drawOpText);
		addMovieText(1.7, textDown/3, "思いもよらぬ");
		addMovieText(1.7, textDown/4, "富を得たその人間は、", true);
		addMovieText(1.7, textDown/5, "それはそれは贅沢に", true);
		addMovieText(1.7, textDown/6, "お金を使いました。", true);
		drawOpImage();
		timer=setTimeout(()=>{
			document.body.addEventListener("click", nTG);
		}, 400);
	}
	if(moviePage === 7){
		addMovieText(2.6, 2.8, "ああ　最高だった。");
		addMovieText(0, 0, "それから数日経って、人間が家でくつろいでいる時。", true);
	}
	if(moviePage === 8){
		document.body.removeEventListener("click", drawOpText);
		drawOpImage();
		timer=setTimeout(() => {
			addMovieText(0, 0, "またしても、ダイ＝マーメンが人間のもとにやってきました。");
			document.body.addEventListener("click", nTG);
		}, 1000);
	}
	if(moviePage === 9){
		addMovieText(0, 0, "驚く人間に対して、ダイ＝マーメンは静かに告げました。");
	}
	if(moviePage === 10){
		addMovieText(1.9, textDown / 1.5, "子ひつじよ。わたしのお金を");
		addMovieText(1.9, textDown / 2.5, "返しなさい。", true);
		addMovieText(0, 0, "なんと、彼に渡されていたのは貸金だったのです。", true);
	}
	if(moviePage === 11){
		addMovieText(30, textDown/1.5, "あれは　くれたお金では");
		addMovieText(30, textDown/2.5, "なかったのですか。", true);
		addMovieText(2, textDown/2, "そんなわけないでしょう。", true);
		addMovieText(2, textDown/3, "それより　返せないのですか。", true);
	}
	if(moviePage === 12){
		document.body.removeEventListener("click", drawOpText);
		addMovieText(10, textDown/1.5, "はい。");
		addMovieText(2, textDown/2, "そうですか。では…", true);
		timer=setTimeout(() => {
			drawOpImage();
			addMovieText(2, textDown/2, "代わりに命をもらいます。");
			document.body.addEventListener("click", drawOpText);
			moviePage++;
		}, 2500);
		return;
	}
	if(moviePage === 13){
		document.body.removeEventListener("click", drawOpText);
		white.style.visibility ="visible";
		addMovieText(0, 0, "その瞬間、辺りは真っ白に輝き…");
		console.log("1313");
		timer=setTimeout(() => {
			movieNum++;
			wDraw.drawBase();
			white.style.visibility ="hidden";
			addMovieText(0, 0, "なんと人間は、もやしの幽霊にされてしまったのです。");
			drawOpImage();
			moviePage++;
			document.body.addEventListener("click", nTG);
		}, 2500);
		return;
	}
	if(moviePage === 14){
		didMovieAnimeRan=false;
		addMovieText(0, 0, "幽霊になってしまった人間は、ダイ＝マーメンに手を引かれ、");
		addMovieText(0, textDown, "今にも天国へ連れていかれてしまいそうでした。", true);
	}
	if(moviePage === 15){
		addMovieText(0, 0, "このままでは、彼は死んでしまいます。");
		addMovieText(0, textDown, "人間、もとい、もやしは焦って、ある言葉を口にしました。", true);
		allowToGoNext=true;
	}
	if(moviePage === 16){
		addMovieText(10, textDown/4, "借金を今から返すので");
		addMovieText(10, textDown/5, "全部返したら", true);
		addMovieText(10, textDown/6, "私を生き返らせてください。", true);
		allowToGoNext=true;
	}
	if(moviePage === 17){
		addMovieText(0, 0, "もやしの言葉を聞いて、ダイ＝マーメンは少しの間考えました。");
		addMovieText(0, 0, "そのあと、ダイ＝マーメンはこう言いました。");
	}
	if(moviePage === 18){
		addMovieText(2, textDown/2, "わかりました。");
		addMovieText(2, textDown/3, "ですが　7日です。", true);
	}
	if(moviePage === 19){
		addMovieText(2, textDown/2, "7日後までに金を返さなければ");
		addMovieText(2, textDown/3, "あなたの命を頂きます。", true);
	}
	if(moviePage === 20){
		addMovieText(2, textDown/2, "それでは");
		addMovieText(2, textDown/3, "どうぞ頑張ってきてください。", true);
		allowToGoNext=true;
	}
	if(moviePage === 21){
		addMovieText(0, 0, "こうして、もやしは借金を返済することになりました。");
		movieNum++;
		allowToGoNext=true;
	}

	moviePage++;
	if(allowToGoNext===true){
		document.body.removeEventListener("click", nowMovieEvent);
		document.body.addEventListener("click", nTG);
	}
}

function drawOpImage(){
	opNowImage.src=opImages[movieNum-1];
	let addArray=new Array("a","b");
	if(movieNum === 1){
		//あとでやる　主人公をループ、ランダムで花orビルor草を一定間隔で配置
		drawImageLoaded(opNowImage, 0, 0, windowWidth, windowHeight);
		 
	}
	if(moviePage === 4 && movieNum === 2){
		addAdditionalImage(addArray, "op/2-2");
	}
	if(moviePage === 5){
		addAdditionalImage(addArray[0], "op/3-");
		needToGo(() => {
			addAdditionalImage(addArray[1], "op/3-")
		}, 100);
		return;
		
	}
	if(moviePage === 6){
		needToGo(()=>{
			addAdditionalImage(addArray[0], "op/4-");
			return;
		}, 500);
	}
	if(moviePage === 8){
		addAdditionalImage(addArray, "op/5-");
	}

	if(moviePage === 12){
		addAdditionalImage(addArray[0], "op/6-");
		return;
	}
	if(moviePage === 13){
		let oneTenth=2;
		let w;
		let h;
		let integer=0;
		if(didMovieAnimeRan === false){
			didMovieAnimeRan=true;
			let anime=setInterval(() => {
				console.log(oneTenth);
				w=windowWidth * (50/oneTenth);
				h=windowHeight * (50/oneTenth);
				wDraw.drawBase();
				ctx.drawImage(opNowImage, -((w-windowWidth)/2), -((h-windowHeight)/2), w, h);
				if(oneTenth < 40){
					integer+=1;
					oneTenth+= integer;
				}
				oneTenth+=1;
				if(oneTenth > 50){
					clearInterval(anime);
				}
			}, 20);
		return;
		}
	}
	if(movieNum === 8){
		function newCloud(num, plus){
			let x=Math.random() * windowWidth / 2 + windowWidth / 2;
			let y=-windowHeight- windowHeight / 3 * (num - 1);
			if(plus != null){
				x+=plus *  windowWidth / 10;
				y+=plus *  windowHeight / 5;
			}
			let img=new Image();
			img.src="./program/images/op/8-b.PNG";
			let parameters={
				"img" : img,
				"x" : x,
				"y" : y,
				"num" : num
			};
			return parameters;
		}
		function moveCloud(thisCloud){
			thisCloud.x+=0.1;
			thisCloud.y+=5;
			ctx.drawImage(thisCloud.img, thisCloud.x, thisCloud.y, 
			windowWidth/5, windowHeight/5);
			if(thisCloud.y > windowHeight){
				thisCloud.x=windowWidth / 2 + Math.random() * windowWidth / 4;
				thisCloud.y=-windowHeight + Math.random() * windowHeight / 8;
			}
		}
		let cloudArray=new Array();
		for(let i=0; i < 6; i++){
			cloudArray.push(newCloud(i+1));
		}
		for(let i=0; i < cloudArray.length; i++){
			let kariArray=cloudArray[i];
			kariArray[2]+=windowHeight;
		}
		
		let wingNum=3;
		const wing=new Image();
		if(didMovieAnimeRan === true){
			clearInterval(movieAnimeLoop);
			clearInterval(movieAnimeLoopHaikei);
		}
		else{
		wing.src="./program/images/op/8-a"+(wingNum-2);
		wing.classList.add("center");
		wing.id="wing";
		gameContentBase.insertAdjacentElement("afterend", wing);
		}

		movieAnimeLoopHaikei=setInterval(() => {
			didMovieAnimeRan=true;
			wDraw.drawBase();
			for(let i=0; i < cloudArray.length; i++){
				moveCloud(cloudArray[i]);
			}
			ctx.drawImage(opNowImage, 0, 0, windowWidth, windowHeight);		
		}, 20);

		movieAnimeLoop=setInterval(()=>{
			wing.remove();
			wing.id="wing";
			wing.src="./program/images/op/8-a"+(wingNum-2)+".PNG";
			gameContentBase.insertAdjacentElement("afterbegin", wing);
			wingNum>3 ? wingNum-- : wingNum++;
		}, 400);
	return;
	}
	if(movieNum === 9){
		let wing=document.getElementById("wing");
		wing.remove();
	}

	drawImageLoaded(opNowImage, 0, 0, windowWidth, windowHeight);
}

function drawEdText(e){
	if(e !== undefined && e.type === "resize"){
		return;
		}
	document.body.removeEventListener("click", nTG);
	document.body.addEventListener("click", drawEdText);
	skip=false;
	let allowToGoNext=false;
	let allow=()=>{
		allowToGoNext=true;
	}
	
	if(moviePage === 1){
		addMovieText(0, 0, "金を貯め終えたもやしは、ダイ＝マーメンの所へ向かいました。");
		addMovieText(1.5, textDown/5, "貯めてきました。", true);
		addMovieText(1.5, textDown/6, "早くお納めください。", true);
	}
	
	if(moviePage === 2){
		addMovieText(20, textDown/ 0.5, "えっ。本当に貯めたのですか。");
		addMovieText(20, textDown / 1.5, "…", true);
		allow();
	}
	if(moviePage === 3){
		addMovieText(30, textDown/ 1.5, "わかりました。約束通り");
		addMovieText(30, textDown / 2.5, "貴方を生き返らせて", true);
		addMovieText(30, textDown / 3.5, "あげましょう。", true);
	}
	
	if(moviePage === 4){
		addMovieText(10, textDown / 2.5, "では、いきますよ。");
	}
	if(moviePage === 5){
		addMovieText(10, textDown / 2.5, "す〜〜。");
		addMovieText(0, 1.1, "（だから　早くしてくれないかな。）", true);
	}
	if(moviePage === 6){
		addMovieText(15, textDown / 2.5, "ハアーーーー！");
		white.style.visibility ="visible";
		allow();
	}
	if(moviePage === 7){
		white.style.visibility ="hidden";
		white.style.visibility ="visible";
		addMovieText(0, 0, "ダイ＝マーメンの放った光が、もやしを包み込みます。");
		addMovieText(0, textDown, "すると、もやしの中に、命が芽吹いていきました。", true);
		allow();
		movieNum--;
	}
	if(moviePage === 8){
		addMovieText(0, 0, "こうしてもやしは、無事に復活することができたのでした。");
	}
	if(moviePage === 9){
		white.style.visibility ="hidden";
		addMovieText(0, 0, "もやしになった体は、そのままで。");
		allow();
	}
	if(moviePage === 10){
		addMovieText(0, 0, "…");
		allow();
	}
	if(moviePage === 11){
		addMovieText(4, textDown / 3, "うそだあ〜〜〜〜！");
		addMovieText(1 / 0.85, 1 / 0.9, "おしまい", true);
		allow();
	}
	moviePage++;
	if(allowToGoNext === true){
		document.body.removeEventListener("click", nowMovieEvent);
		document.body.addEventListener("click", nTG);
	}
	console.log(movieNum);
}

function drawEdImage(){
	edNowImage.src=edImages[movieNum-1];
	let addArray=new Array("1","2");

	if(moviePage === 7){
		edNowImage.src=opImages[7-1];
	}

	drawImageLoaded(edNowImage, 0, 0, windowWidth, windowHeight);
}

function addMovieText(x, y, content, isContinued){
	let nowText=document.getElementById("movieText");
	if(nowText !== null && isContinued === undefined){
		while(nowText!==null){
			nowText.remove();
			nowText=document.getElementById("movieText");
		}
	}
	return addText("movieText", x, y, 0.5, 0.5, content);
}

function addAdditionalImage(addArray, place, num, x, y){
	function return0(vari){
		if(vari === undefined){
			vari=0;
		}
	}
	return0(x);
	return0(y);
	
	let func=(item)=>{
		let add=new Image();
		add.src="./program/images/" + place + item + ".PNG";
		drawImageLoaded(add, x, y, windowWidth, windowHeight);
	}
	if(addArray.length < 2 || num != null){
	console.log(num);
		num === undefined ? func(addArray[0]) : func(addArray[num]);
		return;
	}
	for(let item of addArray){
		func(item);
	}
}

function skipMovie(e){
	let key=e.keyCode;
	if(skip===false){
		console.log("エンターキーでスキップ　後でHTML上に記載")
		skip=true;
		return;
	}
	if(skip===true && key===13){
		skip=false;
		movieNum=endNum+1;
		nTG(e);
	}
}
