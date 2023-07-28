	
	
	
	  <div id="sketch-holder" style="width: 99vw; height: 98vh; position: absolute; z-index: 2;"></div>
	
	
	
	titulos = Array(22);
	titulos[0] = "Início"
	titulos[1] = "Pés de algodão-Descrição";
	titulos[2] = "Pés de algodão";
	titulos[3] = "Seres eletro-parixara no algodoeiro-Descrição";
	titulos[4] = "Seres eletro-parixara no algodoeiro";
	titulos[5] = "Arquivo algodão-Descrição";
	titulos[6] = "Arquivo algodão";
	titulos[7] = "Algodão canta ausências-Descrição";
	titulos[8] = "Algodão canta ausências";
	titulos[9] = "Kinharyd-rezado-Descrição";
	titulos[10] = "Kinharyd-rezado";
	titulos[11] = "Das ausências, mas sempre estivemos aqui-Descrição";
	titulos[12] = "Das ausências, mas sempre estivemos aqui";
	titulos[13] = "Tecer o fio-forte-Descrição";
	titulos[14] = "Tecer o fio-forte";
	titulos[15] = "Antes de eu morrê, já sabe-Descrição";
	titulos[16] = "Antes de eu morrê, já sabe";
	titulos[17] = "Anamnese no Arquivo Histórico da Bienal de S. Paulo-Descrição";
	titulos[18] = "Anamnese no Arquivo Histórico da Bienal de S. Paulo";
	titulos[19] = "O que é arquivo?-Descrição";
	titulos[20] = "O que é arquivo?";
	titulos[21] = "Ficha técnica";
	
	
	switch( INDEX ){
		case 0:
			SKT = new S00_SAGUAO();
			break;
		case 1:
			SKT = new S01DESCRICAO();
			break;
		case 2:
			build_S01();
			break;
		case 3:
			SKT = new S02DESCRICAO();
			break;
		case 4:
			build_S02();
			break;
		case 5:
			SKT = new S03DESCRICAO();
			break;
		case 6:
			build_S03();
			break;
		case 7:
			SKT = new S04DESCRICAO();
			break;
		case 8:
			build_S04();
			break;
		case 9:
			SKT = new S05DESCRICAO();
			break;
		case 10:
			build_S05();
			break;
		case 11:
			SKT = new S06DESCRICAO();
			break;
		case 12:
			build_S06();
			break;
		case 13:
			SKT = new S07DESCRICAO();
			break;
		case 14:
			build_S07();
			break;
		case 15:
			SKT = new S08DESCRICAO();
			break;
		case 16:
			build_S08();
			break;
		case 17:
			SKT = new S09DESCRICAO();
			break;
		case 18:
			build_S09();
			break;
		case 19:
			SKT = new S10DESCRICAO();
			break;
		case 20:
			build_S10();
			break;
		case 21:
			SKT = new S11_CREDITOS();
			break;
	}
	


////////////////////////////////////////////////////////////////////////////

