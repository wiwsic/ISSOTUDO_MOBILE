let largura;
let altura;
let DIM;
let MValue;
let DEFAULT_SIZE = 100;


function propagate( adj, vec, l ){
	let dx = adj.x - vec.x;
	let dy = adj.y - vec.y;
	let angle = atan2(dy, dx);
	vec.x = adj.x - cos(angle) * l;
	vec.y = adj.y - sin(angle) * l;
}

function maintain( A, B, O ){
	let off = p5.Vector.rotate( O, atan2( A.y - B.y, A.x - B.x) );
	return p5.Vector.add( A, off );
}

function intersect( L0, L1 ){

    let s1x = L0.B.x - L0.A.x;   
    let s1y = L0.B.y - L0.A.y;
    let s2x = L1.B.x - L1.A.x;   
    let s2y = L1.B.y - L1.A.y;
    let s = (-s1y * (L0.A.x - L1.A.x) + s1x * (L0.A.y - L1.A.y)) / (-s2x * s1y + s1x * s2y);
    let t = ( s2x * (L0.A.y - L1.A.y) - s2y * (L0.A.x - L1.A.x)) / (-s2x * s1y + s1x * s2y);

    if ( (s >= 0 && s <= 1) && (t >= 0 && t <= 1) ){
        return true;
    }
    return false;
}

//variable P lengths, asks for Pl, an array of lengths
function drag_fio_vpl( P, Pl, I ){
	if( I < 0 || I >= P.length ) return;
	// propagate up
	for( var i = I+1; i < P.length; ++i ){
		propagate( P[i-1], P[i], Pl[i] );
	}
	// propagate down
	for( var i = I-1; i >= 0; --i ){
		propagate( P[i+1], P[i], Pl[i+1] );
	}
}

//single L value
function drag_fio_l( P, L, I ){
	if( I < 0 || I >= P.length ) return;
	// propagate up
	for( var i = I+1; i < P.length; ++i ){
		propagate( P[i-1], P[i], L );
	}
	// propagate down
	for( var i = I-1; i >= 0; --i ){
		propagate( P[i+1], P[i], L );
	}
}

function random_vec( maxmag ){
	let a = radians( random(1,360) );
	let m = random( 0, maxmag );
	return createVector( m*cos(a), m*sin(a) );
}

function coordinates_in_rct( x, y, R ){
	return ( x > R.x && x < R.x + R.w ) && ( y > R.y && y < R.y + R.h );
}

function succeeded(response) {
	console.log( 'SUCCEEDED!!! : ' + response );
}

function failed( response ){
	console.log( 'FAILED!!! : ' + response );
}

class Rig{
	img;
	N;
	td;//transformed dimensions
	R;// src rects
	V;// vectors on the rigging skelleton
	da;// default_angles
	O;// offets
	l;// lengths
	Va;//anchor
	constructor( image, dat, bgx ){

		this.img = image;

		let Scl = VIEWPORT.h / float(dat[0]); //scaling down from the image
		this.N = int(dat[1]);
		//console.log( 'this.N: '+this.N + ', dat: '+ dat );

		let minX = 999999;
		let minY = 999999;

		this.R = Array( this.N );
		for (var i = 0; i < this.N; i++) {
			let spl = split(dat[2+i], ',');
			this.R[i] = { x: int(spl[0]),  y: int(spl[1]), w: int(spl[2]), h: int(spl[3]) };
			if( this.R[i].x < minX ) minX = this.R[i].x;
			if( this.R[i].y < minY ) minY = this.R[i].y;
		}
		
		this.td = Array( this.N );
		for( var i = 0; i < this.N; ++i ){
			this.td[i] = { w: this.R[i].w * Scl, h: this.R[i].h * Scl };
		}

		this.V = Array( this.N+1 );
		for (var i = 0; i <= this.N; i++) {
			let spl = split(dat[2+this.N+i], ',');
			this.V[i] = createVector( float(spl[0]), float(spl[1]) );
		}

		//dat = null;

		this.O = Array( this.N );
		this.da = Array( this.N );
		for( var i = 0; i < this.N; ++i ){
			this.O[i] = createVector( this.V[i].x - this.R[i].x, this.V[i].y - this.R[i].y ).mult(Scl);
			this.da[i] = -atan2( this.V[i+1].y - this.V[i].y, this.V[i+1].x - this.V[i].x);
		}
		for (var i = 0; i < this.N+1; i++) {
			this.V[i].mult(Scl);
			this.V[i].x += bgx;
		}
		this.l= Array( this.N+1 );
		for( var i = 1; i < this.N+1; ++i ){
			this.l[i] = this.V[i].dist( this.V[i-1] );
		}
		for( var i = 0; i < this.N; ++i ){
			this.R[i].x -= minX;
			this.R[i].y -= minY;
		}
		this.Va = this.V[0];
	}

	move_anchored( head ){
		this.V[this.N] = head.copy();
		for( var i = this.N; i > 1; --i ){
			propagate( this.V[i], this.V[i-1], this.l[i] );
		}
		//this.V[0].x = this.Va.x;
		//this.V[0].y = this.Va.y;
		for( var i = 0; i < this.N; ++i ){
			propagate( this.V[i], this.V[i+1], this.l[i+1] );
		}
	}

	draw(){
		for( var i = 0; i < this.N; ++i ){

/* 			strokeWeight(2);
			stroke(0,0,255);
			line( this.V[i].x, this.V[i].y, this.V[i+1].x, this.V[i+1].y );

			noFill();

			    // Desenhar retângulo
				rect(this.R[i].x, this.R[i].y, this.R[i].w, this.R[i].h);
    
				// Desenhar elipse nas coordenadas do vetor
				ellipse(this.V[i].x, this.V[i].y, 10, 10);
 */
			push();
			translate( this.V[i].x, this.V[i].y );
			rotate( atan2( this.V[i+1].y - this.V[i].y, this.V[i+1].x - this.V[i].x) + this.da[i] );

			image( this.img, -this.O[i].x, -this.O[i].y, this.td[i].w, this.td[i].h, 
						   this.R[i].x, this.R[i].y, this.R[i].w, this.R[i].h );
			pop();
		}
	}
}

class Fio_Ancorado{

	constructor( root, origin ){
		this.root = root.copy();
		this.anchor = origin.copy();
		this.O = p5.Vector.sub( origin, root );
		this.P = Array(1);
		this.P[0] = origin.copy();
	}

	drag_tail( FL ){
		let lp = this.P.length-1;
		this.P[lp] = p5.Vector.add( this.root, this.O );
		for( var i = lp-1; i >= 0; --i ){
			propagate( this.P[i+1], this.P[i], FL );
		}
	}

	drag_head( V, FL, FLsq ){
		this.P[0] = V.copy();
		let lp = this.P.length-1;
		for( var i = 1; i <= lp; ++i ){
			propagate( this.P[i-1], this.P[i], FL );
		}
		while( p5.Vector.sub( this.P[ lp ], this.anchor ).magSq() > FLsq ){
			let a = atan2( this.anchor.y - this.P[ lp ].y, this.anchor.x - this.P[ lp ].x );
			this.P.push( createVector( this.P[ lp ].x + FL * cos(a), this.P[ lp ].y + FL * sin(a) ) );
			lp = this.P.length-1;
		}
	}

	drag_fio( I, FL ){
		if( I < 0 || I >= this.P.length ) return;
		// propagate up
		for( var i = I+1; i < this.P.length; ++i ){
			propagate( this.P[i-1], this.P[i], FL );
		}
		// propagate down
		for( var i = I-1; i >= 0; --i ){
			propagate( this.P[i+1], this.P[i], FL );
		}
	}

	draw(){
		for( var i = 1; i < this.P.length; ++i ){
			line( this.P[i].x, this.P[i].y, this.P[i-1].x, this.P[i-1].y );
		}
	}

}

class Stalk{
	src; //source rect
	V; //stalk vertices
	O; //offset
	td; //transformed dimensions
	constructor( str, Scl, bgx ) {
		let spl = split( str, ',');
		this.src = { x: int(spl[0]), y: int(spl[1]), w: int(spl[2]), h: int(spl[3]) };
		this.V = Array(3);
		this.h = map( this.src.y, 100, 700, 0.4, 2.0 ) * this.src.h * Scl * random(90,110) * 0.01;
		this.V[2] = createVector( this.src.x + (0.5 * this.src.w), this.src.y + this.src.h ).mult(Scl);
		this.V[1] = createVector( this.V[2].x, this.V[2].y + 0.333 * this.h );
		this.V[0] = createVector( this.V[2].x, this.V[2].y + this.h );
		this.V[2].x += bgx;
		this.V[1].x += bgx;
		this.V[0].x += bgx;
		// começo das alterações wiw
		this.V[2].x += width * 0.1;
		this.V[1].x += width * 0.1;
		this.V[0].x += width * 0.1;
		this.V[2].y += height * 0.25;
		this.V[1].y += height * 0.25;
		this.V[0].y += height * 0.25;
		// fim das alterações wiw
		this.O = createVector( 0.5 * this.src.w,  this.src.h ).mult(Scl);
		this.td = { w: this.src.w * Scl, h: this.src.h * Scl };
		this.src.y -= 163;
	}
	move_anchored( force ){
		//let f = force.copy().mult( (1.25 * noise( NS * this.V[0].x + nox, NS * this.V[0].y + noy )) -0.25 );
		this.V[2].add( force );
		//this.V[2].x += random(-10,10) * 0.008;
		this.V[2].y -= this.h * 0.02;//the "up" force
		propagate( this.V[2], this.V[1], 0.333 * this.h );
		propagate( this.V[0], this.V[1], 0.666 * this.h );
		propagate( this.V[1], this.V[2], 0.333 * this.h );

	}
	draw( img ){
		push();
		translate( this.V[2].x, this.V[2].y );
		rotate( atan2( this.V[1].y - this.V[2].y, this.V[1].x - this.V[2].x) - HALF_PI );

		image( img, -this.O.x, -this.O.y, this.td.w, this.td.h, 
					this.src.x, this.src.y, this.src.w, this.src.h );
		pop();

		stroke(255);
		//line( this.V[2].x, this.V[2].y, this.V[1].x, this.V[1].y );
		//line( this.V[1].x, this.V[1].y, this.V[0].x, this.V[0].y );
	}
}

class Bubble{

	constructor( x, y ){
		this.pos = createVector(x, y);
		this.vel = p5.Vector.sub( createVector(mouseX + random(-4, 4), mouseY + random(-4, 4)), this.pos );
		this.vel.setMag( random(2,2.5) );
		this.rad = random(20,70);
		this.S = 0.15;
	}

	draw( puff ){
		//g.ellipse( this.pos.x, this.pos.y, this.rad );
		push();
		translate(this.pos.x, this.pos.y);
		scale(this.S);
		image( puff, 0, 0 );
		pop();
		this.S += 0.0008;
		this.pos.add( this.vel );
		this.vel.y -= 0.02;
	}
}








var INDEX;
var SKT;
var VIEWPORT;
var first_click = 1;



//placeholders
function PH_draw(){
	clear();
	textAlign( CENTER, CENTER );
	textFont( DINcon, 15 );
	fill(255);
	noStroke();
	text( 'carregando...', cx, trimid );
}
function PH_mouseMoved(){}
function PH_mousePressed(){}
function PH_mouseDragged(){}
function PH_mouseReleased(){}
function PH_touchStarted(){}
function PH_touchMoved(){}
function PH_touchEnded(){}
function PH_end(){}



/* class S00_SAGUAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(CENTER, CENTER); // Alinha o texto à esquerda e no meio verticalmente
	  
		textFont(DINcon, 70);
		textLeading(64);
		text("\"ISSO TUDO\nNÃO ME DIZ\nNADA\"", width * 0.5, height * 0.5 - 220);
	  
		textFont(DINcon, 20);
		text("Cacique Aritana, 1975, na 13º Bienal de S. Paulo.", width * 0.5, height * 0.5 - 100);
		textAlign(LEFT, TOP);
		textFont(DINcon, 18);
		textLeading(18);
		text("Se ninguém conseguir manter viva a constelação de relações que um arquivo precisa para respirar, então ele é um arquivo-morto e que, se está nessa condição, o melhor é tratar como qualquer matéria morta e devolvê-la à terra.\n\nÀ terra retorno.\n\nA impermanência como ponto de encontro no Arquivo Histórico da Bienal de S. Paulo nos reúne para uma pesquisa sobre ausências. Eu, Gustavo Caboco Wapichana e Tipuici Manoki lançamos a publicação digital e impressa “ISSO TUDO NÃO ME DIZ NADA” no seminário \"Conversas com ausências\" no pavilhão da Bienal de São Paulo, em 2023.\n\nA obra-digital Ausências ou Sintomas? (2023), é publicada no site da Fundação Bienal e dialoga com esse contexto do Arquivo Histórico Wanda Svevo.\nMas afinal meus parentes, o que é arquivo?",
		10, height * 0.5 - 40, VIEWPORT.w * 1);
	  
		textAlign(CENTER, CENTER);
		textFont(DINcon, 15);
		text("Esta obra-digital inclui componentes de áudio e de interatividade com o toque.", width * 0.5, 20);
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
} */

