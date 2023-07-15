	
	
	
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

