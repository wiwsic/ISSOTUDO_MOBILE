
function build_S02(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			end: PH_end };

	SKT.bg = loadImage( 'data02/desenho.png' );
	//SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
	SKT.bgx = width * .1 - (60);
	if (window.innerWidth <= 362) {
		console.log('362')
		SKT.bgx = width * .01 - (10);
	  } else if (window.innerWidth <= 390) {
		console.log('390')
		SKT.bgx = width * .1 - (10);
	  } else if (window.innerWidth <= 450){
		console.log('450')
		SKT.bgx = width * .1 - (60);
	  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
		console.log('560-760')
		SKT.bgx = width * .1 - (10);
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.bgx = width * .1 - (50);
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.bgx = width * .1 - (60);
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.bgx = width * .1 - (10);
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = width * .1 - (10);
	  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = width * .1 - (140);
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = width * .1 - (10);
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = width * .1 - (10);
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = width * .02 - (10);
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = width * .05 - (10);
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = width * .1 - (10);
	  }

	SKT.img = loadImage('data02/algodoes.png');
	loadStrings("data02/algodata.txt", build_S02_step1, failed );
}
function build_S02_step1( arr ){

	//SKT.Scl = VIEWPORT.h / 1312.0;
	SKT.Scl = VIEWPORT.h / 2200;

	SKT.N = arr.length;
	SKT.S = Array( SKT.N );
	for (var i = 0; i < SKT.N; i++) {	
		SKT.S[i] = new Stalk( arr[i], SKT.Scl, SKT.bgx );
	}

/* 	SKT.GX = SKT.bgx;
	SKT.GY = 163 * SKT.Scl;
	SKT.GW = 1 / (1055 * SKT.Scl * 0.2);
	SKT.GH = 1 / (657 * SKT.Scl * 0.25);
	SKT.GR = SKT.GX + 1055 * SKT.Scl;
	SKT.GB = SKT.GY + 657 * SKT.Scl; */

	// começo dos ajustes do wiw

	SKT.GX = SKT.bgx + (width * 0.1);
	SKT.GY = (163 * SKT.Scl) + (height * 0.25);
	SKT.GW = 1 / (1055 * SKT.Scl * 0.2);
	SKT.GH = 1 / (657 * SKT.Scl * 0.25);
	SKT.GR = SKT.GX + 1055 * SKT.Scl;
	SKT.GB = SKT.GY + 657 * SKT.Scl;

	// fim dos ajustes do wiw
	
	SKT.board_contact = Array(20);
	for( var i = 0; i < 20; ++i ){
		SKT.board_contact[i] = 0;
	}

	SKT.wind = createVector(0,0);
	SKT.wtet = 0;

	SKT.soundboard = Array(20);
	//for (var i = 0; i < 20; i++) {
	//	console.log('function build_S02_step'+(i+1)+'(){');
	//	console.log('\tSKT.soundboard['+i+'] = loadSound(\'data02/'+(i+1)+'.wav\', build_S02_step'+(i+2)+', failed );\n\tSKT.soundboard['+i+'].playMode(\'sustain\');\n}\n' );
	//}
	SKT.soundboard[0] = loadSound('data02/1.wav', build_S02_step2, failed );
	SKT.soundboard[0].playMode('sustain');
}
function build_S02_step2(){
	SKT.soundboard[1] = loadSound('data02/2.wav', build_S02_step3, failed );
	SKT.soundboard[1].playMode('sustain');
}
function build_S02_step3(){
	SKT.soundboard[2] = loadSound('data02/3.wav', build_S02_step4, failed );
	SKT.soundboard[2].playMode('sustain');
}
function build_S02_step4(){
	SKT.soundboard[3] = loadSound('data02/4.wav', build_S02_step5, failed );
	SKT.soundboard[3].playMode('sustain');
}
function build_S02_step5(){
	SKT.soundboard[4] = loadSound('data02/5.wav', build_S02_step6, failed );
	SKT.soundboard[4].playMode('sustain');
}
function build_S02_step6(){
	SKT.soundboard[5] = loadSound('data02/6.wav', build_S02_step7, failed );
	SKT.soundboard[5].playMode('sustain');
}
function build_S02_step7(){
	SKT.soundboard[6] = loadSound('data02/7.wav', build_S02_step8, failed );
	SKT.soundboard[6].playMode('sustain');
}
function build_S02_step8(){
	SKT.soundboard[7] = loadSound('data02/8.wav', build_S02_step9, failed );
	SKT.soundboard[7].playMode('sustain');
}
function build_S02_step9(){
	SKT.soundboard[8] = loadSound('data02/9.wav', build_S02_step10, failed );
	SKT.soundboard[8].playMode('sustain');
}
function build_S02_step10(){
	SKT.soundboard[9] = loadSound('data02/10.wav', build_S02_step11, failed );
	SKT.soundboard[9].playMode('sustain');
}
function build_S02_step11(){
	SKT.soundboard[10] = loadSound('data02/11.wav', build_S02_step12, failed );
	SKT.soundboard[10].playMode('sustain');
}
function build_S02_step12(){
	SKT.soundboard[11] = loadSound('data02/12.wav', build_S02_step13, failed );
	SKT.soundboard[11].playMode('sustain');
}
function build_S02_step13(){
	SKT.soundboard[12] = loadSound('data02/13.wav', build_S02_step14, failed );
	SKT.soundboard[12].playMode('sustain');
}
function build_S02_step14(){
	SKT.soundboard[13] = loadSound('data02/14.wav', build_S02_step15, failed );
	SKT.soundboard[13].playMode('sustain');
}
function build_S02_step15(){
	SKT.soundboard[14] = loadSound('data02/15.wav', build_S02_step16, failed );
	SKT.soundboard[14].playMode('sustain');
}
function build_S02_step16(){
	SKT.soundboard[15] = loadSound('data02/16.wav', build_S02_step17, failed );
	SKT.soundboard[15].playMode('sustain');
}
function build_S02_step17(){
	SKT.soundboard[16] = loadSound('data02/17.wav', build_S02_step18, failed );
	SKT.soundboard[16].playMode('sustain');
}
function build_S02_step18(){
	SKT.soundboard[17] = loadSound('data02/18.wav', build_S02_step19, failed );
	SKT.soundboard[17].playMode('sustain');
}
function build_S02_step19(){
	SKT.soundboard[18] = loadSound('data02/19.wav', build_S02_step20, failed );
	SKT.soundboard[18].playMode('sustain');
}
function build_S02_step20(){
	SKT.soundboard[19] = loadSound('data02/20.wav', build_S02_step21, failed );
	SKT.soundboard[19].playMode('sustain');
}
function build_S02_step21(){
	SKT.draw = S02_draw;
	SKT.mouseMoved = S02_mouseMoved;
	SKT.mouseDragged = S02_mouseDragged;
	SKT.end = S02_end;
	loop();
}