class S00_SAGUAO {
	constructor() {
	  loop();
	}
  
	draw() {
	  clear();
	  fill(255);
	  noStroke();
  
	  // Proporções com base no tamanho original da tela

	  if (window.innerWidth <= 390) {
		console.log('390')
		var textFontSize = width * 0.08;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 450){
		console.log('450')
		var textFontSize = width * 0.10;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.48 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 560){
		console.log('560')
		var textFontSize = width * 0.08;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		var textFontSize = width * 0.10;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 700){
		console.log('700')
		var textFontSize = width * 0.08;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 800){
		console.log('800')
		var textFontSize = width * 0.08;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;
	  }
/* 	  var textFontSize = width * 0.10;
	  var textLeadingSize = textFontSize * 0.91;
	  var textPositionY = height * 0.5 - textFontSize * 2.2;
	  var textWidth = width * 0.869; */
  
	  textAlign(CENTER, CENTER);
	  textFont(DINcon, textFontSize * 2.1);
	  textLeading(textLeadingSize * 2.1);
	  text("\"ISSO TUDO\nNÃO ME DIZ\nNADA\"", width * 0.5, textPositionY * 0.6 );
  
	  textFont(DINcon, textFontSize * 0.55);
	  text("Cacique Aritana, 1975, na 13º Bienal de S. Paulo.", width * 0.5, textPositionY * 1.1);
  
	  textAlign(LEFT, TOP);
	  textFont(DINcon, textFontSize * 0.45);
	  textLeading(textFontSize * 0.45);
	  text(
		"Se ninguém conseguir manter viva a constelação de relações que um arquivo precisa para respirar, então ele é um arquivo-morto e que, se está nessa condição, o melhor é tratar como qualquer matéria morta e devolvê-la à terra.\n\nÀ terra retorno.\n\nA impermanência como ponto de encontro no Arquivo Histórico da Bienal de São Paulo nos reúne para uma pesquisa sobre ausências. Eu, Gustavo Caboco Wapichana e Tipuici Manoki lançamos a publicação digital e impressa “ISSO TUDO NÃO ME DIZ NADA” no seminário \"Conversas com ausências\" no Pavilhão da Bienal de São Paulo, em 2023.\n\nA obra-digital Ausências ou Sintomas? (2023), é publicada no site da Fundação Bienal e dialoga com esse contexto do Arquivo Histórico Wanda Svevo.\nMas afinal meus parentes, o que é arquivo?",
		10,
		textPositionY + textFontSize * 2,
		textWidth
	  );
  
	  textAlign(CENTER, CENTER);
	  textFont(DINcon, textFontSize * 0.38);
	  //text("Esta obra-digital inclui componentes de áudio e de interatividade com o toque.", width * 0.5, textFontSize * 0.5);
	}
  
	mouseMoved() {}
	mousePressed() {}
	mouseDragged() {}
	mouseReleased() {}
	end() {}
  }
  



//-----------------------------------------------------------------------------------------------------------

class S00AVISO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();

		var textFontSize = width * 0.05;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.3 );
		textLeading(textLeadingSize * 1.3);
		text("Esta obra-digital inclui componentes\nde áudio e de interatividade com o toque.", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

class S01DESCRICAO{

	constructor(){
		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();

		var textFontSize = width * 0.06;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.3 );
		textLeading(textLeadingSize * 1.3);
		text("NOSSA RELAÇÃO\nCOM A TERRA\nÉ DE FATO UMA BASE\nPARA PENSARMOS\nARQUIVO-INDÍGENA", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

function build_S01() {
	
	SKT = { P: null, Pl: null, D: 1, MH: [], mhi: 0, Wa: null, PE: {}, rct_serzinho: null, rct_pemao: null, 
			sound_fio: null, sound_pemao: null, sound_serzinho: null, 
			contact_fio: 0, contact_pemao: 0, contact_serzinho: 0,
			draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			end: PH_end };

	SKT.bg = loadImage( 'data01/desenho.png' );
	//SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		if (window.innerWidth <= 362 && window.innerHeight <= 610) {
		console.log('362-610')
		SKT.bgx = width * .01 - (10);
	  } else if (window.innerWidth <= 362) {
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
		SKT.bgx = width * .1;
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.bgx = width * .1 - (50);
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.bgx = width * .1 - (60);
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.bgx = width * .1 - (30);
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = width * .1 - (30);
	  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = width * .1 - (150);
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = width * .15 - (10);
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = width * .15 - (10);
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = width * .05 - (10);
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = width * .05 - (10);
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = width * .13 - (10);
	  }
	

	console.log( 'launching 1st step' );
	loadStrings( 'data01/fio.txt', build_S01_step1, failed );
}
function build_S01_step1( arr ){

	console.log( 'step1: '+arr );

	SKT.P = Array( arr.length );
	for( var i = 0; i < arr.length; ++i ){
		let spl = split(arr[i], ',');
		let x = float( spl[0] ) - 42;
		let y = float( spl[1] );
		SKT.P[i] = createVector( x, y );
	}

	console.log( 'launching 2st step' );
	SKT.PEimg = loadImage( 'data01/pe.png', build_S01_step2, failed );
}
function build_S01_step2(){

	console.log( 'step2');
	console.log( 'launching 3st step' );
	SKT.PEdat = loadStrings( 'data01/pe.txt', build_S01_step3, failed );

}
function build_S01_step3(){

	console.log( 'step3');

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
	SKT.rct_serzinho = { x: SKT.bgx + 326 * SKT.Scl, y: 1229 * SKT.Scl, w:  192 * SKT.Scl, h:  199 * SKT.Scl };
	SKT.rct_pemao = { x: SKT.bgx + 80 * SKT.Scl, y: 780 * SKT.Scl, w:  192 * SKT.Scl, h:  650 * SKT.Scl };
	//SKT.rct_serzinho = { x: SKT.bgx + 126 * SKT.Scl, y: 1229 * SKT.Scl, w:  192 * SKT.Scl, h:  199 * SKT.Scl };

	console.log( 'launching 4st step' );
	SKT.sound_fio = loadSound('data01/01-fio-de-algodao-2.wav', build_S01_step4, failed );
}
function build_S01_step4(){
	console.log( 'step4');
	console.log( 'launching 5st step' );
	SKT.sound_pemao = loadSound('data01/02-pe-de-algodao1.wav', build_S01_step5, failed );
}
function build_S01_step5(){
	console.log( 'step5');
	console.log( 'launching 6st step' );
	SKT.sound_serzinho = loadSound('data01/03-serzinho-em-baixo-3.wav', build_S01_step6, failed );
}
function build_S01_step6(){

	console.log( 'step6' );

	SKT.sound_fio.playMode('sustain');
	SKT.sound_pemao.playMode('sustain');
	SKT.sound_serzinho.playMode('sustain');
	SKT.draw = S01_draw;
	SKT.mouseMoved = S01_mouseMoved;
	SKT.mousePressed = S01_mousePressed;
    SKT.mouseDragged = S01_mouseDragged;
    SKT.mouseReleased = S01_mouseReleased;
    SKT.end = S01_end;
    imageMode(CORNER);
	loop();
}

function S01_draw(){

	let x = mouseX;
	let y = mouseY;
  
	if (touches.length > 0) {
	  x = touches[0].x;
	  y = touches[0].y;
	}

	if (coordinates_in_rct(x, y, SKT.rct_pemao)) {
		SKT.contact_pemao += 1;
	  }

	if (coordinates_in_rct(x, y, SKT.rct_serzinho)) {
	  SKT.contact_serzinho += 1;
	}

	if( SKT.contact_fio > 0 ){
		if( !(SKT.sound_fio.isPlaying()) ) SKT.sound_fio.play();
		if( SKT.contact_fio > 60 ) SKT.contact_fio = 60;
		SKT.contact_fio -= 1;
		if( SKT.contact_fio <= 0 ) SKT.sound_fio.stop();
	}
	if( SKT.contact_pemao > 0 ){
		if( !(SKT.sound_pemao.isPlaying()) ) SKT.sound_pemao.play();
		if( SKT.contact_pemao > 60 ) SKT.contact_pemao = 60;
		SKT.contact_pemao -= 1;
		if( SKT.contact_pemao <= 0 ) SKT.sound_pemao.stop();
	}
	if( SKT.contact_serzinho > 0 ){
		if( !(SKT.sound_serzinho.isPlaying()) ) SKT.sound_serzinho.play();
		if( SKT.contact_serzinho > 60 ) SKT.contact_serzinho = 60;
		SKT.contact_serzinho -= 1;
		if( SKT.contact_serzinho <= 0 ) SKT.sound_serzinho.stop();
	}

	clear();

	rectMode(CORNER);
/* 	fill(0)
	rect(SKT.rct_serzinho.x, SKT.rct_serzinho.y, SKT.rct_serzinho.w, SKT.rct_serzinho.h);
	rect(SKT.rct_pemao.x, SKT.rct_pemao.y, SKT.rct_pemao.w, SKT.rct_pemao.h); */


	fill(255);
	noStroke();

	push();
	translate( SKT.bgx, 0 );
	scale( SKT.Scl );
	image( SKT.bg, -100, 0 );
	pop();

	stroke(255);
	strokeWeight(5);
	
/* 	for( var i = 1; i < SKT.P.length; ++i ){
		line( SKT.P[i].x, SKT.P[i].y, SKT.P[i-1].x, SKT.P[i-1].y );
	} */

	beginShape();
	noFill();
	for (var i = 0; i < SKT.P.length; ++i) {
  		vertex(SKT.P[i].x, SKT.P[i].y);
	}
	endShape();	

	let G = p5.Vector.sub( SKT.Wa.A, SKT.PE.V[3] ).mult(0.00004);
	let R = createVector(0,0);
	for( var i = 1; i < 3; ++i ){
		R.add( SKT.Wa.V[i] );
		SKT.Wa.V[i].add( G );
		SKT.Wa.V[i].add( random_vec( 0.003 ) );
		if( SKT.Wa.V[i].magSq() > sq(SKT.Wa.M[i]) ){
			SKT.Wa.V[i].mult( SKT.Wa.M[i] / SKT.Wa.V[i].mag() );
		}
	}
	let head = p5.Vector.add( SKT.PE.V[3], R );

	SKT.PE.move_anchored( head );
	SKT.PE.draw();
}

function S01_mouseMoved() {
	let x = mouseX;
	let y = mouseY;
	console.log("mouse moved test")
	if (touches.length > 0) {
	  x = touches[0].x;
	  y = touches[0].y;
	 
	}
  
	SKT.MH[SKT.mhi].set(x, y);
	SKT.mhl = (SKT.mhi >= 2) ? 0 : SKT.mhi + 1;
	if (SKT.MH[SKT.mhl].x < 0) {
	  SKT.MH[SKT.mhl].set(x - mouseX, y - mouseY);
	}
  
	let LsM = { A: SKT.MH[SKT.mhi], B: SKT.MH[SKT.mhl] };
	let LsF = { A: SKT.P[0], B: null };
  
	for (var i = 1; i < SKT.P.length; ++i) {
	  LsF.B = SKT.P[i];
	  if (intersect(LsM, LsF)) {
		let i0 = constrain(i - 5, 0, SKT.P.length - 1);
		for (var j = i0; j < i; j++) {
		  SKT.P[j].x += map(j, i - 5, i, 0.1, 0.85) * (x - mouseX);
		  SKT.P[j].y += map(j, i - 5, i, 0.1, 0.85) * (y - mouseY);
		}
		let i1 = constrain(i + 5, 0, SKT.P.length - 1);
		for (var j = i; j < i1; j++) {
		  SKT.P[j].x += map(j, i, i + 5, 0.85, 0.1) * (x - mouseX);
		  SKT.P[j].y += map(j, i, i + 5, 0.85, 0.1) * (y - mouseY);
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
		SKT.Wa.V[2].x += 0.1 * (x - mouseX);
		SKT.Wa.V[2].y += 0.1 * (y - mouseY);
		clipped = 1;
		SKT.contact_pemao += 2;
	  }
	  LsF.A = LsF.B;
	}
	if (!clipped) {
	  let d = p5.Vector.dist(SKT.PE.V[3], SKT.MH[SKT.mhi]);
	  if (d < 40) {
		SKT.Wa.V[2].x += 0.02 * (x - mouseX);
		SKT.Wa.V[2].y += 0.02 * (y - mouseY);
		SKT.contact_pemao += 2;
	  }
	}
  
	if (coordinates_in_rct(x, y, SKT.rct_serzinho)) {
	  SKT.contact_serzinho += 2;
	}
  
	SKT.mhi += 1;
	if (SKT.mhi >= 3) SKT.mhi = 0;
  }
  
  function S01_mousePressed() {
	let x = mouseX;
	let y = mouseY;
  
	if (touches.length > 0) {
	  x = touches[0].x;
	  y = touches[0].y;
	  console.log("touch acionado e x e y alterados")
	}
  
	let M = createVector(x, y);
	for (var i = 0; i < SKT.P.length; ++i) {
	  let dsq = p5.Vector.sub(SKT.P[i], M).magSq();
	  if (dsq < 8) {
		SKT.D = i;
		break;
	  }
	}
  }
  
  function S01_mouseDragged() {
	let x = mouseX;
	let y = mouseY;
  
	if (touches.length > 0) {
	  x = touches[0].x;
	  y = touches[0].y;
	  console.log("touch arrastado e x e y alterados")
	}

	console.log("SKT.D:", SKT.D); // Verificar o valor de SKT.D
  
	if (SKT.D >= 0) {
	  SKT.P[SKT.D].x = x;
	  SKT.P[SKT.D].y = y;
	  drag_fio_vpl(SKT.P, SKT.Pl, SKT.D);
	  SKT.contact_fio += 3;
	}
	if (p5.Vector.dist(SKT.PE.V[3], SKT.MH[SKT.mhi]) < 40) {
	  SKT.contact_pemao += 1;
	}

	if (coordinates_in_rct(x, y, SKT.rct_pemao)) {
		SKT.contact_pemao += 1;
	  }

	if (coordinates_in_rct(x, y, SKT.rct_serzinho)) {
	  SKT.contact_serzinho += 1;
	}
  }
  
  function S01_mouseReleased() {
	//SKT.D = -1;
	console.log("touch removido")
  }
  
  function S01_end() {
	SKT.sound_fio.stop();
	SKT.sound_pemao.stop();
	SKT.sound_serzinho.stop();
  }
  



//-----------------------------------------------------------------------------------------------------------

class S02DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.06;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.1 );
		textLeading(textLeadingSize * 1.1);
		text("E SE\nNOSSAS AUSÊNCIAS\nNÃO FOSSEM SINTOMAS?", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}


function build_S02(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			end: PH_end };

	SKT.bg = loadImage( 'data02/desenho.png' );
	//SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
	SKT.bgx = width * .1 - (60);
	if (window.innerWidth <= 362 && window.innerHeight <= 610) {
		console.log('362-610')
		SKT.bgx = width * .01 - (10);
	  } else if (window.innerWidth <= 362) {
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

	//SKT.soundboard = Array(20);

	//for (var i = 0; i < 20; i++) {
	//	console.log('function build_S02_step'+(i+1)+'(){');
	//	console.log('\tSKT.soundboard['+i+'] = loadSound(\'data02/'+(i+1)+'.wav\', build_S02_step'+(i+2)+', failed );\n\tSKT.soundboard['+i+'].playMode(\'sustain\');\n}\n' );
	//}

	//antes
	//SKT.soundboard[0] = loadSound('data02/1.wav', build_S02_step2, failed );
	//SKT.soundboard[0].playMode('sustain');

	SKT.soundboard = [];
	for (let i = 0; i < 20; i++) {
        let sound = loadSound('data02/mp3/' + (i + 1) + '.mp3');
        sound.playMode('sustain');
        SKT.soundboard.push(sound);
    }

	build_S02_step21();

}

/* function build_S02_step2(){
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
} */

function build_S02_step21(){
	SKT.draw = S02_draw;
	SKT.mouseMoved = S02_mouseMoved;
	SKT.mouseDragged = S02_mouseDragged;
	SKT.end = S02_end;
	loop();
}

function S02_draw(){
	//ellipse(width/2,height/2,100)
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





//-----------------------------------------------------------------------------------------------------------

class S03DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.06;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.1 );
		textLeading(textLeadingSize * 1.1);
		text("E SE\nUM DE NOSSOS\nARQUIVOS-INDÍGENAS\nSE INICIAR\nNUMA FLOR DE ALGODÃO?", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}


function build_S03(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			end: PH_end };

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
		SKT.bgx = width * .25 - (60);
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = width * .25 - (60);
	  }  else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = width * .05 - (60);
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = width * .25 - (60);
	  }  else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = width * .25 - (60);
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = width * .15 - (60);
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = width * .15 - (60);
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = width * .15 - (60);
	  }

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
	SKT.end = S03_end;
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

