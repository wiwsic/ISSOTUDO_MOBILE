	
	
	
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


