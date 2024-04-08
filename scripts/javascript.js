function drawIt(){
	var x = 250;
	var y = 260;
	var dx = 2;
	var dy = 6;
	var r = 10;
	var width;
	var height;
	var ctx;
	
	var paddley;
	var paddlex;
	var paddleh;
	var paddlew;	
	
	var rightDown = false;
	var leftDown = false;
	
	var canvasMinX;
	var canvasMaxX;
	
	var bricks;
	var nrows;
	var ncols;
	var brickwidth;
	var brickheight;
	var padding;
	var rng;
	
	var st=0;
	let fail = document.getElementById("failScreen");
	let victory = document.getElementById("victoryScreen");
	let mainCanvas = document.getElementById("main");
	let sideCanvas = document.getElementById("side");

	var junimo1 = new Image();
	junimo1.src = "photos/junimo/junimo1.png";
	
	var junimo2 = new Image();
	junimo2.src = "photos/junimo/junimo2.png";
	
	var junimo3 = new Image();
	junimo3.src = "photos/junimo/junimo3.png";
	
	var junimo4 = new Image();
	junimo4.src = "photos/junimo/junimo4.png";
	
	var minute = document.getElementById("minute");
	var sekunde = document.getElementById("sekunde");
	var vs = 0;
	
	var points = 0;
	var tocke = document.getElementById("tocke");
	
	var minuteEnd = document.getElementById("minutes");
	var sekundeEnd = document.getElementById("seconds");
	var tockeEnd = document.getElementById("points");
	
	var minuteBest = document.getElementById("bestMinutes");
	var sekundeBest = document.getElementById("bestSeconds");
	
	var wc2 = document.getElementById("wc2");
	var wc3 = document.getElementById("wc3");
	var wc4 = document.getElementById("wc4");
	var wc5 = document.getElementById("wc5");
	
	
	var myTimer= setInterval( function(){
		if(start==true){
			++vs;
			sekunde.innerHTML = pad(vs % 60);
			minute.innerHTML = pad(parseInt(vs / 60));
			tocke.innerHTML = points;
			
			sekundeEnd.innerHTML = pad(vs % 60);
			minuteEnd.innerHTML = pad(parseInt(vs / 60));
			tockeEnd.innerHTML = points;
		}
		else{
			sekunde=0;
		}
	}, 1000);
	
	function pad(val){
		var valString = val + "";
		if(valString.length < 2){
			return "0" + valString;
		}
		else{
			return valString;
		}
	}
	
	function init(){

		ctx = $('#main')[0].getContext("2d");
		width = $("#main").width();
		height = $("#main").height();
		return setInterval(draw, 18);
	}
	
	/*za risanje zogice*/
	function circle(x, y, r) {		
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = "#2E78A6";
		ctx.fill();
	}
	
	/*za risanje ploscka*/
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fillStyle = "#2E78A6";
		ctx.fill();
	}
	
	/*brise sled zogice/canvas*/
	function clear() {
		ctx.clearRect(0, 0, height, width);
	}
	
	/*nastavi parametre za ploscek*/
	function initPaddle(){
		paddlex = width/2;
		paddley = 450;
		paddleh = 10;
		paddlew = 100;
	}
	
	function draw(){
		/*risanje zogice*/
		clear();
		circle(x, y, 15);
		
		/*risanje ploscka*/
		rect(paddlex, paddley, paddlew, paddleh);
		
		/*risanje opek*/
		for(var i=0; i<nrows; i++){
			for(var j=0; j<ncols; j++){
				if(bricks[i][j] == 1){
					ctx.drawImage(junimo1, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
				if(bricks[i][j] == 2){
					ctx.drawImage(junimo2, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
				if(bricks[i][j] == 3){
					ctx.drawImage(junimo3, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
				if(bricks[i][j] == 4){
					ctx.drawImage(junimo4, (j*(brickwidth + padding)) + padding,
					(i*(brickheight + padding)) + padding,
					brickwidth, brickheight);					
				}
			}			
		}
		
		rowheight = brickheight + padding;
		colwidth = brickwidth + padding;
		row = Math.floor(y/rowheight);
		col = Math.floor(x/colwidth);
		
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1){
				dy = -dy;
				bricks[row][col] = 0;				
				st--;
				points++;
				showwc();
		}
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2){
				dy = -dy;
				bricks[row][col] = 1;
				points = points+2;
				showwc();
		}
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 3){
				dy = -dy;
				bricks[row][col] = 2;
				poins = points+3;
				showwc();
		}
		if(y < nrows*rowheight && row >= 0 && col >= 0 && bricks[row][col] == 4){
				dy = -dy;
				bricks[row][col] = 3;
				points = points+4;
				showwc();
		}
		if(st==0){
			mainCanvas.setAttribute("hidden", "hidden");
			sideCanvas.setAttribute("hidden", "hidden");
			victory.removeAttribute("hidden");
			mainUI.setAttribute("hidden", "hidden");
			bestTime();
			clearInterval(myTimer);	
		}
			
		
		/*premikanje ploscice*/
		if(rightDown){
			if((paddlex+paddlew) < width){
				paddlex += 5;
			}
			else{
				paddlex = width-paddlew;
			}
		}
		else if(leftDown){
			if(paddlex>0){
				paddlex -=5;
			}
			else{
				paddlex=0;
			}
		}
		
		/*odbijanje zogice*/		
		if(x+dx > width-r || x+dx < r)
			dx = -dx;
		
		if(y+dy < r)
			dy = -dy;
		else if(y+dy > paddley-r){
			start=false;
			if(x > paddlex && x < paddlex+paddlew){
				dx = 8*((x-(paddlex+paddlew/2))/paddlew);
				dy = -dy;
				start=true;
			}
			else{		
				mainCanvas.setAttribute("hidden", "hidden");
				sideCanvas.setAttribute("hidden", "hidden");
				mainUI.setAttribute("hidden", "hidden");
				fail.removeAttribute("hidden");				
			}
		}

		/*za premikanje zogice*/
		x += dx;
		y += dy;

	}
	
	function bestTime(){	
		if(diff == 1){
			if(parseInt(minuteEnd.innerHTML) == 0 && parseInt(sekundeEnd.innerHTML) == 0){
				localStorage.setItem("seconds", sekundeEnd.innerHTML);
				localStorage.setItem("minutes", minuteEnd.innerHTML);
			}
			if(parseInt(minuteEnd.innerHTML) <= parseInt(localStorage.getItem("minutes")))
				if(parseInt(sekundeEnd.innerHTML) < parseInt(localStorage.getItem("seconds"))){
					localStorage.setItem("seconds", sekundeEnd.innerHTML);
					localStorage.setItem("minutes", minuteEnd.innerHTML);
				}
			sekundeBest.innerHTML = localStorage.getItem("seconds");
			minuteBest.innerHTML = localStorage.getItem("minutes");
		}		
		if(diff == 2){
			if(parseInt(minuteEnd.innerHTML) == 0 && parseInt(sekundeEnd.innerHTML) == 0){
				localStorage.setItem("secondsMedium", sekundeEnd.innerHTML);
				localStorage.setItem("minutesMedium", minuteEnd.innerHTML);
			}
			if(parseInt(minuteEnd.innerHTML) <= parseInt(localStorage.getItem("minutesMedium")))
				if(parseInt(sekundeEnd.innerHTML) < parseInt(localStorage.getItem("secondsMedium"))){
					localStorage.setItem("secondsMedium", sekundeEnd.innerHTML);
					localStorage.setItem("minutesMedium", minuteEnd.innerHTML);
				}
			sekundeBest.innerHTML = localStorage.getItem("secondsMedium");
			minuteBest.innerHTML = localStorage.getItem("minutesMedium");
		}
		if(diff == 3){
			if(parseInt(minuteEnd.innerHTML) == 0 && parseInt(sekundeEnd.innerHTML) == 0){
				localStorage.setItem("secondsHard", sekundeEnd.innerHTML);
				localStorage.setItem("minutesHard", minuteEnd.innerHTML);
			}
			if(parseInt(minuteEnd.innerHTML) <= parseInt(localStorage.getItem("minutesHard")))
				if(parseInt(sekundeEnd.innerHTML) < parseInt(localStorage.getItem("secondsHard"))){
					localStorage.setItem("secondsHard", sekundeEnd.innerHTML);
					localStorage.setItem("minutesHard", minuteEnd.innerHTML);
				}
			sekundeBest.innerHTML = localStorage.getItem("secondsHard");
			minuteBest.innerHTML = localStorage.getItem("minutesHard");
		}
		
	}
	
	/*nastavljanje leve in desne tipke*/
	function onKeyDown(evt){
		if(evt.keyCode == 39)
			rightDown = true;
		else if(evt.keyCode == 37)
			leftDown = true;
	}
	
	function onKeyUp(evt){
		if(evt.keyCode == 39)
			rightDown = false;
		else if(evt.keyCode == 37)
			leftDown = false;
	}
	
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	
	/*inicializacija opek v tabelo*/
	function initBricksEasy(){
		nrows = 3;
		ncols = 6;
		st=18;
		brickwidth = (width/ncols) - 1;
		brickheight = 80;
		padding = 1;
		bricks = new Array(nrows);
		
		for(var i=0; i<nrows; i++){
			bricks[i] = new Array(ncols);
			for(var j=0; j<ncols; j++){
				rng = Math.floor(Math.random()*3+1);
				bricks[i][j] = rng;
			}
		}
	}
	function initBricksMedium(){
		nrows = 4;
		ncols = 7;
		st=28;
		brickwidth = (width/ncols) - 1;
		brickheight = 60;
		padding = 1;
		bricks = new Array(nrows);
		
		for(var i=0; i<nrows; i++){
			bricks[i] = new Array(ncols);
			for(var j=0; j<ncols; j++){
				rng = Math.floor(Math.random()*4+1);
				bricks[i][j] = rng;
			}
		}
	}
	function initBricksHard(){
		nrows = 5;
		ncols = 9;
		st=45;
		brickwidth = (width/ncols) - 1;
		brickheight = 50;
		padding = 1;
		bricks = new Array(nrows);
		
		for(var i=0; i<nrows; i++){
			bricks[i] = new Array(ncols);
			for(var j=0; j<ncols; j++){
				rng = Math.floor(Math.random()*4+1);
				bricks[i][j] = rng;
			}
		}
	}
	
	function showwc(){
		if(points >= points1){
			wc2.style.transition = "opacity 2s"; 
			wc2.style.opacity = "1";
		}
		if(points >= points2){
			wc3.style.transition = "opacity 2s"; 
			wc3.style.opacity = "1";
		}
		if(points >= points3){
			wc4.style.transition = "opacity 2s"; 
			wc4.style.opacity = "1";
		}
		if(points >= points4){
			wc5.style.transition = "opacity 2s"; 
			wc5.style.opacity = "1";
		}
	}
	
	init();	
	
	initPaddle();
	
	if(diff == 1)
		initBricksEasy();
	if(diff == 2)
		initBricksMedium();
	if(diff == 3)
		initBricksHard();

}

var diff;
var points1;
var points2;
var points3;
var points4;

easyDiff.addEventListener('click', function() {
	diff = 1;
	points1 = 9;
	points2 = 18;
	points3 = 27;
	points4 = 32;
});

mediumDiff.addEventListener('click', function() {
	diff = 2;
	points1 = 20;
	points2 = 40;
	points3 = 60;
	points4 = 75;
});

hardDiff.addEventListener('click', function() {
	diff = 3;
	points1 = 25;
	points2 = 50;
	points3 = 75;
	points4 = 90;
});

start.addEventListener('click', function() {
	if(diff==1 || diff==2 || diff==3){
		let menu = document.getElementById("menu");
		let mainCanvas = document.getElementById("main");
		let sideCanvas = document.getElementById("side");
		let mainUI = document.getElementById("mainUI");
		let hidden = mainCanvas.getAttribute("hidden");

		if(!hidden) {
		   mainCanvas.removeAttribute("hidden");
		   sideCanvas.removeAttribute("hidden");
		   mainUI.removeAttribute("hidden");
		   menu.setAttribute("hidden", "hidden");
		   drawIt();
		} 
		else {
		   mainCanvas.setAttribute("hidden", "hidden");
		   sideCanvas.setAttribute("hidden", "hidden");
		   mainUI.setAttribute("hidden", "hidden");
		}
	}
});

question.addEventListener('click', function() {
	let menu = document.getElementById("menu");
	let tutorial = document.getElementById("tutorialScreen");
	let hidden = tutorial.getAttribute("hidden");
	
	if(!hidden){
		tutorial.removeAttribute("hidden");
		menu.setAttribute("hidden","hidden");
	}
	else{
		tutorial.setAttribute("hidden", "hidden");
	}
	
});

menu1.addEventListener('click', function() {
	location.reload();
});

menu2.addEventListener('click', function() {
	location.reload();
});

menu3.addEventListener('click', function() {
	location.reload();
});

returnUI.addEventListener('click', function() {
	location.reload();
});



/*active difficulty*/
var btns = document.getElementsByClassName("diff");

for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}