function S03_end() {
	SKT.sound_pasta.stop();
	SKT.sound_flor.stop();
	SKT.sound_folhas.stop();
  }



//-----------------------------------------------------------------------------------------------------------

class S04DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 0.9 );
		textLeading(textLeadingSize * 0.9);
		text("E SE\nA FLOR\nESTE FIO-ARQUIVO-VIVO\nESTÁ NUM TEMPO HISTÓRICO\nNÃO-LINEAR?", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

function build_S04(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			end: PH_end };

	SKT.img = loadImage( 'data04/desenho.png' );
	//SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
	SKT.bgx = width * .1 - (0);

	SKT.Scl = VIEWPORT.h / 1580.0;
	var heightAdjustment = 50

	SKT.src = Array(4);
/* 	SKT.src[0] = { x: 251, y: 28, w: 210, h: 213 };
	SKT.src[1] = { x: 221, y: 324, w: 321, h: 236 };
	SKT.src[2] = { x: 195, y: 681, w: 303, h: 243 };
	SKT.src[3] = { x: 172, y: 1009, w: 396, h: 354 }; */
	SKT.src[0] = { x: 251, y: 28, w: 210, h: 213 };
	SKT.src[1] = { x: 221, y: 324, w: 321, h: 236 };
	SKT.src[2] = { x: 195, y: 681, w: 303, h: 243 };
	SKT.src[3] = { x: 172, y: 1009, w: 396, h: 354 };

	SKT.A = Array(4);
	SKT.V = Array(4);
	SKT.O = Array(4);
	SKT.td = Array(4);
	SKT.contact = Array(4);		
	/* for (var i = 0; i < 4; i++) {
		SKT.O[i] = createVector( 0.5 * SKT.src[i].w, 0.5 * SKT.src[i].h ).mult(SKT.Scl);
		SKT.V[i] = createVector( (SKT.Scl * SKT.src[i].x) + SKT.O[i].x + SKT.bgx,
							     (SKT.Scl * SKT.src[i].y) + SKT.O[i].y + heightAdjustment);
		SKT.A[i] = SKT.V[i].copy();
		SKT.td[i] = { w: SKT.Scl * SKT.src[i].w, h: SKT.Scl * SKT.src[i].h };
		SKT.contact[i] = 0;
	} */

	for (var i = 0; i < 4; i++) {
		SKT.O[i] = createVector( 0.5 * SKT.src[i].w, 0.5 * SKT.src[i].h ).mult(SKT.Scl);
		SKT.V[i] = createVector( width/2,
							     (SKT.Scl * SKT.src[i].y) + SKT.O[i].y + heightAdjustment);
		SKT.A[i] = SKT.V[i].copy();
		SKT.td[i] = { w: SKT.Scl * SKT.src[i].w, h: SKT.Scl * SKT.src[i].h };
		SKT.contact[i] = 0;
	}

	SKT.voices = Array(4);
	SKT.voices[0] = loadSound('data04/1.wav', build_S04_step2, failed );
	SKT.voices[0].playMode('sustain');
}
function build_S04_step2(){
	SKT.voices[1] = loadSound('data04/2.wav', build_S04_step3, failed );
	SKT.voices[1].playMode('sustain');
}
function build_S04_step3(){
	SKT.voices[2] = loadSound('data04/3.wav', build_S04_step4, failed );
	SKT.voices[2].playMode('sustain');
}
function build_S04_step4(){
	SKT.voices[3] = loadSound('data04/4.wav', build_S04_step5, failed );
	SKT.voices[3].playMode('sustain');
}
function build_S04_step5(){
	SKT.draw = S04_draw;
	SKT.mouseMoved = S04_mouseMoved;
	SKT.end = S04_end;
	loop();
}

function S04_draw() {
	let x = mouseX;
	let y = mouseY;

	if (touches.length > 0) {
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
	}

	let M = createVector(x, y);
/* 	for (let i = 0; i < 4; i++) {
		let d = p5.Vector.dist(SKT.V[i], M);
		if (d < SKT.td[i].w * 0.5) {
			SKT.contact[i] += 1;
			break;
		}
	} */

	for (let i = 0; i < 4; i++) {
		let d = p5.Vector.dist(SKT.V[i], M);
		if (d < SKT.td[i].w * 0.5) {
			SKT.V[i].x -= 0.12 * (SKT.V[i].x - x);
			SKT.V[i].y -= 0.12 * (SKT.V[i].y - y);
			SKT.contact[i] += 2;
			break;
		}
	}

	for (let i = 0; i < 4; ++i) {
		if (SKT.contact[i] > 0) {
			if (!SKT.voices[i].isPlaying()) SKT.voices[i].play();
			if (SKT.contact[i] > 45) SKT.contact[i] = 45;
			SKT.contact[i] -= 1;
			if (SKT.contact[i] <= 0) SKT.voices[i].stop();
		}
	}

	clear();

	fill(255);
	noStroke();

	for (let i = 0; i < 4; i++) {
		let spring = p5.Vector.sub(SKT.A[i], SKT.V[i]).mult(0.05);
		SKT.V[i].add(spring);

		image(
			SKT.img,
			SKT.V[i].x - SKT.O[i].x,
			SKT.V[i].y - SKT.O[i].y,
			SKT.td[i].w,
			SKT.td[i].h,
			SKT.src[i].x,
			SKT.src[i].y,
			SKT.src[i].w,
			SKT.src[i].h
		);
	}
	//fill(0);
	//ellipse(width/2, height/2,400 * SKT.Scl)
}
function S04_mouseMoved(){
	let M = createVector( mouseX, mouseY );
	for (var i = 0; i < 4; i++) {
		let d = p5.Vector.dist( SKT.V[i], M );
		if( d < SKT.td[i].w * 0.5 ){
			SKT.V[i].x -= 0.12 * movedX;
			SKT.V[i].y -= 0.12 * movedY;
			SKT.contact[i] += 2;
		}
	}
}

function S04_end() {
	for (var i = 0; i < SKT.voices.length; i++){
		SKT.voices[i].stop();
	}
  }






//-----------------------------------------------------------------------------------------------------------


class S05DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.1 );
		textLeading(textLeadingSize * 1.1);
		text("E SE\nNOSSO FIO-ARQUIVO\nSE ORGANIZA\nNO TEMPO DAS RELAÇÕES\nSEMENTE-FLORESTA?", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	touchMoved(){}
	end(){}
}


function build_S05(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			touchMoved: PH_touchMoved, touchEnded: PH_touchEnded,
			end: PH_end };

	//SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
	SKT.bgx = 0 + (width * 0.1);
	//SKT.bgy = 0.2 * VIEWPORT.h;

	SKT.bgx = width/2;
	if (window.innerWidth <= 362) {
		console.log('362')
		SKT.bgx = 0 + (width * 0.10);
	  } else if (window.innerWidth <= 390) {
		console.log('390')
		SKT.bgx = 0 + (width * 0.15);
	  } else if (window.innerWidth <= 450){
		console.log('450')
		SKT.bgx = 0 + (width * 0.1);
	  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
		console.log('560-760')
		SKT.bgx = 0 + (width * 0.2);
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.bgx = 0 + (width * 0.12);
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.bgx = 0 + (width * 0.12);
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.bgx = 0 + (width * 0.15);
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = 0 + (width * 0.18);
	  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = 0 + (width * 0.05);
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = 0 + (width * 0.21);
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = 0 + (width * 0.21);
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = 0 + (width * 0.15);
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = 0 + (width * 0.15);
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = 0 + (width * 0.21);
	  }


	SKT.bgy = height/4 + height/8;

	//SKT.Scl = VIEWPORT.h / (1.68 * 682.0);
	SKT.Scl = VIEWPORT.h / (1.68 * 1000.0);

	SKT.img = loadImage('data05/desenho--05.png');
	SKT.puff = loadImage('data05/puff.png');

	frameRate(24);
	
	//SKT.rct = { x: (267 * SKT.Scl) + SKT.bgx, y: (185 * SKT.Scl) + SKT.bgy, w: 241 * SKT.Scl, h: 344 * SKT.Scl };
	SKT.rct = { x: VIEWPORT.x -35, y: VIEWPORT.y -35, w: VIEWPORT.w +70, h: VIEWPORT.h +70 };
	SKT.src = createVector( 382, 322 ).mult(SKT.Scl);
	SKT.src.x += SKT.bgx;
	SKT.src.y += SKT.bgy;
	SKT.B = [];

	SKT.breathe = false;

	SKT.bounds = { x: VIEWPORT.x -35, y: VIEWPORT.y -35, w: VIEWPORT.w +70, h: VIEWPORT.h +70 };

	//SKT.veia_rezando = loadSound('data05/01-veia-rezando-18.wav', build_S05_step, failed );
	SKT.veia_rezando = loadSound('data05/mp3/01-veia-rezando-18.mp3', build_S05_step, failed );
	SKT.veia_rezando.playMode('sustain');
}