function S02_draw(){

	if( mouseX == pmouseX && mouseY == pmouseY ){
		if( mouseX > SKT.GX && mouseX < SKT.GR &&
			mouseY > SKT.GY && mouseY < SKT.GB ){
			let I = floor((mouseX-SKT.GX) * SKT.GW);
			let J = floor((mouseY-SKT.GY) * SKT.GH);
			SKT.board_contact[ I + 5*J ] += 2;
		}
	}

	for( var i = 0; i < 20; ++i ){
		if( SKT.board_contact[i] > 0 ){
			if( !(SKT.soundboard[i].isPlaying()) ) SKT.soundboard[i].play();
			if( SKT.board_contact[i] > 45 ) SKT.board_contact[i] = 45;
			SKT.board_contact[i] -= 1;
			if( SKT.board_contact[i] <= 0 ) SKT.soundboard[i].stop();
		}
	}

	clear();

	fill(255);
	noStroke();

	push();
	translate( SKT.bgx, 0 );
	scale( SKT.Scl );
	//image( SKT.bg, width * 0.4, height * 0.9 );
	if (window.innerWidth <= 600){
		image( SKT.bg, width * 0.4, height * 0.9 );
	} else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		image( SKT.bg, width * 0.2, height * 0.45 );
	} else if (window.innerWidth <= 1000){
		image( SKT.bg, width * 0.3, height * 0.7 );
	} else if (window.innerWidth <= 1100){
		image( SKT.bg, width * 0.15, height * 0.4 );
	} else if (window.innerWidth <= 1200){
		image( SKT.bg, width * 0.15, height * 0.4 );
	} else if (window.innerWidth <= 1300){
		image( SKT.bg, width * 0.15, height * 0.4 );
	}
	pop();

	/*
	let gw = 1055 * SKT.Scl * 0.2;
	let gh = 657 * SKT.Scl * 0.25;
	stroke(0);
	noFill();
	for( var i = 0; i < 5; ++i ){
		for( var j = 0; j < 4; ++j ){
			rect( SKT.GX + i * gw, SKT.GY + j * gh, gw, gh );
		}
	}*/

	SKT.wind.x = 0.3 * cos( SKT.wtet );
	SKT.wtet += 0.01;

	for( var i = 0; i < SKT.N; ++i ){
		SKT.S[i].move_anchored( SKT.wind );
		SKT.S[i].draw( SKT.img );
	}
}
function S02_mouseMoved(){
	let M = createVector( mouseX, mouseY );
	for( var i = 0; i < SKT.N; ++i ){
		let ds = p5.Vector.sub( SKT.S[i].V[2], M ).magSq();
		if( ds < 2500 ){
			if( ds < 250 ) ds = 250;
			SKT.S[i].move_anchored( createVector( movedX, movedY ).mult( 75/ds ) );
		}
	}

	if( mouseX > SKT.GX && mouseX < SKT.GR &&
		mouseY > SKT.GY && mouseY < SKT.GB ){
		let I = floor((mouseX-SKT.GX) * SKT.GW);
		let J = floor((mouseY-SKT.GY) * SKT.GH);
		SKT.board_contact[ I + 5*J ] += 2;
	}
}

function S02_mouseDragged(){
	let M = createVector( mouseX, mouseY );
	for( var i = 0; i < SKT.N; ++i ){
		let ds = p5.Vector.sub( SKT.S[i].V[2], M ).magSq();
		if( ds < 2500 ){
			if( ds < 250 ) ds = 250;
			SKT.S[i].move_anchored( createVector( movedX, movedY ).mult( 75/ds ) );
		}
	}

	if( mouseX > SKT.GX && mouseX < SKT.GR &&
		mouseY > SKT.GY && mouseY < SKT.GB ){
		let I = floor((mouseX-SKT.GX) * SKT.GW);
		let J = floor((mouseY-SKT.GY) * SKT.GH);
		SKT.board_contact[ I + 5*J ] += 2;
	}
}

function S02_end() {
	for (var i = 0; i < SKT.soundboard.length; i++ ){
		SKT.soundboard[i].stop();
	}
  }