class S01DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("NOSSA RELAÇÃO\nCOM A TERRA\nÉ DE FATO UMA BASE\nPARA PENSARMOS\nARQUIVO-INDÍGENA", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S02DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("E SE\nNOSSAS AUSÊNCIAS\nNÃO FOSSEM SINTOMAS?", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S03DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("E SE\nUM DE NOSSOS\nARQUIVOS-INÍGENAS\nSE INICIAR\nNUMA FLOR DE ALGODÃO?", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S04DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("E SE\nA FLOR\nESTE FIO-ARQUIVO-VIVO\nESTÁ NUM TEMPO HISTÓRICO\nNÃO-LINEAR?", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S05DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("E SE\nNOSSO FIO-ARQUIVO\nSE ORGANIZA\nNO TEMPO DAS RELAÇÕES\nSEMENTE-FLORESTA", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S06DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("E SE\nNOSSAS REDES DE SABERES\nSE UNEM PARA FAZER\nUM FIO-FORTE?", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S07DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("\"ISSO TUDO\nNÃO ME DIZ\nNADA.\"\nE SE\nTECERMOS NOSSOS\nCAMINHOS?", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S08DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, CENTER);
		textFont( DINcon, 50 );
		textLeading(50);
		text("UM FIO DE ALGODÃO,\nUM CANTO,\nUMA REDE DE DORMIR,\nUM GRAFISMO\nSÃO DOCUMENTOS\nHISTÓRICOS.\nARQUIVOS-VIVOS.", 100, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

//// NOTA MENTAL EU MEXI AQUI PARA TENTAR FAZER A PAGINA NAO PASSAR DE 2 em 2 no dia 12/07

function mouseReleased(){

	if( coordinates_in_rct( mouseX, mouseY, VIEWPORT ) ){
		SKT.mouseReleased();
	}
	else if( cashmeoutsy ){
		if( mouseY > VIEWPORT.h ){
			let pi = INDEX;
			INDEX = round( (mouseX - dootsx) / dootss );
			if( INDEX != pi && INDEX >= 0 && INDEX <= 21 ){
				load_skt();
			}
		}
		else{
			if( mouseX < VIEWPORT.x ){
				INDEX -= 1;
			}
			else INDEX += 1;

			INDEX = constrain( INDEX, 0, 21 );
			load_skt();
		}
	}
	cashmeoutsy = false;
}

//////////

function build_S01() {
	
	SKT = { P: null, Pl: null, D: -1, MH: [], mhi: 0, Wa: null, PE: {}, rct_serzinho: null, 
			sound_fio: null, sound_pemao: null, sound_serzinho: null, 
			contact_fio: 0, contact_pemao: 0, contact_serzinho: 0,
			draw: S01_draw, touchMoved: S01_touchMoved, touchStarted: S01_touchStarted, 
			touchEnded: S01_touchEnded,
			end: S01_end };

	SKT.bg = loadImage( 'data01/desenho.png' );
	//SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w; 
	SKT.bgx = width * .1 - (60);

	//console.log( 'launching 1st step' );
	loadStrings( 'data01/fio.txt', build_S01_step1, failed );
}

//sem alterações abaixo no step1, step2, step3, step4 e step5

function build_S01_step1( arr ){

	//console.log( 'step1: '+arr );

	SKT.P = Array( arr.length );
	for( var i = 0; i < arr.length; ++i ){
		let spl = split(arr[i], ',');
		let x = float( spl[0] ) - 42;
		let y = float( spl[1] );
		SKT.P[i] = createVector( x, y );
	}

	SKT.PEimg = loadImage( 'data01/pe.png', build_S01_step2, failed );
}

function build_S01_step2(){

	//console.log( 'step2');

	SKT.PEdat = loadStrings( 'data01/pe.txt', build_S01_step3, failed );
}

function build_S01_step3(){

	SKT.PE = new Rig( SKT.PEimg, SKT.PEdat, SKT.bgx );
	SKT.PEdat = null;

	SKT.MH = Array(3);
	for (var i = 0; i < 3; i++) {
		SKT.MH[i] = createVector(-1,-1);
	}
	SKT.mhi = 0;

	SKT.Scl = height / 711.5; //scaling down from the original svg

	for( var i = 0; i < SKT.P.length; ++i ){
		SKT.P[i].mult(SKT.Scl);
		SKT.P[i].x += SKT.bgx;
	}
	SKT.Pl = Array( SKT.P.length );
	SKT.Pl[0] = 0;
	for( var i = 1; i < SKT.P.length; ++i ){
			SKT.Pl[i] = SKT.P[i].dist( SKT.P[i-1] );
	}

	SKT.Wa = { V: Array(3), M: Array(3) };
	for( var i = 0; i < 3; ++i ){
		SKT.Wa.M[i] = map( i, 0, 2, 0.04, 0.1 );
		SKT.Wa.V[i] = random_vec( SKT.Wa.M[i] );
	}
	SKT.Wa.A = SKT.PE.V[3].copy();

	SKT.Scl = VIEWPORT.h / 1483.0;
	SKT.rct_serzinho = { x: SKT.bgx + 426 * SKT.Scl, y: 1229 * SKT.Scl, w:  192 * SKT.Scl, h:  199 * SKT.Scl };

	SKT.sound_fio = loadSound('data01/01-fio-de-algodao-2.wav', build_S01_step4, failed );
}

function build_S01_step4(){
	SKT.sound_pemao = loadSound('data01/02-pe-de-algodao1.wav', build_S01_step5, failed );
}
function build_S01_step5(){
	SKT.sound_serzinho = loadSound('data01/03-serzinho-em-baixo-3.wav', build_S01_step6, failed );
}

function build_S01_step6() {
	//console.log( 'step6' );

	SKT.sound_fio.playMode('sustain');
	SKT.sound_pemao.playMode('sustain');
	SKT.sound_serzinho.playMode('sustain');
	SKT.draw = S01_draw;
	SKT.touchMoved = S01_touchMoved;
	SKT.touchStarted = S01_touchStarted;
	SKT.touchEnded = S01_touchEnded;
	SKT.end = S01_end;
	imageMode(CORNER);
	loop();
}

function S01_draw() {
	if (touches.length === 0) {
	  if (p5.Vector.dist(SKT.PE.V[3], SKT.MH[SKT.mhi]) < 40) {
		SKT.contact_pemao += 1;
	  }
	  if (coordinates_in_rct(touchX, touchY, SKT.rct_serzinho)) {
		SKT.contact_serzinho += 1;
	  }
	} else {
	  if (SKT.contact_fio > 0) {
		if (!SKT.sound_fio.isPlaying()) SKT.sound_fio.play();
		if (SKT.contact_fio > 60) SKT.contact_fio = 60;
		SKT.contact_fio -= 1;
		if (SKT.contact_fio <= 0) SKT.sound_fio.stop();
	  }
	  if (SKT.contact_pemao > 0) {
		if (!SKT.sound_pemao.isPlaying()) SKT.sound_pemao.play();
		if (SKT.contact_pemao > 60) SKT.contact_pemao = 60;
		SKT.contact_pemao -= 1;
		if (SKT.contact_pemao <= 0) SKT.sound_pemao.stop();
	  }
	  if (SKT.contact_serzinho > 0) {
		if (!SKT.sound_serzinho.isPlaying()) SKT.sound_serzinho.play();
		if (SKT.contact_serzinho > 60) SKT.contact_serzinho = 60;
		SKT.contact_serzinho -= 1;
		if (SKT.contact_serzinho <= 0) SKT.sound_serzinho.stop();
	  }
	}
  
	clear();
  
	fill(255);
	noStroke();

	push();
	translate(SKT.bgx, 0);
	scale(SKT.Scl);
	image(SKT.bg, -100, 0);
	pop();
  
	stroke(255);
	strokeWeight(5);
	for (var i = 1; i < SKT.P.length; ++i) {
	  line(SKT.P[i].x, SKT.P[i].y, SKT.P[i - 1].x, SKT.P[i - 1].y);
	}
  
	let G = p5.Vector.sub(SKT.Wa.A, SKT.PE.V[3]).mult(0.00004);
	let R = createVector(0, 0);
	for (var i = 1; i < 3; ++i) {
	  R.add(SKT.Wa.V[i]);
	  SKT.Wa.V[i].add(G);
	  SKT.Wa.V[i].add(random_vec(0.003));
	  if (SKT.Wa.V[i].magSq() > sq(SKT.Wa.M[i])) {
		SKT.Wa.V[i].mult(SKT.Wa.M[i] / SKT.Wa.V[i].mag());
	  }
	}
	let head = p5.Vector.add(SKT.PE.V[3], R);
  
	SKT.PE.move_anchored(head);
	SKT.PE.draw();
  }
  
  function S01_touchMoved() {
	if (touches.length > 0) {
		SKT.MH[SKT.mhi].set(touchX, touchY);
		SKT.mhl = (SKT.mhi >= 2) ? 0 : SKT.mhi + 1;
		if (SKT.MH[SKT.mhl].x < 0) {
			SKT.MH[SKT.mhl].set(touchX - movedX, touchY - movedY);
		}

		let LsM = { A: SKT.MH[SKT.mhi], B: SKT.MH[SKT.mhl] };
		let LsF = { A: SKT.P[0], B: null };

		for (var i = 1; i < SKT.P.length; ++i) {
			LsF.B = SKT.P[i];
			if (intersect(LsM, LsF)) {
				let i0 = constrain(i - 5, 0, SKT.P.length - 1);
				for (var j = i0; j < i; j++) {
					SKT.P[j].x += map(j, i - 5, i, 0.1, 0.85) * movedX;
					SKT.P[j].y += map(j, i - 5, i, 0.1, 0.85) * movedY;
				}
				let i1 = constrain(i + 5, 0, SKT.P.length - 1);
				for (var j = i; j < i1; j++) {
					SKT.P[j].x += map(j, i, i + 5, 0.85, 0.1) * movedX;
					SKT.P[j].y += map(j, i, i + 5, 0.85, 0.1) * movedY;
				}
				drag_fio_vpl(SKT.P, SKT.Pl, i);
				SKT.contact_fio += 3;
				//break;
			}
			LsF.A = LsF.B;
		}

		LsF.A = SKT.PE.V[1];
		let clipped = 0;
		for (var i = 2; i < 4; ++i) {
			LsF.B = SKT.PE.V[i];
			if (intersect(LsM, LsF)) {
				SKT.Wa.V[2].x += 0.1 * movedX;
				SKT.Wa.V[2].y += 0.1 * movedY;
				clipped = 1;
				SKT.contact_pemao += 2;
			}
			LsF.A = LsF.B;
		}
		if (!clipped) {
			let d = p5.Vector.dist(SKT.PE.V[3], SKT.MH[SKT.mhi]);
			if (d < 40) {
				SKT.Wa.V[2].x += 0.02 * movedX;
				SKT.Wa.V[2].y += 0.02 * movedY;
				SKT.contact_pemao += 2;
			}
		}

		if (coordinates_in_rct(touchX, touchY, SKT.rct_serzinho)) {
			SKT.contact_serzinho += 2;
		}

		SKT.mhi += 1;
		if (SKT.mhi >= 3) SKT.mhi = 0;
	}
}
  
function S01_touchStarted() {
	let touchX = touches[0].x; // Coordenada X do primeiro toque
	let touchY = touches[0].y; // Coordenada Y do primeiro toque

	let M = createVector(touchX, touchY);
	for (var i = 0; i < SKT.P.length; ++i) {
		let dsq = p5.Vector.sub(SKT.P[i], M).magSq();
		if (dsq < 8) {
			SKT.D = i;
			break;
		}
	}
}
  
function S01_touchEnded() {
	SKT.D = -1;
}

function S01_end() {
	SKT.sound_fio.stop();
	SKT.sound_pemao.stop();
	SKT.sound_serzinho.stop();
}

//////


/////

// para controle, segue s03_draw antes das alterações:

function S03_draw(){

	let M = createVector( mouseX, mouseY );
	if( p5.Vector.dist( M, SKT.V[5] ) < 140 * SKT.Scl ){
		if( !(SKT.sound_pasta.isPlaying()) ){
			SKT.sound_pasta.loop();
		}
	}
	else{
		SKT.sound_pasta.pause();
	}
	if( p5.Vector.dist( M, SKT.V[6] ) < 200 * SKT.Scl ){
		if( !(SKT.sound_flor.isPlaying()) ){
			SKT.sound_flor.loop();
		}
	}
	else{
		SKT.sound_flor.pause();
	}

	if( p5.Vector.dist( M, SKT.V[3] ) < 140 * SKT.Scl ||
		p5.Vector.dist( M, SKT.V[4] ) < 140 * SKT.Scl ||
		p5.Vector.dist( M, SKT.V[7] ) < 230 * SKT.Scl ){
		if( !(SKT.sound_folhas.isPlaying()) ){
			SKT.sound_folhas.loop();
		}
	}
	else{
		SKT.sound_folhas.pause();
	}

	clear();

	//noFill();
	//stroke(255);
	//ellipse( SKT.V[5].x, SKT.V[5].y, 80, 80 );
	//ellipse( SKT.V[6].x, SKT.V[6].y, 80, 80 );

	fill(255);
	noStroke();
	

	SKT.wind = p5.Vector.lerp( SKT.wind, createVector( movedX, movedY ).mult(0.1), 0.1 );
	SKT.wind.x *= 0.99;
	SKT.wind.y *= 0.3;

	for( var i = 1; i < 8; ++i ){
		SKT.V[i].add( SKT.wind );
		SKT.V[i].add( SKT.normals[i] );
	}

	SKT.RV[1]= SKT.V[0].copy();
	SKT.RV[2]= SKT.V[0].copy();
	SKT.RV[3]= SKT.V[1].copy();
	SKT.RV[5]= SKT.V[2].copy();

	//top leaf root -> left branch
	SKT.RV[4] = maintain( SKT.V[1], SKT.V[0], SKT.bo[0] );
	//flower root -> right branch
	SKT.RV[6] = maintain( SKT.V[2], SKT.V[0], SKT.bo[1] );
	//right leaf root -> right branch
	SKT.RV[7] = maintain( SKT.V[2], SKT.V[0], SKT.bo[2] );


	propagate(  SKT.V[0], SKT.V[1], SKT.l[0] );
	propagate(  SKT.V[0], SKT.V[2], SKT.l[1] );
	propagate( SKT.RV[3], SKT.V[3], SKT.l[2] );
	propagate( SKT.RV[4], SKT.V[4], SKT.l[3] );
	propagate( SKT.RV[5], SKT.V[5], SKT.l[4] );
	propagate( SKT.RV[6], SKT.V[6], SKT.l[5] );
	propagate( SKT.RV[7], SKT.V[7], SKT.l[6] );

	for( var i = 0; i < 8; ++i ){
		push();
		if( SKT.RV[i] == null ){
			translate( SKT.V[i].x, SKT.V[i].y );
		}
		else{
			translate( SKT.RV[i].x, SKT.RV[i].y );
			rotate( atan2( SKT.V[i].y - SKT.RV[i].y, SKT.V[i].x - SKT.RV[i].x ) + SKT.da[i] );
		}

		image( SKT.img[i], -SKT.O[i].x, -SKT.O[i].y, SKT.td[i].w, SKT.td[i].h );
		pop();
		//noFill();
		//stroke(0);
		//ellipse( SKT.V[i].x, SKT.V[i].y, SKT.contact_rad );
	}
}

//s04 bkp

function S04_draw(){
	if( mouseX == pmouseX && mouseY == pmouseY ){
		let M = createVector( mouseX, mouseY );
		for (var i = 0; i < 4; i++) {
			let d = p5.Vector.dist( SKT.V[i], M );
			if( d < SKT.td[i].w * 0.5 ){
				SKT.contact[i] += 1;
				break;
			}
		}
	}


	for( var i = 0; i < 4; ++i ){
		if( SKT.contact[i] > 0 ){
			if( !(SKT.voices[i].isPlaying()) ) SKT.voices[i].play();
			if( SKT.contact[i] > 45 ) SKT.contact[i] = 45;
			SKT.contact[i] -= 1;
			if( SKT.contact[i] <= 0 ) SKT.voices[i].stop();
		}
	}

	clear();

	fill(255);
	noStroke();
	
	

	for (var i = 0; i < 4; i++) {

		let spring = p5.Vector.sub( SKT.A[i], SKT.V[i] ).mult(0.05);
		SKT.V[i].add( spring );

		image( SKT.img, SKT.V[i].x - SKT.O[i].x, SKT.V[i].y - SKT.O[i].y, SKT.td[i].w, SKT.td[i].h, 
					    SKT.src[i].x, SKT.src[i].y, SKT.src[i].w, SKT.src[i].h );
	}
}

//s03 bkp

function build_S03(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			end: PH_end };

	//SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
	SKT.bgx = width * .1 - (60);

	SKT.Scl = VIEWPORT.h / 1699.0;
	SKT.Sclx = VIEWPORT.w / 700.0;
	//SKT.Scl = VIEWPORT.h / 1199.0;

	SKT.dst = Array(8);
	SKT.dst[0] = { x: 280, y: 981, w: 228,  h: 193 }; //foot.png
	SKT.dst[1] = { x: 291, y: 108, w: 202,  h: 904 }; //left branch.png 
	SKT.dst[2] = { x: 321, y: 639, w: 322,  h: 344 }; //right branch.png
	SKT.dst[3] = { x: 188, y: 522, w: 126,  h: 204 }; //left leaf.png
	SKT.dst[4] = { x: 232, y: 247, w: 170,  h: 80  }; //top leaf.png
	SKT.dst[5] = { x: 350, y: 701, w: 227,  h: 167 }; //file folder.png 
	SKT.dst[6] = { x: 349, y: 367, w: 217,  h: 319 }; //flower.png      
	SKT.dst[7] = { x: 636, y: 540, w: 242,  h: 253 }; //right leaf.png  

	SKT.V = Array(8);
	SKT.V[0]= createVector( 322.102, 1008.18 ); //foot.png:         foot
	SKT.V[1]= createVector( 307.607, 705.403 ); //left branch.png:  left leaf root
	SKT.V[2]= createVector( 347.870, 850.349 ); //right branch.png: file root
	SKT.V[3]= createVector( 217.419, 560.457 ); //left leaf.png:    left leaf tip  
	SKT.V[4]= createVector( 265.734, 273.787 ); //top leaf.png:     top leaf tip
	SKT.V[5]= createVector( 452.553, 832.634 ); //file folder.png:  file tip
	SKT.V[6]= createVector( 457.385, 484.764 ); //flower.png:       flower tip
	SKT.V[7]= createVector( 752.108, 665.141 ); //right leaf.png:   right leaf tip


	var heightAdjustment = 220.5; // Valor de ajuste para diminuir a altura dos elementos

	// Ajuste das coordenadas y dos vetores
	for (var i = 0; i < 8; i++) {
	  SKT.dst[i].y += heightAdjustment;
	  SKT.V[i].y += heightAdjustment;
	}	

	SKT.RV = Array(8);
	SKT.RV[0]= null;//foot
	SKT.RV[1]= SKT.V[0].copy();//left branch
	SKT.RV[2]= SKT.V[0].copy();//right branch
	SKT.RV[3]= SKT.V[1].copy();//left leaf
	SKT.RV[4]= createVector( 401.017, 318.881 ); // top leaf root //top leaf
	SKT.RV[4].y += heightAdjustment
	SKT.RV[5]= SKT.V[2].copy();//file folder
	SKT.RV[6]= createVector( 426.785, 689.298 ); // flower root //flower
	SKT.RV[6].y += heightAdjustment
	SKT.RV[7]= createVector( 708.624, 557.236 ); // right leaf root//right leaf
	SKT.RV[7].y += heightAdjustment

	SKT.O = Array(8);
	SKT.da = Array(8);
	SKT.td = Array(8);
	for (var i = 0; i < 8; i++) {
		if( SKT.RV[i] == null ){
			SKT.O[i] = createVector( SKT.V[i].x - SKT.dst[i].x, SKT.V[i].y - SKT.dst[i].y ).mult(SKT.Scl);
		}
		else{
			SKT.O[i] = createVector( SKT.RV[i].x - SKT.dst[i].x, SKT.RV[i].y - SKT.dst[i].y ).mult(SKT.Scl);
			SKT.da[i] = -atan2( SKT.V[i].y - SKT.RV[i].y, SKT.V[i].x - SKT.RV[i].x);
			SKT.RV[i].mult(SKT.Scl);
		}
		SKT.td[i] = { w: SKT.dst[i].w * SKT.Scl, h: SKT.dst[i].h * SKT.Scl };
		SKT.V[i].mult(SKT.Scl);
		SKT.V[i].x += SKT.bgx;
		if( SKT.RV[i] != null ) SKT.RV[i].x += SKT.bgx;
	}

	SKT.bo = Array(3);
	SKT.bo[0] = p5.Vector.sub( SKT.RV[4], SKT.V[1] );
	SKT.bo[0].rotate( -atan2( SKT.V[1].y - SKT.V[0].y, SKT.V[1].x - SKT.V[0].x) );
	SKT.bo[1] = p5.Vector.sub( SKT.RV[6], SKT.V[2] );
	SKT.bo[1].rotate( -atan2( SKT.V[2].y - SKT.V[0].y, SKT.V[2].x - SKT.V[0].x) );
	SKT.bo[2] = p5.Vector.sub( SKT.RV[7], SKT.V[2] );
	SKT.bo[2].rotate( -atan2( SKT.V[2].y - SKT.V[0].y, SKT.V[2].x - SKT.V[0].x) );

	SKT.l = Array(7);
	SKT.l[0] = p5.Vector.dist(  SKT.V[0], SKT.V[1] );
	SKT.l[1] = p5.Vector.dist(  SKT.V[0], SKT.V[2] );
	SKT.l[2] = p5.Vector.dist( SKT.RV[3], SKT.V[3] );
	SKT.l[3] = p5.Vector.dist( SKT.RV[4], SKT.V[4] );
	SKT.l[4] = p5.Vector.dist( SKT.RV[5], SKT.V[5] );
	SKT.l[5] = p5.Vector.dist( SKT.RV[6], SKT.V[6] );
	SKT.l[6] = p5.Vector.dist( SKT.RV[7], SKT.V[7] );

	SKT.normals = Array(8);
	for( var i = 1; i < 8; ++i ){
		SKT.normals[i] = p5.Vector.sub( SKT.V[i], SKT.RV[i] ).mult(0.01);
	}

	SKT.wind = createVector(0,0);

	SKT.img = Array(8);
	SKT.img[0] = loadImage('data03/foot.png', build_S03_step1, failed );
}
function build_S03_step1(){
	SKT.img[1] = loadImage('data03/left branch.png', build_S03_step2, failed );
}
function build_S03_step2(){
	SKT.img[2] = loadImage('data03/right branch.png', build_S03_step3, failed );
}
function build_S03_step3(){
	SKT.img[3] = loadImage('data03/left leaf.png', build_S03_step4, failed );
}
function build_S03_step4(){
	SKT.img[4] = loadImage('data03/top leaf.png', build_S03_step5, failed );
}
function build_S03_step5(){
	SKT.img[5] = loadImage('data03/file folder.png', build_S03_step6, failed );
}
function build_S03_step6(){
	SKT.img[6] = loadImage('data03/flower.png', build_S03_step7, failed );
}
function build_S03_step7(){
	SKT.img[7] = loadImage('data03/right leaf.png', build_S03_step8, failed );
}
function build_S03_step8(){
	SKT.sound_pasta = loadSound( 'data03/01-arquivo-planta-1.wav', build_S03_step9, failed );
	SKT.sound_pasta.playMode('sustain');
}
function build_S03_step9(){
	SKT.sound_flor  = loadSound( 'data03/02-flor-do-algodao15.wav', build_S03_step10, failed );
	SKT.sound_flor.playMode('sustain');
}
function build_S03_step10(){
	SKT.sound_folhas = loadSound('data02/11.wav', build_S03_step11, failed );
	SKT.sound_folhas.playMode('sustain');
}
function build_S03_step11(){
	SKT.draw = S03_draw;
	loop();
}

let prevTouchX = 0;
let prevTouchY = 0;

function S03_draw(){

	let x = mouseX;
	let y = mouseY;
  
	if (touches.length > 0) {
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
	
		let touchVelX = x - prevTouchX;
		let touchVelY = y - prevTouchY;
		let touchVel = createVector(touchVelX, touchVelY);
		SKT.wind = touchVel.mult(0.08);
	
		prevTouchX = x;
		prevTouchY = y;
	  } else {
		SKT.wind = createVector(0, 0);
	  }
	
	let M = createVector(x, y);

	if( p5.Vector.dist( M, SKT.V[5] ) < 140 * SKT.Scl ){
		if( !(SKT.sound_pasta.isPlaying()) ){
			SKT.sound_pasta.loop();
		}
	}
	else{
		SKT.sound_pasta.pause();
	}
	if( p5.Vector.dist( M, SKT.V[6] ) < 200 * SKT.Scl ){
		if( !(SKT.sound_flor.isPlaying()) ){
			SKT.sound_flor.loop();
		}
	}
	else{
		SKT.sound_flor.pause();
	}

	if( p5.Vector.dist( M, SKT.V[3] ) < 140 * SKT.Scl ||
		p5.Vector.dist( M, SKT.V[4] ) < 140 * SKT.Scl ||
		p5.Vector.dist( M, SKT.V[7] ) < 230 * SKT.Scl ){
		if( !(SKT.sound_folhas.isPlaying()) ){
			SKT.sound_folhas.loop();
		}
	}
	else{
		SKT.sound_folhas.pause();
	}

	clear();

	//noFill();
	//stroke(255);
	//ellipse( SKT.V[5].x, SKT.V[5].y, 80, 80 );
	//ellipse( SKT.V[6].x, SKT.V[6].y, 80, 80 );

	fill(255);
	noStroke();
	

	//SKT.wind = p5.Vector.lerp( SKT.wind, createVector( movedX, movedY ).mult(0.1), 0.1 );
	//SKT.wind.x *= 0.99;
	//SKT.wind.y *= 0.3;


	for( var i = 1; i < 8; ++i ){
		SKT.V[i].add( SKT.wind );
		SKT.V[i].add( SKT.normals[i] );
	}

	SKT.RV[1]= SKT.V[0].copy();
	SKT.RV[2]= SKT.V[0].copy();
	SKT.RV[3]= SKT.V[1].copy();
	SKT.RV[5]= SKT.V[2].copy();

	//top leaf root -> left branch
	SKT.RV[4] = maintain( SKT.V[1], SKT.V[0], SKT.bo[0] );
	//flower root -> right branch
	SKT.RV[6] = maintain( SKT.V[2], SKT.V[0], SKT.bo[1] );
	//right leaf root -> right branch
	SKT.RV[7] = maintain( SKT.V[2], SKT.V[0], SKT.bo[2] );


	propagate(  SKT.V[0], SKT.V[1], SKT.l[0] );
	propagate(  SKT.V[0], SKT.V[2], SKT.l[1] );
	propagate( SKT.RV[3], SKT.V[3], SKT.l[2] );
	propagate( SKT.RV[4], SKT.V[4], SKT.l[3] );
	propagate( SKT.RV[5], SKT.V[5], SKT.l[4] );
	propagate( SKT.RV[6], SKT.V[6], SKT.l[5] );
	propagate( SKT.RV[7], SKT.V[7], SKT.l[6] );

	for( var i = 0; i < 8; ++i ){
		push();
		if( SKT.RV[i] == null ){
			translate( SKT.V[i].x, SKT.V[i].y );
		}
		else{
			translate( SKT.RV[i].x, SKT.RV[i].y );
			rotate( atan2( SKT.V[i].y - SKT.RV[i].y, SKT.V[i].x - SKT.RV[i].x ) + SKT.da[i] );
		}

		image( SKT.img[i], -SKT.O[i].x, -SKT.O[i].y, SKT.td[i].w, SKT.td[i].h );
		pop();
		//noFill();
		//stroke(0);
		//ellipse( SKT.V[i].x, SKT.V[i].y, SKT.contact_rad );
		
		//fill(0);
		//ellipse(width/2, height/2,400 * SKT.Scl)
	}
}

//// bkp draw

function draw() {

	SKT.draw();
	//background(200,0,110)
	if( INDEX > 0 ){
		fill(255);
		if( mouseX < VIEWPORT.x  ){
			noStroke();
			strokeWeight(3);
		}
		else noStroke();
		triangle( VIEWPORT.x, tritop, VIEWPORT.x, tribot, 0, trimid );
	}
	if( INDEX < 21 ){
		fill(255);
		if( mouseX > VIEWPORT.r ){
			noStroke();
			strokeWeight(3);
		}
		else noStroke();
		triangle( VIEWPORT.r, tritop, VIEWPORT.r, tribot, width, trimid );
	}

	push();
	stroke(255);
	strokeWeight(2);
	for( var i = 0; i <= 21; i ++ ){

		noFill();
		if( mouseY > VIEWPORT.h &&
				 mouseX > dootsx + ((i-0.5) * dootss) &&
				 mouseX < dootsx + ((i+0.5) * dootss) ){

			push();
			textFont( DINcon, 20 );
			fill(255);
			noStroke();
			textAlign( LEFT, BOTTOM );
			text( titulos[i], dootsx, VIEWPORT.h );
			pop();

			fill(180);
		}
		if( INDEX == i ){
			fill(255);
		}
		ellipse( dootsx + i *dootss, dootsy, dootsd );
	}
	pop();
}

mouse events bkp

function mouseMoved() {

	SKT.mouseMoved();
}

function mousePressed() {

	if( coordinates_in_rct( mouseX, mouseY, VIEWPORT ) ){
		SKT.mousePressed();
	}
	else{
		cashmeoutsy = true;
	}
}

function mouseDragged(){

	SKT.mouseDragged();
}

function mouseReleased(){

	if( coordinates_in_rct( mouseX, mouseY, VIEWPORT ) ){
		SKT.mouseReleased();
	}
	else if( cashmeoutsy ){
		if( mouseY > VIEWPORT.h ){
			let pi = INDEX;
			INDEX = round( (mouseX - dootsx) / dootss );
			if( INDEX != pi && INDEX >= 0 && INDEX <= 21 ){
				load_skt();
			}
		}
		else{
			if( mouseX < VIEWPORT.x ){
				INDEX -= 1;
			}
			else INDEX += 1;

			INDEX = constrain( INDEX, 0, 21 );
			load_skt();
		}
	}
	cashmeoutsy = false;
}

function keyReleased(){
	if (keyCode === LEFT_ARROW) {
		INDEX = constrain( INDEX - 1, 0, 21 );
		load_skt();
	}
	else if (keyCode === RIGHT_ARROW) {
		INDEX = constrain( INDEX + 1, 0, 21 );
		load_skt();
	}
	else if( keyCode === 36 ){//home
		INDEX = 0;
		load_skt();
	}
	else if(keyCode === 35){//end
		INDEX = 11;
		load_skt();
	}
}

function touchStarted() {

	SKT.mousePressed();

	if (INDEX > 0) {
		var leftTriangleX = 5; // Margem de 5 pixels do início da tela
		var leftTriangleY = height - 30;
		var triangleSize = 15;
		if (touches.length > 0) {
		  var touchX = touches[0].x; // Obter a coordenada x do primeiro toque
		  var touchY = touches[0].y; // Obter a coordenada y do primeiro toque
		  if (touchX >= leftTriangleX && touchX <= leftTriangleX + triangleSize &&
			  touchY >= leftTriangleY - triangleSize * 0.6 && touchY <= leftTriangleY + triangleSize * 0.6) {
			INDEX--;
			console.log(volta)
			load_skt();
			return; // Retorna para evitar que os dois triângulos sejam verificados ao mesmo tempo
		  }
		}
	  }
	
	  // Verificar o toque no triângulo direito (avançar para a direita)
	  if (INDEX < 21) {
		var rightTriangleX = width - 5; // Margem de 5 pixels do fim da tela
		var rightTriangleY = height - 30;
		var triangleSize = 15;
		if (touches.length > 0) {
		  var touchX = touches[0].x; // Obter a coordenada x do primeiro toque
		  var touchY = touches[0].y; // Obter a coordenada y do primeiro toque
		  if (touchX <= rightTriangleX && touchX >= rightTriangleX - triangleSize &&
			  touchY >= rightTriangleY - triangleSize * 0.6 && touchY <= rightTriangleY + triangleSize * 0.6) {
			INDEX++;
			console.log(avanca)
			load_skt();
		  }
		}
	  }
	
}

  
  function touchMoved() {
	SKT.mouseDragged();
  }

function touchEnded() {
	SKT.mouseReleased();
/* 	if (touches.length > 0) {
		SKT.mouseReleased();
		 if (cashmeoutsy) {
			if (touches[0].y > VIEWPORT.h) {
				let pi = INDEX;
				INDEX = round((touches[0].x - dootsx) / dootss);
				if (INDEX !== pi && INDEX >= 0 && INDEX <= 21) {
					load_skt();
				}
			} else {
				if (touches[0].x < VIEWPORT.x) {
					INDEX -= 1;
				} else INDEX += 1;

				INDEX = constrain(INDEX, 0, 21);
				load_skt();
			}
		}
		cashmeoutsy = false;
		
	} */
}

/////////////

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      touch-action: none;
    }
    
  </style>
  <script language="javascript" type="text/javascript" src="p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="p5.sound.js"></script>
  <script id="script-loader" language="javascript" type="text/javascript"></script>
</head>

<body text="#EEEEEE" link="#DDDDDD" vlink="#FFFFFF" bgcolor="#8a0d12">

  <div id="sketch-holder" style="width: 100vw; height: 100vh; position: absolute; z-index: 2;"></div>

  <script>
    var scriptLoader = document.getElementById('script-loader');
    var sketchHolder = document.getElementById('sketch-holder');

    if (window.matchMedia("(max-width: 600px)").matches) {
      sketchHolder.style.width = '100vw';
      sketchHolder.style.height = '100vh';
    } else {
      sketchHolder.style.width = '99vw';
      sketchHolder.style.height = '98vh';
    }

    if (window.matchMedia("(max-width: 600px)").matches) {
      // Dispositivo móvel
      scriptLoader.src = 'isso-mobile.js';
    } else {
      // Outros dispositivos
      scriptLoader.src = 'isso.js';
    }
  </script>

</body>
</html>