function build_S05_step(){

	SKT.veia_rezando.loop();
	SKT.draw = S05_draw;
	//SKT.mouseMoved = S05_mouseMoved;
	SKT.touchMoved = S05_touchMoved;
	SKT.touchEnded = S05_touchEnded;
	SKT.end = S05_end;
	loop();
}

function S05_draw(){

	clear();

	fill(255);
	noStroke();
	
	push();
	imageMode(CORNER);
	translate( SKT.bgx, SKT.bgy );
	scale( SKT.Scl);
	image( SKT.img, 0, 0 );
	pop();
	
	//rectMode(CENTER)
	//rect(SKT.rct.x, SKT.rct.y, SKT.rct.w, SKT.rct.h);

	if( SKT.breathe ){
		let n = random(2,4);
		for (var i = 0; i < n; i++) {
			SKT.B.push( new Bubble( SKT.src.x, SKT.src.y ) );
		}
	}
	
	imageMode(CENTER);
	for (var i = SKT.B.length-1; i >= 0; i--){
		SKT.B[i].draw( SKT.puff );
		if( !coordinates_in_rct( SKT.B[i].pos.x, SKT.B[i].pos.y, SKT.bounds) ){
			SKT.B.splice(i, 1);
		}
	}
}

/* function S05_mouseMoved(){

	x = mouseX;
	x = mouseY;

	if (touches.length > 0) {
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
	}

	if( coordinates_in_rct( mouseX, mouseY, SKT.rct ) ){
		SKT.breathe = true;
	}
	else SKT.breathe = false;
} */

function S05_touchMoved(){


	if (touches.length > 0) {
		console.log('s05 toque iniciado')
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
		if( coordinates_in_rct( x, y, SKT.rct ) ){
		SKT.breathe = true;
	}
	else SKT.breathe = false;
	}

}

function S05_touchEnded() {
	SKT.breathe = false;
  }

function S05_end(){
	SKT.veia_rezando.stop();
}






//-----------------------------------------------------------------------------------------------------------

class S06DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 0.9 );
		textLeading(textLeadingSize * 0.9);
		text("E SE\nNOSSAS REDES DE SABERES\nSE UNEM PARA FAZER\nUM FIO-FORTE?", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

function build_S06(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			touchMoved: PH_touchMoved, touchEnded: PH_touchEnded,
			end: PH_end };

	SKT.img = loadImage('data06/desenho--06.png');
	SKT.bg = loadImage('data06/bg.png');

	SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
	SKT.bgy = VIEWPORT.y + 0.1 * VIEWPORT.h;
	SKT.Scl = VIEWPORT.h / (1.1 * 1221.0);

	if (window.innerWidth <= 362) {
		console.log('362')
		SKT.bgx = 0 + (width * 0.1);
		SKT.Scl = VIEWPORT.h / (1.1 * 1221.0);
	  } else if (window.innerWidth <= 390) {
		console.log('390')
		SKT.bgx = 0 + (width * 0.15);
		SKT.Scl = VIEWPORT.h / (1.1 * 1221.0);

	  } else if (window.innerWidth <= 450){
		console.log('450')
		SKT.bgx = 0 + (width * 0.1);
		SKT.Scl = VIEWPORT.h / (1.1 * 1221.0);
	  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
		console.log('560-760')
		SKT.bgx = 0 + (width * 0.2);
		SKT.Scl = VIEWPORT.h / (1.1 * 1221.0);
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.bgx = 0 + (width * 0.1);
		SKT.Scl = VIEWPORT.h / (1.1 * 1221.0);
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.bgx = 0 + (width * 0.12);
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.bgx = 0 + (width * 0.21);
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = 0 + (width * 0.21);
	  }  else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = 0 + (width * 0.1);
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = 0 + (width * 0.21);
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = 0 + (width * 0.21);
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = 0 + (width * 0.15);
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = 0 + (width * 0.15);
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = 0 + (width * 0.21);
	  }

	

	SKT.srcs = Array(7);
	SKT.srcs[0] = { x: 182, y: 0,   w: 151, h: 171 };
	SKT.srcs[1] = { x: 436, y: 143, w: 173, h: 145 };
	SKT.srcs[2] = { x: 0,   y: 226, w: 185, h: 154 };
	SKT.srcs[3] = { x: 375, y: 478, w: 169, h: 126 };
	SKT.srcs[4] = { x: 70,  y: 572, w: 153, h: 159 };
	SKT.srcs[5] = { x: 358, y: 661, w: 168, h: 172 };
	SKT.srcs[6] = { x: 135, y: 816, w: 153, h: 230 };

	SKT.dsts = Array(7);
	SKT.contact_cabecas = Array(7);
	for( var i = 0; i < 7; ++i ){
		SKT.dsts[i] = { x: SKT.srcs[i].x * SKT.Scl + SKT.bgx, y: SKT.srcs[i].y * SKT.Scl + SKT.bgy, 
						w: SKT.srcs[i].w * SKT.Scl,           h: SKT.srcs[i].h * SKT.Scl };
		SKT.contact_cabecas[i] = 0;
	}

	let V = Array(7);
	V[0] = createVector( 296.694, 101.653 ).mult(SKT.Scl);
	V[1] = createVector( 471.074, 195.868 ).mult(SKT.Scl);
	V[2] = createVector( 139.669, 294.215 ).mult(SKT.Scl);
	V[3] = createVector( 425.62,  503.306 ).mult(SKT.Scl);
	V[4] = createVector( 182.684, 627.592 ).mult(SKT.Scl);
	V[5] = createVector( 396.158, 728.685 ).mult(SKT.Scl);
	V[6] = createVector( 269.408, 869.803 ).mult(SKT.Scl);
	for( var i = 0; i < 7; ++i ){
		V[i].x += SKT.bgx;
		V[i].y += SKT.bgy;
	}

	var total_len = 0;
	for( var i = 0; i < 6; ++i ){
		total_len += p5.Vector.dist( V[i], V[i+1] );
	}
	SKT.L = 8.0;
	var pn = floor(total_len / SKT.L)+4;
	SKT.P = [];//Array(pn);
	SKT.hooks = Array(7);
	SKT.anchors = Array(7);
	SKT.anchorsBoca = Array(7);
	SKT.O = Array(7);
	let c = 0;
	for( var i = 0; i < 6; ++i ){
		SKT.P.push( V[i].copy() );//SKT.P[c] = V[i];
		SKT.hooks[i] = c;
		SKT.anchors[i] = SKT.P[c].copy();//createVector( dsts[i].x, dsts[i].y );
		SKT.O[i] = createVector( SKT.dsts[i].x - SKT.P[c].x, SKT.dsts[i].y - SKT.P[c].y );
		c += 1;
		let len = p5.Vector.dist( V[i], V[i+1] );
		let n = floor(len / SKT.L);
		let alpha = atan2( V[i+1].y - V[i].y, V[i+1].x - V[i].x );
		let delta = createVector( SKT.L * cos(alpha), SKT.L * sin(alpha) );
		for( var j = 0; j < n; ++j ){
			SKT.P.push( p5.Vector.add( SKT.P[c-1], delta ) );
			c += 1;
		}
	}
	//console.log( pn, c );
	SKT.hooks[6] = c-1;
	SKT.anchors[6] = SKT.P[c-1].copy();

	// adicionar for loop que vai copiar a pos das ancoras

	for( var i = 0; i < 6; ++i ){
	SKT.anchorsBoca[i] = SKT.anchors[i].copy();
	}
	SKT.anchorsBoca[6] = SKT.P[c-1].copy();

	//




	SKT.O[6] = createVector( SKT.dsts[6].x - SKT.P[c-1].x, SKT.dsts[6].y - SKT.P[c-1].y );

	SKT.force = createVector( 3, 0 );

	SKT.sound_fio = loadSound('data06/01-fio-de-algodao-2.wav', build_S06_step1, failed );
	SKT.sound_fio.playMode('sustain');
	SKT.sound_cabecas = Array(7);
}
function build_S06_step1( arr ){
	SKT.sound_cabecas[0] = loadSound('data06/1.wav', build_S06_step2, failed );
	SKT.sound_cabecas[0].playMode('sustain');
}
function build_S06_step2(){
	SKT.sound_cabecas[1] = loadSound('data06/2.wav', build_S06_step3, failed );
	SKT.sound_cabecas[1].playMode('sustain');
}
function build_S06_step3(){
	SKT.sound_cabecas[2] = loadSound('data06/3.wav', build_S06_step4, failed );
	SKT.sound_cabecas[2].playMode('sustain');
}
function build_S06_step4(){
	SKT.sound_cabecas[3] = loadSound('data06/4.wav', build_S06_step5, failed );
	SKT.sound_cabecas[3].playMode('sustain');
}
function build_S06_step5(){
	SKT.sound_cabecas[4] = loadSound('data06/5.wav', build_S06_step6, failed );
	SKT.sound_cabecas[4].playMode('sustain');
}
function build_S06_step6(){
	SKT.sound_cabecas[5] = loadSound('data06/6.wav', build_S06_step7, failed );
	SKT.sound_cabecas[5].playMode('sustain');
}
function build_S06_step7(){
	SKT.sound_cabecas[6] = loadSound('data06/7.wav', build_S06_step8, failed );
	SKT.sound_cabecas[6].playMode('sustain');
}
function build_S06_step8(){
	SKT.draw = S06_draw;
	SKT.mouseMoved = S06_mouseMoved;
	SKT.touchMoved = S06_touchMoved;
	SKT.touchEnded = S06_touchEnded;
	SKT.end = S06_end;
	loop();
}

function S06_draw(){


/* 	if( mouseX == pmouseX && mouseY == pmouseY ){
		for( var i = 0; i < 7; ++i ){
			if( coordinates_in_rct( mouseX, mouseY, SKT.dsts[i] ) ){
				SKT.contact_cabecas[i] += 1;
			}
		}
	} */

	if( SKT.contact_fio > 0 ){
		if( !(SKT.sound_fio.isPlaying()) ) SKT.sound_fio.play();
		if( SKT.contact_fio > 60 ) SKT.contact_fio = 60;
		SKT.contact_fio -= 1;
		if( SKT.contact_fio <= 0 ) SKT.sound_fio.stop();
	}
	for( var i = 0; i < 7; ++i ){
		if( SKT.contact_cabecas[i] > 0 ){
			if( !(SKT.sound_cabecas[i].isPlaying()) ) SKT.sound_cabecas[i].play();
			if( SKT.contact_cabecas[i] > 60 ) SKT.contact_cabecas[i] = 60;
			SKT.contact_cabecas[i] -= 1;
			if( SKT.contact_cabecas[i] <= 0 ) SKT.sound_cabecas[i].stop();

			let F = SKT.force.copy();
			F.add( p5.Vector.sub( SKT.anchors[i], SKT.P[ SKT.hooks[i] ] ).mult(0.1) );
			SKT.P[ SKT.hooks[i] ].add( F );
			SKT.dsts[i].x = SKT.P[ SKT.hooks[i] ].x + SKT.O[i].x;
			SKT.dsts[i].y = SKT.P[ SKT.hooks[i] ].y + SKT.O[i].y;
			SKT.force.rotate( 0.02 );
			drag_fio_l( SKT.P, SKT.L, SKT.hooks[i] );
		}
		else if( p5.Vector.sub( SKT.anchors[i], SKT.P[ SKT.hooks[i] ] ).magSq() > 1 ){
			let F =  p5.Vector.sub( SKT.anchors[i], SKT.P[ SKT.hooks[i] ] ).mult(0.025);
			SKT.P[ SKT.hooks[i] ].add( F );
			SKT.dsts[i].x = SKT.P[ SKT.hooks[i] ].x + SKT.O[i].x;
			SKT.dsts[i].y = SKT.P[ SKT.hooks[i] ].y + SKT.O[i].y;
			drag_fio_l( SKT.P, SKT.L, SKT.hooks[i] );
		}
	}



	clear();

	fill(255);
	noStroke();




	push();
	imageMode(CORNER);
	translate( SKT.bgx, SKT.bgy );
	scale(SKT.Scl);
	image( SKT.bg, 0, 0 );
	pop();

	
/* 	for (var i = 1; i < SKT.dsts.length; ++i) {
		stroke('#8a0d12');
		strokeWeight(7);
        line(SKT.dsts[i].x + (SKT.dsts[i].w/2), SKT.dsts[i].y + (SKT.dsts[i].h/2), SKT.dsts[i - 1].x + (SKT.dsts[i - 1].w/2), SKT.dsts[i - 1].y + (SKT.dsts[i - 1].h/2));
		stroke(255);
		strokeWeight(4);
		line(SKT.dsts[i].x + (SKT.dsts[i].w/2), SKT.dsts[i].y + (SKT.dsts[i].h/2), SKT.dsts[i - 1].x + (SKT.dsts[i - 1].w/2), SKT.dsts[i - 1].y + (SKT.dsts[i - 1].h/2));
    } */

/* 	for (var i = 1; i < SKT.anchorsBoca.length; ++i) {
		stroke('#a81015');
		strokeWeight(5);
		line(SKT.anchorsBoca[i].x, SKT.anchorsBoca[i].y, SKT.anchorsBoca[i - 1].x, SKT.anchorsBoca[i - 1].y);
		stroke(255);
		strokeWeight(1);
		line(SKT.anchorsBoca[i].x, SKT.anchorsBoca[i].y, SKT.anchorsBoca[i - 1].x, SKT.anchorsBoca[i - 1].y);
	} */


	for( var i = 0; i < 7; ++i ){
		image( SKT.img, SKT.dsts[i].x, SKT.dsts[i].y, SKT.dsts[i].w, SKT.dsts[i].h,
						SKT.srcs[i].x, SKT.srcs[i].y, SKT.srcs[i].w, SKT.srcs[i].h );
	}

/* 	for (let a = 0; a < 7; a++) {
		fill(0)
		//rect(SKT.dsts[a].x,SKT.dsts[a].y,SKT.dsts[a].w,SKT.dsts[a].h)
		//rect(V[i].x,V[i].y,100,100)
	} */



/* 	stroke('#8a0d12');
	strokeWeight(7);
	for( var i = 1; i < SKT.P.length; ++i ){
		line( SKT.P[i].x, SKT.P[i].y, SKT.P[i-1].x, SKT.P[i-1].y );
	}
	stroke(255);
	strokeWeight(4);
	for( var i = 1; i < SKT.P.length; ++i ){
		line( SKT.P[i].x, SKT.P[i].y, SKT.P[i-1].x, SKT.P[i-1].y );
	} */

	stroke('#8a0d12');
strokeWeight(7);
beginShape();
noFill();
for (var i = 0; i < SKT.P.length; ++i) {
  vertex(SKT.P[i].x, SKT.P[i].y);
}
endShape();

stroke(255);
strokeWeight(4);
beginShape();
noFill();
for (var i = 0; i < SKT.P.length; ++i) {
  vertex(SKT.P[i].x, SKT.P[i].y);
}
endShape();

}
function S06_mouseMoved(){
/* 	for( var i = 0; i < 7; ++i ){
		if( coordinates_in_rct( mouseX, mouseY, SKT.dsts[i] ) ){
			SKT.contact_cabecas[i] += 2;
		}
	} */
}

function S06_touchMoved(){
	if (touches.length > 0) {
		console.log('s06 toque iniciado')
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
		for( var i = 0; i < 7; ++i ){
			if( coordinates_in_rct( x, y, SKT.dsts[i] ) ){
				SKT.contact_cabecas[i] += 4;
			}
		}
}
}

function S06_touchEnded(){
	
}

function S06_end() {
	for (var i = 0; i < SKT.sound_cabecas.length; i++){
		SKT.sound_cabecas[i].stop();
	}
  }




//-----------------------------------------------------------------------------------------------------------

class S07DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.3);
		textLeading(textLeadingSize * 1.3);
		text("\"ISSO TUDO\nNÃO ME DIZ\nNADA.\"\nE SE\nTECERMOS NOSSOS\nCAMINHOS?", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}


function build_S07(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			touchMoved: PH_touchMoved, touchEnded: PH_touchEnded,
			end: PH_end };

	SKT.bg = loadImage('data07/desenho--07.png');
	SKT.nubs = Array(2);
	SKT.nubs[0] = loadImage('data07/nub-L.png');
	SKT.nubs[1] = loadImage('data07/nub-R.png');

	SKT.bgx = VIEWPORT.x + 0.35 * VIEWPORT.w;
	SKT.bgy = 0.06 * VIEWPORT.h;
	SKT.Scl = (0.6*VIEWPORT.w) / 1444.0;

	if (window.innerWidth <= 362) {
		console.log('362')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 750.0;

	  } else if (window.innerWidth <= 390) {
		console.log('390')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 750.0;

	  } else if (window.innerWidth <= 450){
		console.log('450')
		SKT.bgx = SKT.bgx = 0 + (width * 0.05);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
		console.log('560-760')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.bgy = 0.28 * VIEWPORT.h;
		SKT.Scl = (0.6*VIEWPORT.w) / 800.0;
	  }

	  


	SKT.V = Array(2);
	SKT.RV = Array(2);
	SKT.RV[0] = createVector( 130.729, 606.311 );
	SKT.V[0]  = createVector( 165.289, 323.065 );
	SKT.RV[1] = createVector( 141.998, 605.56  );
	SKT.V[1]  = createVector( 298.272, 441.022 );

	SKT.radsq = Array(2);
	SKT.radsq[0] = sq( 140.0 *SKT.Scl );
	SKT.radsq[1] = sq( 122.0 *SKT.Scl );
	
	SKT.dst = Array(2);
	//0, 0, 1444, 919 // desenho--07-2-01
	SKT.dst[0] = { x: 79, y: 223, w: 191, h: 386 }; // nub-L
	SKT.dst[1] = { x: 136, y: 356, w: 247, h: 254 }; // nub-R

	SKT.O = Array(2);
	SKT.da = Array(2);
	SKT.td = Array(2);
	SKT.l = Array(2);
	SKT.normals = Array(2);

	for (var i = 0; i < 2; i++) {
		SKT.O[i] = createVector( SKT.RV[i].x - SKT.dst[i].x, SKT.RV[i].y - SKT.dst[i].y ).mult(SKT.Scl);
		SKT.da[i] = -atan2( SKT.V[i].y - SKT.RV[i].y, SKT.V[i].x - SKT.RV[i].x);
		SKT.td[i] = { w: SKT.dst[i].w * SKT.Scl, h: SKT.dst[i].h * SKT.Scl };
		SKT.RV[i].mult(SKT.Scl);
		SKT.V[i].mult(SKT.Scl);
		SKT.RV[i].x += SKT.bgx;
		SKT.RV[i].y += SKT.bgy;
		SKT.V[i].x += SKT.bgx;		
		SKT.V[i].y += SKT.bgy;
		SKT.l[i] = p5.Vector.dist( SKT.RV[i], SKT.V[i] );
		SKT.normals[i] = p5.Vector.sub( SKT.V[i], SKT.RV[i] ).mult(0.01);
	}

	SKT.fios = [];
	SKT.FL = 6;
	SKT.FLsq = sq(SKT.FL);
	SKT.D = -1;
	SKT.Di = -1;

	SKT.sound_fio = loadSound('data07/01-fio-de-algodao-2.wav', build_S07_step, failed );
	SKT.sound_fio.playMode('sustain');
}

function build_S07_step(){
	SKT.draw = S07_draw;
	SKT.mouseMoved = S07_mouseMoved;
	SKT.mousePressed = S07_mousePressed;
	SKT.mouseDragged = S07_mouseDragged;
	SKT.mouseReleased = S07_mouseReleased;
	SKT.touchMoved = S07_touchMoved;
	SKT.touchEnded = S07_touchEnded;
	SKT.end = S07_end;
	loop();
}

function S07_draw(){

	if( SKT.D >= 0 ){
		if( !(SKT.sound_fio.isPlaying()) ) SKT.sound_fio.loop();
	}
	else SKT.sound_fio.pause();

	clear();

	fill(255);
	noStroke();


	push();
	imageMode(CORNER);
	translate( SKT.bgx, SKT.bgy );
	scale(SKT.Scl);
	image( SKT.bg, 0, 0 );
	pop();

	

	for( var i = 0; i < 2; ++i ){

		SKT.V[i].add( SKT.normals[i] );

		propagate( SKT.RV[i], SKT.V[i], SKT.l[i] );
		
		push();
		if( SKT.RV[i] == null ){
			translate( SKT.V[i].x, SKT.V[i].y );
		}
		else{
			translate( SKT.RV[i].x, SKT.RV[i].y );
			rotate( atan2( SKT.V[i].y - SKT.RV[i].y, SKT.V[i].x - SKT.RV[i].x ) + SKT.da[i] );
		}

		image( SKT.nubs[i], -SKT.O[i].x, -SKT.O[i].y, SKT.td[i].w, SKT.td[i].h );
		pop();
	}


	stroke(255);
	strokeWeight(2);
	for (var i = SKT.fios.length - 1; i >= 0; i--) {
		SKT.fios[i].draw();
	}
}

function S07_mouseMoved() {
	let M = createVector( mouseX, mouseY );
	let algo = false;
	for( var i = 0; i < 2; ++i ){
		if( p5.Vector.sub( SKT.V[i], M ).magSq() < SKT.radsq[i] ){
			let f = createVector( movedX, movedY ).mult(0.1);
			SKT.V[i].add( f );
			algo = true;
		}
	}
	if( algo ){
		for (var i = SKT.fios.length - 1; i >= 0; i--) {
			SKT.fios[i].drag_tail( SKT.FL );
		}
	}
}

function S07_mousePressed() {
	let M = createVector( mouseX, mouseY );
	for( var i = 0; i < 2; ++i ){
		if( p5.Vector.sub( SKT.V[i], M ).magSq() < SKT.radsq[i] ){
			SKT.fios.push( new Fio_Ancorado( SKT.V[i], M ) );
			SKT.D = SKT.fios.length -1;
			SKT.Di = 0;
		}
	}
	if( SKT.D < 0 ){
		for( var j = 0; j < SKT.fios.length; ++j ){
			for( var i = 0; i < SKT.fios[j].P.length; ++i ){
				let dsq = p5.Vector.sub( SKT.fios[j].P[i], M ).magSq();
				if( dsq < 10 ){
					SKT.D = j;
					SKT.Di = i;
					break;
				}
			}
		}
	}

}

function S07_mouseDragged(){
	if( SKT.D >= 0 ){
		if( SKT.Di == 0 ){
			SKT.fios[SKT.D].drag_head( createVector( mouseX, mouseY ), SKT.FL, SKT.FLsq );
		}
		else{
			SKT.fios[SKT.D].P[SKT.Di].set( mouseX, mouseY );
			SKT.fios[SKT.D].drag_fio( SKT.Di, SKT.FL );
			SKT.fios[SKT.D].drag_tail( SKT.FL );
		}
	}
}

function S07_touchMoved(){
	if (touches.length > 0) {
		console.log('s07 toque iniciado')
		let touch = touches[0];
		x = touch.x;
		y = touch.y;

		let touchVelX = x - prevTouchX;
		let touchVelY = y - prevTouchY;
		//let touchVel = createVector(touchVelX, touchVelY);
		prevTouchX = x;
		prevTouchY = y;

		let M = createVector( x, y );
		let algo = false;
		for( var i = 0; i < 2; ++i ){
			if( p5.Vector.sub( SKT.V[i], M ).magSq() < SKT.radsq[i] ){
				let f = createVector( touchVelX, touchVelY ).mult(0.09);
				SKT.V[i].add( f );
				algo = true;
			}
		}

		

}
}

function S07_mouseReleased(){
	SKT.D = -1;
}

function S07_touchEnded(){
	
}

function S07_end() {
	SKT.sound_fio.stop();
  }






//-----------------------------------------------------------------------------------------------------------

class S08DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.2);
		textLeading(textLeadingSize * 1.2);
		text("UM FIO DE ALGODÃO,\nUM CANTO,\nUMA REDE DE DORMIR,\nUM GRAFISMO\nSÃO DOCUMENTOS\nHISTÓRICOS.\nARQUIVOS-VIVOS.", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}

function build_S08(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			touchMoved: PH_touchMoved, touchEnded: PH_touchEnded,
			end: PH_end };

	SKT.bg = loadImage( 'data08/bg.png' );
	
	SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
	SKT.Scl = VIEWPORT.h / 888.0;
	SKT.bgx = 0.5 * (width - (SKT.Scl * SKT.bg.width));

	if (window.innerWidth <= 362) {
		console.log('362')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.1 * (width - (SKT.Scl * SKT.bg.width));
		
	  } else if (window.innerWidth <= 390) {
		console.log('390')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.05 * (width - (SKT.Scl * SKT.bg.width));

	  } else if (window.innerWidth <= 450){
		console.log('450')
		//SKT.bgx = SKT.bgx = 0 + (width * 0.01);
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.15 * (width - (SKT.Scl * SKT.bg.width));

	  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
		console.log('560-760')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.001 * (width - (SKT.Scl * SKT.bg.width));
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.05 * (width - (SKT.Scl * SKT.bg.width));
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.15 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = .01 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = .01 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.20 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = .05 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = .05 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.08 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = -.05 * (width - (SKT.Scl * SKT.bg.width));
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.Scl = VIEWPORT.h / 958.0;
		SKT.bgx = .05 * (width - (SKT.Scl * SKT.bg.width));
	  }


	SKT.flores = Array(5);
	for (var i = 0; i < 5; i++) {
		SKT.flores[i] = loadImage( 'data08/flor'+(i+1)+'.png' );
	}

	let dst = Array(5);
	dst[0] = { x: 160, y: 147, w: 165, h: 190 };
	dst[1] = { x: 389, y: 237, w: 190, h: 192 };
	dst[2] = { x: 187, y: 324, w: 221, h: 165 };
	dst[3] = { x: 182, y: 467, w: 186, h: 167 };
	dst[4] = { x: 347, y: 465, w: 190, h: 171 };

	SKT.V = Array(5);
	SKT.V[0] = createVector( 243, 244 );
	SKT.V[1] = createVector( 485, 335 );
	SKT.V[2] = createVector( 308, 407 );
	SKT.V[3] = createVector( 276, 557 );
	SKT.V[4] = createVector( 442, 550 );

	SKT.O = Array(5);
	SKT.td = Array(5);
	SKT.anchors = Array(5);
	for (var i = 0; i < 5; i++) {
		SKT.O[i] = createVector( dst[i].x - SKT.V[i].x, dst[i].y - SKT.V[i].y ).mult(SKT.Scl);;
		SKT.V[i].mult(SKT.Scl);
		SKT.V[i].x += SKT.bgx;
		SKT.anchors[i] = SKT.V[i].copy();
		SKT.td[i] = { w: dst[i].w * SKT.Scl, h: dst[i].h * SKT.Scl };
	}

	SKT.radsq = sq( 60 * SKT.Scl );


	SKT.fios = [];
	SKT.FL = 6;
	SKT.FLsq = sq(SKT.FL);

	SKT.contact_flowers = Array(5);
	for (var i = 0; i < 5; i++) {
		SKT.contact_flowers[i] = 0;
	}

	SKT.force = createVector( 2, 0 );

	SKT.sound_flowers = Array(5);
	SKT.sound_flowers[0] = loadSound('data08/1.wav', build_S08_step2, failed );
	SKT.sound_flowers[0].playMode('sustain');
}
function build_S08_step2(){
	SKT.sound_flowers[1] = loadSound('data08/2.wav', build_S08_step3, failed );
	SKT.sound_flowers[1].playMode('sustain');
}
function build_S08_step3(){
	SKT.sound_flowers[2] = loadSound('data08/3.wav', build_S08_step4, failed );
	SKT.sound_flowers[2].playMode('sustain');
}
function build_S08_step4(){
	SKT.sound_flowers[3] = loadSound('data08/4.wav', build_S08_step5, failed );
	SKT.sound_flowers[3].playMode('sustain');
}
function build_S08_step5(){
	SKT.sound_flowers[4] = loadSound('data08/5.wav', build_S08_step6, failed );
	SKT.sound_flowers[4].playMode('sustain');
}
function build_S08_step6(){
	SKT.draw = S08_draw;
	SKT.mousePressed = S08_mousePressed;
	SKT.mouseDragged = S08_mouseDragged;
	SKT.mouseReleased = S08_mouseReleased;
	SKT.end = S08_end;
	loop();
}

function S08_draw(){

	let M = createVector( mouseX, mouseY );
	for( var i = 0; i < 5; ++i ){
		if( p5.Vector.sub( SKT.V[i], M ).magSq() < SKT.radsq ){
			SKT.contact_flowers[i] += 2;

			let F = SKT.force.copy();
			F.add( p5.Vector.sub( SKT.anchors[i], SKT.V[i] ).mult(0.1) );
			SKT.V[i].add( F );
			SKT.force.rotate( 0.02 );
		}
		else{
			let F = p5.Vector.sub( SKT.anchors[i], SKT.V[i] ).mult(0.025);
			SKT.V[i].add( F );
		}
	}

	for (var i = 0; i < 5; i++) {
		if( SKT.contact_flowers[i] > 0 ){
			if( !(SKT.sound_flowers[i].isPlaying()) ) SKT.sound_flowers[i].play();
			if( SKT.contact_flowers[i] > 120 ) SKT.contact_flowers[i] = 120;
			SKT.contact_flowers[i] -= 1;
			if( SKT.contact_flowers[i] <= 0 ) SKT.sound_flowers[i].pause();
		}
	}

	clear();

	fill(255);
	noStroke();

	push();
	imageMode(CORNER);
	translate(SKT.bgx, 0);
	scale(SKT.Scl);
	image( SKT.bg, 0, 0 );
	pop();


	for( var i = 0; i < 5; ++i ){
		//ellipse( SKT.V[i].x, SKT.V[i].y, 60 * SKT.Scl );
		//text( '('+i+')', SKT.V[i].x, SKT.V[i].y );
		image( SKT.flores[i], SKT.V[i].x+ SKT.O[i].x, SKT.V[i].y + SKT.O[i].y, SKT.td[i].w, SKT.td[i].h );
	}

	stroke(255);
	strokeWeight(4);
	for (var i = SKT.fios.length - 1; i >= 0; i--) {
		SKT.fios[i].draw();
	}

}

function S08_mousePressed(){
	let M = createVector( mouseX, mouseY );
	for( var i = 0; i < 5; ++i ){
		if( p5.Vector.sub( SKT.V[i], M ).magSq() < SKT.radsq ){
			SKT.fios.push( new Fio_Ancorado( SKT.V[i], M ) );
			SKT.D = SKT.fios.length -1;
			SKT.Di = 0;
		}
	}

	if( SKT.D < 0 ){
		for( var j = 0; j < SKT.fios.length; ++j ){
			for( var i = 0; i < SKT.fios[j].P.length; ++i ){
				let dsq = p5.Vector.sub( SKT.fios[j].P[i], M ).magSq();
				if( dsq < 10 ){
					SKT.D = j;
					SKT.Di = i;
					break;
				}
			}
		}
	}
}
function S08_mouseDragged(){
	if( SKT.D >= 0 ){
		if( SKT.Di < 4 ){
			SKT.fios[SKT.D].drag_head( createVector( mouseX, mouseY ), SKT.FL, SKT.FLsq );
		}
		else{
			SKT.fios[SKT.D].P[SKT.Di].set( mouseX, mouseY );
			SKT.fios[SKT.D].drag_fio( SKT.Di, SKT.FL );
			SKT.fios[SKT.D].drag_tail( SKT.FL );
		}
	}
}
function S08_mouseReleased(){
	SKT.D = -1;
}

function S08_end(){
	for (var i = 0; i < SKT.sound_flowers.length; i++){
		SKT.sound_flowers[i].stop();
	}
}




//-----------------------------------------------------------------------------------------------------------

class S09DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.3);
		textLeading(textLeadingSize * 1.3);
		text("OUVIR-ARQUIVO\nPLANTAR-ARQUIVO\nESPERAR-ARQUIVO\nCOLHER-ARQUIVO\nFIAR-ARQUIVO\nSOPRAR-ARQUIVO\nTECER-ARQUIVO", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}


function build_S09(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			touchMoved: PH_touchMoved, touchEnded: PH_touchEnded,
			end: PH_end };

	SKT.bg = loadImage( 'data09/desenho--09.png' );
	SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;

	SKT.Scl = 0.8 * (VIEWPORT.h / 919.0);

	SKT.bgx = 0.5 * (width - (SKT.Scl * SKT.bg.width));
	SKT.bgy = 0.1 * VIEWPORT.h;

	if (window.innerWidth <= 362) {
		console.log('362')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.2 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
		
	  } else if (window.innerWidth <= 390) {
		console.log('390')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.1 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;

	  } else if (window.innerWidth <= 450){
		console.log('450')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.2 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;

	  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
		console.log('560-760')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.04 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.12 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.12 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.1 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.05 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  }  else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.25 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = 0.04 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = 0.04 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.15 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = -0.1 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;
		SKT.Scl = 0.7 * (VIEWPORT.h / 919.0);
		SKT.bgx = 0.01 * (width - (SKT.Scl * SKT.bg.width));
		SKT.bgy = 0.1 * VIEWPORT.h;
	  }
	

	let bgt = createVector( SKT.bgx, SKT.bgy );

	SKT.eyes = Array(2);
	SKT.eyes[0] = { pos: createVector( 489.703, 491.228 ).mult(SKT.Scl), rad: SKT.Scl * 4 };
	SKT.eyes[1] = { pos: createVector( 515.706, 487.276 ).mult(SKT.Scl), rad: SKT.Scl * 4.2 };
	SKT.eyes[0].pos.add( bgt );
 	SKT.eyes[1].pos.add( bgt );
	SKT.ed = SKT.eyes[0].rad * 1.6;

	SKT.C = createVector( 500, 500 ).mult(SKT.Scl).add( bgt );
	SKT.R = 325 * SKT.Scl;

	//console.log( p5.Vector.dist( v[0], v[1] ), p5.Vector.dist( v[2], v[3] ) );
	
	SKT.tet = 0;

	SKT.sound = loadSound('data09/14.wav', build_S09_step, failed );
	SKT.sound.playMode('sustain');
}

function build_S09_step(){
	SKT.draw = S09_draw;
	SKT.end = S09_end;
	loop();
}

function S09_draw(){

	x = width/2
	y = height/2

	if (touches.length > 0) {
		console.log('s09 toque iniciado')
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
	}

	if (touches.length > 0) {
		if( !(SKT.sound.isPlaying()) ){
			SKT.sound.play();
		}

	}

	else{
		SKT.sound.stop();
	}

	clear();

	fill(255);
	noStroke();


	let tx = 3.5 * cos(SKT.tet);
	let ty = 3.5 * sin(2 * SKT.tet); 
	SKT.tet += 0.03;

	push();
	translate(tx, ty);

	push();
	imageMode(CORNER);
	translate( SKT.bgx, SKT.bgy );
	scale(SKT.Scl);
	image( SKT.bg, 0, 0 );
	pop();

	fill('#8a0d12');
	noStroke();
	let M = createVector( x, y );
	for (var i = 0; i < 2; i++) {
		let dif = p5.Vector.sub( M, SKT.eyes[i].pos );
		let m = map( dif.mag(), 0, width*0.45, 0, SKT.eyes[i].rad );
		dif.setMag( m );
		ellipse( SKT.eyes[i].pos.x + dif.x, SKT.eyes[i].pos.y + dif.y, SKT.ed );
	}
	pop();
}

function S09_end(){
	SKT.sound.stop();
}




//-----------------------------------------------------------------------------------------------------------


class S10DESCRICAO{

	constructor(){
		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.07;
		var textLeadingSize = textFontSize * 0.91;
		var textPositionY = height * 0.5 - textFontSize * 2.2;
		var textWidth = width * 0.869;

		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize * 1.1);
		textLeading(textLeadingSize * 1.1);
		text("AFINAL, MEUS PARENTES,\nO QUE É ARQUIVO?\nOU AINDA:\nO QUE É ARQUIVO-\nINDÍGENA?", width * 0.5, trimid );
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){}
	end(){}
}


function build_S10(){
	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			touchMoved: PH_touchMoved, touchEnded: PH_touchEnded,
			end: PH_end };

	
	SKT.spider = loadImage('data10/spider.png');
	SKT.bgx = VIEWPORT.x + 0.6 * VIEWPORT.w;

	SKT.Scl = VIEWPORT.h / 1391.0;

	if (window.innerWidth <= 362) {
		console.log('362')
		SKT.bgx = 0 + (width * 0.15);
		SKT.Scl = VIEWPORT.h / 1391.0;
		
	  } else if (window.innerWidth <= 390) {
		console.log('390')
		SKT.bgx = 0 + (width * 0.15);
		SKT.Scl = VIEWPORT.h / 1391.0;

	  } else if (window.innerWidth <= 450){
		console.log('450')
		SKT.bgx = 0 + (width * 0.1);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
		console.log('560-760')
		SKT.bgx = 0 + (width * 0.15);
		SKT.Scl = VIEWPORT.h / 1391.0;
		  
	  } else if (window.innerWidth <= 560){
		console.log('560')
		SKT.bgx = 0 + (width * 0.15);
		SKT.Scl = VIEWPORT.h / 1391.0;
		  
	  } else if (window.innerWidth <= 600){
		console.log('600')
		SKT.bgx = 0 + (width * 0.15);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 700){
		console.log('700')
		SKT.bgx = 0 + (width * 0.19);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 800){
		console.log('800')
		SKT.bgx = 0 + (width * 0.19);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
		console.log('920-1500')
		SKT.bgx = 0 + (width * 0.05);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 920){
		console.log('920')
		SKT.bgx = 0 + (width * 0.23);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 1000){
		console.log('1000')
		SKT.bgx = 0 + (width * 0.23);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 1100){
		console.log('1100')
		SKT.bgx = 0 + (width * 0.13);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 1200){
		console.log('1200')
		SKT.bgx = 0 + (width * 0.15);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  } else if (window.innerWidth <= 1300){
		console.log('1300')
		SKT.bgx = 0 + (width * 0.2);
		SKT.Scl = VIEWPORT.h / 1391.0;
	  }


	SKT.FL = 6;
	//SKT.FLsq = sq(SKT.FL);

	let root = createVector( 307, 663 ).mult(SKT.Scl);
	root.x += SKT.bgx;
	SKT.fio = new Fio_Ancorado( root, root );
	SKT.head = createVector( 307, 0 ).mult(SKT.Scl);
	SKT.head.x += SKT.bgx;
	SKT.fio.drag_head( SKT.head, SKT.FL, sq(SKT.FL) );
	SKT.lp = SKT.fio.P.length-1;

	SKT.vel = createVector(0,0);

	SKT.lady = loadImage('data10/lady.png', build_S10_step1, failed );
	
}
function build_S10_step1(){
	SKT.lady_dst = { x: SKT.head.x - (SKT.Scl * SKT.lady.width * 0.5), y: (0.90*VIEWPORT.h) - (SKT.Scl * SKT.lady.height), w: SKT.Scl * SKT.lady.width, h: SKT.Scl * SKT.lady.height };
	SKT.sound = loadSound('data10/-som-da-aranha-20.wav', build_S10_step2, failed );
	SKT.sound.playMode('sustain');
}

function build_S10_step2(){
	//SKT.sound.loop();
	SKT.draw = S10_draw;
	SKT.mouseMoved = S10_mouseMoved;
	SKT.touchMoved = S10_touchMoved;
	//SKT.touchEnded = S10_touchEnded;
	SKT.end = S10_end;
	loop();
}

function S10_draw(){

	if (touches.length > 0) {
		console.log('s10 toque iniciado')
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
	}

	if (touches.length > 0) {
		if( !(SKT.sound.isPlaying()) ){
			SKT.sound.play();
		}

	} else{
		SKT.sound.stop();
	}

/* 	if( dist( mouseX, mouseY, SKT.fio.P[SKT.lp].x , SKT.fio.P[SKT.lp].y ) < 100 ){
		if( !(SKT.sound.isPlaying()) ){
			SKT.sound.loop();
		}
	}
	else{
		SKT.sound.pause();
	} */

	clear();

	fill(255);
	noStroke();

	stroke(255);
	strokeWeight(6*SKT.Scl);
	SKT.fio.draw();

	//fill('#8a0d12');
	//noStroke();
	//rect( 0, 0, width, SKT.lady_dst.y+SKT.lady_dst.h );//backing

	image( SKT.lady, SKT.lady_dst.x, SKT.lady_dst.y, SKT.lady_dst.w, SKT.lady_dst.h );

	push();
	translate( SKT.fio.P[SKT.lp].x , SKT.fio.P[SKT.lp].y  );
	let alpha = atan2( SKT.fio.P[SKT.lp-1].y - SKT.fio.P[SKT.lp].y, SKT.fio.P[SKT.lp-1].x - SKT.fio.P[SKT.lp].x);
	rotate( alpha + HALF_PI );
	scale(SKT.Scl * 0.5);
	image( SKT.spider, -100, -129 );
	pop();

	SKT.vel.y += 0.5;
	SKT.fio.P[SKT.lp].x += SKT.vel.x;
	SKT.fio.P[SKT.lp].y += SKT.vel.y;
	SKT.vel.mult(0.96);

	for( var i = SKT.lp-1; i > 0; --i ){
		propagate( SKT.fio.P[i+1], SKT.fio.P[i], SKT.FL );
	}
	for( var i = 1; i < SKT.fio.P.length; ++i ){
		propagate( SKT.fio.P[i-1], SKT.fio.P[i], SKT.FL );
	}
}
function S10_mouseMoved(){
/* 	SKT.vel.x += movedX * 0.05;
	SKT.fio.P[0].y += movedY * 0.4;
	if( SKT.fio.P[0].y > SKT.head.y ) SKT.fio.P[0].y = SKT.head.y;
	SKT.fio.drag_fio( 0, SKT.FL ); */
}

function S10_touchMoved(){
	
	if (touches.length > 0) {
		console.log('s10 toque iniciado')
		let touch = touches[0];
		x = touch.x;
		y = touch.y;
		let touchVelX = x - prevTouchX;
		let touchVelY = y - prevTouchY;
		prevTouchX = x;
		prevTouchY = y;

		SKT.vel.x += touchVelX * 0.05;
		SKT.fio.P[0].y += touchVelY * 0.4;
		if( SKT.fio.P[0].y > SKT.head.y ) SKT.fio.P[0].y = SKT.head.y;
		SKT.fio.drag_fio( 0, SKT.FL );

	/* 	if( !(SKT.sound.isPlaying()) ){
			SKT.sound.loop();
		} */
		

	}

}

function S10_touchEnded(){
	SKT.sound.pause();
}



function S10_end(){
	SKT.sound.stop();
}






//-----------------------------------------------------------------------------------------------------------






class S11_CREDITOS{

	constructor(){
		
		textAlign(LEFT, TOP);
		textFont( DINcon, 15 );
		textLeading(17);

		//this.tx = ;
		//this.ty = this.tx + (14 * ( textAscent() + textDescent() ));
		//this.tw = textWidth("https://introscopia.github.io/");


		let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
		this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
		this.introskp.x = 0 + (0.57 * VIEWPORT.w);
		this.introskp.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + b.h;
		this.introskp.b = this.introskp.y + this.introskp.h;
		this.introskp.r = this.introskp.x + this.introskp.w;

		let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
		this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
		this.wiw.x = 0 + (0.57 * VIEWPORT.w);
		this.wiw.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + c.h;
		this.wiw.b = this.wiw.y + this.wiw.h;
		this.wiw.r = this.wiw.x + this.wiw.w;

		

		if (window.innerWidth <= 362) {
			console.log('362')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
			
		  } else if (window.innerWidth <= 390) {
			console.log('390')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;

	
		  } else if (window.innerWidth <= 450){
			console.log('450')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;

		  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
			console.log('560-760')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;

			  
		  } else if (window.innerWidth <= 560){
			console.log('560')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;

			  
		  } else if (window.innerWidth <= 600){
			console.log('600')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.174  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;

		  } else if (window.innerWidth <= 700){
			console.log('700')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  } else if (window.innerWidth <= 800){
			console.log('800')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  }  else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
			console.log('920-1500')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  } else if (window.innerWidth <= 920){
			console.log('920')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  } else if (window.innerWidth <= 1000){
			console.log('1000')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.166  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  }	else if (window.innerWidth <= 1100){
			console.log('1100')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.170  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.170  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  }	else if (window.innerWidth <= 1200){
			console.log('1200')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.170  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.170  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  }	else if (window.innerWidth <= 1300){
			console.log('1300')
			let b = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.introskp = DINcon.textBounds("https://introscopia.github.io/", 0, 0, 15 );
			this.introskp.x = 0 + (0.57 * VIEWPORT.w);
			this.introskp.y = VIEWPORT.y + (0.170  * VIEWPORT.h) + b.h;
			this.introskp.b = this.introskp.y + this.introskp.h;
			this.introskp.r = this.introskp.x + this.introskp.w;
	
			let c = DINcon.textBounds("É\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ng", 0, 0, 15 );
			this.wiw = DINcon.textBounds("https://wiwsic.xyz/", 0, 0, 15 );
			this.wiw.x = 0 + (0.57 * VIEWPORT.w);
			this.wiw.y = VIEWPORT.y + (0.170  * VIEWPORT.h) + c.h;
			this.wiw.b = this.wiw.y + this.wiw.h;
			this.wiw.r = this.wiw.x + this.wiw.w;
		  }



		//loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		textAlign(LEFT, TOP);
		textFont( DINcon, 15 );
		textLeading(17);

		text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
			  0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );

		text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
			  0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
		
			  if (window.innerWidth <= 362) {
				console.log('362')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );

			  } else if (window.innerWidth <= 390) {
				console.log('390')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );

			  } else if (window.innerWidth <= 450){
				console.log('450')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );

			  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
				console.log('560-760')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
				  
			  } else if (window.innerWidth <= 560){
				console.log('560')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
				  
			  } else if (window.innerWidth <= 600){
				console.log('600')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );

			  } else if (window.innerWidth <= 700){
				console.log('700')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
			  } else if (window.innerWidth <= 800){
				console.log('800')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
			  }   else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
				console.log('920-1500')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );

			  } else if (window.innerWidth <= 920){
				console.log('920')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
			} else if (window.innerWidth <= 1000){
				console.log('1000')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
			} else if (window.innerWidth <= 1100){
				console.log('1100')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
			} else if (window.innerWidth <= 1200){
				console.log('1200')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
			} else if (window.innerWidth <= 1300){
				console.log('1300')
				text( "FICHA TÉCNICA EDITORIAL\n\nRealização:\nFundação Bienal de São Paulo\n\nCoordenação geral e Realização:\nPICADA (@picada.livros)\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nTextos e depoimentos transcritos:\nGustavo Caboco Wapichana\nTipuici Manoki\n\nOrganização editorial, projeto gráfico e desenhos:\nGustavo Caboco Wapichana\n\nFotografias e artes licenciadas:\nArquivo Histórico Wanda Svevo\nRicardo Werá\nTipuici Manóki\nGustavo Caboco Wapichana\n\nRevisão crítica:\nPaula Berbert\n\nCapa e contracapa:\nGustavo Caboco Wapichana",
				0 + 0.05 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
  
				text("Projeto Obra Digital Gustavo Caboco\n\nRealização:\nFundação Bienal de São Paulo\n\nArtista e Direção:\nGustavo Caboco Wapichana\n\nPesquisa no Arquivo Histórico Wanda Svevo:\nGustavo Caboco Wapichana\nTipuici Manóki\n\nDesenho de som:\nIan Wapichana\n\nProgramação Criativa:\nJoão Antonio de F. P. e Ferreira\nhttps://introscopia.github.io/\n\nAdaptação Mobile:\nWiW\nhttps://wiwsic.xyz/", 
				0 + 0.57 * VIEWPORT.w, 0.15 * VIEWPORT.h, 0.5 * VIEWPORT.w );
			}

		stroke(255);
		strokeWeight(1);
		//line( this.introskp.x, this.introskp.b, this.introskp.r, this.introskp.b );
		//line( this.wiw.x, this.wiw.b, this.wiw.r, this.wiw.b );


	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){
/* 		if (mouseButton === LEFT) {
			if( coordinates_in_rct( mouseX, mouseY, this.introskp ) ){
				window.open("http://introscopia.github.io/");
			} else 	if( coordinates_in_rct( mouseX, mouseY, this.wiw ) ){
				window.open("https://wiwsic.xyz/");
			}
		} */
	}
	end(){}
}

class S12_AGRADECIMENTOS{

	constructor(){
		
		var textFontSize = width * 0.06;
		var textLeadingSize = textFontSize * 1.2;
		if (window.innerWidth <= 362) {
			console.log('362')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
			
		  } else if (window.innerWidth <= 390) {
			console.log('390')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
	
		  } else if (window.innerWidth <= 450){
			console.log('450')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
		  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
			console.log('560-760')
			var textFontSize = width * 0.05;
			var textLeadingSize = textFontSize * 1.2;
			  
		  } else if (window.innerWidth <= 560){
			console.log('560')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
			  
		  } else if (window.innerWidth <= 600){
			console.log('600')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
		  } else if (window.innerWidth <= 700){
			console.log('700')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		  } else if (window.innerWidth <= 800){
			console.log('800')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
			console.log('920-1500')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		  } else if (window.innerWidth <= 920){
			console.log('920')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1000){
			console.log('1000')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1100){
			console.log('1100')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1200){
			console.log('1200')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1300){
			console.log('1300')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		}
		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize );
		textLeading(textLeadingSize);


		loop();
	}

	draw(){
		clear();
		fill(255);
		noStroke();
		var textFontSize = width * 0.06;
		var textLeadingSize = textFontSize * 1.2;
		if (window.innerWidth <= 390) {
			console.log('390')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
	
		  } else if (window.innerWidth <= 450){
			console.log('450')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
		  } else if (window.innerWidth <= 560 && window.innerHeight <= 760){
			console.log('560-760')
			var textFontSize = width * 0.05;
			var textLeadingSize = textFontSize * 1.2;
			  
		  } else if (window.innerWidth <= 560){
			console.log('560')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
			  
		  } else if (window.innerWidth <= 600){
			console.log('600')
			var textFontSize = width * 0.06;
			var textLeadingSize = textFontSize * 1.2;
		  } else if (window.innerWidth <= 700){
			console.log('700')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		  } else if (window.innerWidth <= 800){
			console.log('800')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		  } else if (window.innerWidth <= 920 && window.innerHeight >= 1500){
			console.log('920-1500')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		  } else if (window.innerWidth <= 920){
			console.log('920')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1000){
			console.log('1000')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1100){
			console.log('1100')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1200){
			console.log('1200')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		} else if (window.innerWidth <= 1300){
			console.log('1300')
			var textFontSize = width * 0.04;
			var textLeadingSize = textFontSize * 1.4;
		}

		textFontSize = textFontSize * .8
		textLeadingSize = textLeadingSize * .8;


		textAlign(CENTER, CENTER);
		textFont( DINcon, textFontSize );
		textLeading(textLeadingSize);
		textAlign(CENTER, CENTER);




		noStroke();
/* 		text("AGRADECIMENTOS:\n\nAislan Pankararu\nColetivo Ijã Mytyli de Cinema Manoki e Myky\nFamília Wapichana\nAritana Yawalapiti\nNaine Terena\nDenilson Baniwa\nPaulo Miyada\nDora Côrrea\nThiago Gil de Oliveira Virava\nSimone de Lira\nAna Luiza de Oliveira Mattos\nAmanda Pereira Siqueira\nMelânie Vargas de Araujo\nArquivo Histórico Wanda Svevo\nFundação Bienal de São Paulo\nComissão YVYRUPA", 
			  VIEWPORT.x + 0.74 * VIEWPORT.w, 0.1 * VIEWPORT.h, 0.20 * VIEWPORT.w ); */
		
		text("AGRADECIMENTOS GUSTAVO CABOCO:\n\nAislan Pankararu\nColetivo Ijã Mytyli de Cinema Manoki e Myky\nFamília Wapichana\nAritana Yawalapiti\nNaine Terena\nDenilson Baniwa\nComissão YVYRUPA\nDora Correa\nThiago Gil de Oliveira Virava\nSimone Lopes de Lira\nAna Luiza de Oliveira Mattos\nAmanda Pereira Siqueira\nMelânie Vargas de Araujo\nFrancisco Bresolin\nRafael Falasco\nCaroline Carrion", 
			  width * 0.5, height * 0.5);
		
	}
	mouseMoved(){}
	mousePressed(){}
	mouseDragged(){}
	mouseReleased(){
	}
	end(){}
}





var currentPageTitle = ""; // Variável para armazenar o nome da página atual



function load_skt(){

	imageMode(CORNER);
	frameRate(60);
	noLoop();

	SKT.end();
	delete SKT;

	switch( INDEX ){
		case 0:
			SKT = new S00_SAGUAO();
			break;
		case 1:
			SKT = new S00AVISO();
			break;
		case 2:
			SKT = new S01DESCRICAO();
			break;
		case 3:
			build_S01();
			break;
		case 4:
			SKT = new S02DESCRICAO();
			break;
		case 5:
			build_S02();
			break;
		case 6:
			SKT = new S03DESCRICAO();
			break;
		case 7:
			build_S03();
			break;
		case 8:
			SKT = new S04DESCRICAO();
			break;
		case 9:
			build_S04();
			break;
		case 10:
			SKT = new S05DESCRICAO();
			break;
		case 11:
			build_S05();
			break;
		case 12:
			SKT = new S06DESCRICAO();
			break;
		case 13:
			build_S06();
			break;
		case 14:
			SKT = new S07DESCRICAO();
			break;
		case 15:
			build_S07();
			break;
		case 16:
			SKT = new S08DESCRICAO();
			break;
		case 17:
			build_S08();
			break;
		case 18:
			SKT = new S09DESCRICAO();
			break;
		case 19:
			build_S09();
			break;
		case 20:
			SKT = new S10DESCRICAO();
			break;
		case 21:
			build_S10();
			break;
		case 22:
			SKT = new S11_CREDITOS();
			break;
		case 23:
			SKT = new S12_AGRADECIMENTOS();
			break;
	}
	currentPageTitle = titulos[INDEX];
}


var DINcon, DINalt;
var tritop, trimid, tribot;
var dootsx, dootsy, dootsd, dootss;
var cx;
var cashmeoutsy = false;

function preload(){
	DINcon = loadFont( 'DIN Condensed Bold.ttf' );
	DINalt = loadFont( 'DIN Alternate Bold.ttf' );
}

function setup() {

	var w = window.innerWidth;
	var h = window.innerHeight;
	var canvas = createCanvas(w, h);
	//var canvas = createCanvas(1080,2400);

	canvas.parent('sketch-holder');

	DIM = Math.max(w, h);
	MValue = DIM / DEFAULT_SIZE;
	MValue = MValue;
	

	cx = w / 2;

	dootsd = 11;

	//VIEWPORT = { x: 20, y: 0, w: width-40, h: height - 1.2*dootsd, r: width-10, b: height-20 };
	VIEWPORT = { x: 10, y: 0, w: width-40, h: height - 1.2*dootsd, r: width-10, b: height-20 };

	trimid = VIEWPORT.y + (0.5*VIEWPORT.h);
	tritop = trimid - 10;
	tribot = trimid + 10;

	dootsy = height - 1*dootsd;
	dootss = 1.4*dootsd;
	dootsx = VIEWPORT.x + (0.42*VIEWPORT.w) - 8*dootss;

	titulos = Array(24);
	titulos[0] = "Início"
	titulos[1] = "Obra-digital interativa"
	titulos[2] = "Pés de algodão";
	titulos[3] = "Pés de algodão";
	titulos[4] = "Seres eletro-parixara no algodoeiro";
	titulos[5] = "Seres eletro-parixara no algodoeiro";
	titulos[6] = "Arquivo algodão";
	titulos[7] = "Arquivo algodão";
	titulos[8] = "Algodão canta ausências";
	titulos[9] = "Algodão canta ausências";
	titulos[10] = "Kinharyd-rezado";
	titulos[11] = "Kinharyd-rezado";
	titulos[12] = "Das ausências, mas sempre estivemos aqui";
	titulos[13] = "Das ausências, mas sempre estivemos aqui";
	titulos[14] = "Tecer o fio-forte";
	titulos[15] = "Tecer o fio-forte";
	titulos[16] = "Antes de eu morrê, já sabe";
	titulos[17] = "Antes de eu morrê, já sabe";
	titulos[18] = "Anamnese no Arquivo Histórico da Bienal de S. Paulo";
	titulos[19] = "Anamnese no Arquivo Histórico da Bienal de S. Paulo";
	titulos[20] = "O que é arquivo?";
	titulos[21] = "O que é arquivo?";
	titulos[22] = "Ficha técnica";
	titulos[23] = "Agradecimentos";

	SKT = { draw: PH_draw, mouseMoved: PH_mouseMoved, mousePressed: PH_mousePressed, 
			mouseDragged: PH_mouseDragged, mouseReleased: PH_mouseReleased,
			end: PH_end };

	INDEX = 0;
	load_skt();
}






function draw() {

	SKT.draw();
	//background(200,0,110)
	/* if( INDEX > 0 ){
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
	} */

/* 	push();
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
	pop(); */
	push();
	textSize(20);
	textAlign(CENTER, CENTER);
	fill(255);
	noStroke();
	if (INDEX > 0) {
	text(INDEX + "/23", width / 2, 0 + 20);
	}
	text(currentPageTitle, width / 2, height - 20);
	pop();
  
  // Renderizar os triângulos para navegação entre as páginas
  if (INDEX > 0) {
    renderLeftTriangle();
  }
  if (INDEX < 23) {
    renderRightTriangle();
  }
  if (INDEX == 23){
	push();
	textSize(20);
	textAlign(CENTER, CENTER);
	fill(255);
	noStroke();
	text("Início", width - 30, height - 20);
	pop();
  }

}

function renderLeftTriangle() {
	// Renderizar triângulo apontando para a esquerda (seta esquerda)

	var x = 15; // Margem de 15 pixels do início da tela
	var y = height - 20;
	var triangleSize = 15;
	var regionSize = height * .045;

	noStroke();
	fill(255);
	if (dist(mouseX, mouseY, x, y) < regionSize) {

	  
	}

	
	push();
	triangle(x, y, x + triangleSize, y + triangleSize * 0.6, x + triangleSize, y - triangleSize * 0.6);
	pop();
  }
  
  function renderRightTriangle() {
	// Renderizar triângulo apontando para a direita (seta direita)

	var x = width - 15; // Margem de 15 pixels do fim da tela
	var y = height - 20;
	var triangleSize = 15;
	var regionSize = height * .045;

	noStroke();
	fill(255);
	if (dist(mouseX, mouseY, x, y) < regionSize) {
	

	}

	
	push();
	triangle(x, y, x - triangleSize, y + triangleSize * 0.6, x - triangleSize, y - triangleSize * 0.6);
	pop();
  }

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
	/* else if( cashmeoutsy ){
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
	cashmeoutsy = false; */
}

function keyReleased(){
	if (keyCode === LEFT_ARROW) {
		INDEX = constrain( INDEX - 1, 0, 23 );
		load_skt();
	}
	else if (keyCode === RIGHT_ARROW) {
		INDEX = constrain( INDEX + 1, 0, 23 );
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
	console.log('toque iniciado')
	SKT.mousePressed();

	if (INDEX > 0) {
		var leftTriangleX = 15; // Margem de 5 pixels do início da tela
		var leftTriangleY = height - 20;
		//var triangleSize = 60;
		var regionSize = height * .045;
		if (dist(mouseX, mouseY, leftTriangleX, leftTriangleY) < regionSize) {
			console.log('condição atingida')
		  INDEX--;
		  PH_draw()
		  load_skt();
		  
		} else if (INDEX == 23) {
		var textX = width - 15; // Margem de 5 pixels do fim da tela
		var textY = height - 20;
		var regionSize = height * .045;
		if (dist(mouseX, mouseY, textX, textY) < regionSize) {
			console.log('condição atingida')
		  INDEX = 0;
		  load_skt();
		}
			return; // Retorna para evitar que os dois triângulos sejam verificados ao mesmo tempo
		}
	  }
	
	  // Verificar o toque no triângulo direito (avançar para a direita)
	  if (INDEX < 23) {
		var rightTriangleX = width - 15; // Margem de 5 pixels do fim da tela
		var rightTriangleY = height - 20;
		//var triangleSize = 60;
		var regionSize = height * .045;
		if (dist(mouseX, mouseY, rightTriangleX, rightTriangleY) < regionSize) {
			console.log('condição atingida')
		  INDEX++;
		  PH_draw()
		  load_skt();
		}
	  }
	
}

  
  function touchMoved() {
	SKT.mouseDragged();
	SKT.touchMoved();
  }

function touchEnded() {
	console.log('toque solto')
	SKT.mouseReleased();
	SKT.touchEnded();
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




  