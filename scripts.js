/*

dfe = Desafio Front End 

*/

var dfe = {};

//slide

dfe.slide = {
	
	current: 0,
	imgs: [],
	walk: '',
	isSliding: false,
	timer: 3000
	
};

dfe.slide.print = function(){
	
	var output = '';
	var first;
	
	dfe.slide.imgs.forEach(function(img){
		
		if(output.length < 1)
			first = 'active'
		else
			first = '';
		
		output += '<img class="'+first+'" src="Arquivos/imagens/slide/'+img+'" />';
		
	});
	
	$('#slider .items').html( output );
	
	dfe.slide.items = $('#slider .items img');
	
}

dfe.slide.walk = function(mod){
	
	if( dfe.slide.isSliding )
		return;
	
	dfe.slide.isSliding = true;
	
	var target, coming, going;
	
	coming = mod ? 'right' : 'left';
	going = mod ? 'left' : 'right';
	
	if( coming == 'right'){
		
		if(dfe.slide.current == dfe.slide.length-1){
			target = 0;
			dfe.slide.current = 0;
		}else{
			target = dfe.slide.current+1;	
			dfe.slide.current++;
		}
		
	}
	
	if( coming == 'left'){
		
		if(dfe.slide.current == 0){
			target = dfe.slide.length-1
			dfe.slide.current = dfe.slide.length-1;
		}else{
			target = dfe.slide.current-1;	
			dfe.slide.current--;
		}
		
		
	}
	
	dfe.slide.items.eq( target ).addClass( coming );
	
	setTimeout(function( target ){
		
		$('.active').addClass( going ).removeClass('active');
		dfe.slide.items.eq( target ).addClass('active').removeClass( coming );
		
		setTimeout(function(){
			
			$('.'+going).removeClass( going );
			
			dfe.slide.isSliding = false;
			
		},dfe.slide.timer+20);
		
	},20, target);	
	
}


dfe.slide.start = function(){
		
	$.getJSON('Arquivos/JSON/slide.json',function(res){
		
		dfe.slide.imgs = res[0].imagens;
		dfe.slide.length = dfe.slide.imgs.length;	
		
		dfe.slide.print();
		
		setInterval(function(){
			
			dfe.slide.walk(1);
			
		},dfe.slide.timer);
		
	});
}

//features

dfe.features = {};

dfe.features.printEditoria = function(index){
	
	var out = '';
	
	console.log(index);
		
	dfe.features.editorias[ index ]["Notícias"].forEach(function(noticia){
		
		console.log(noticia["Título"]);
		
		out += '<div class="feature row"> '+
					'<div class="pic col four">'+
						'<img src="Arquivos/Imagens/Notícias/'+noticia.Foto+'" />'+
					'</div>'+
					
					'<div class="news col six">'+
						'<h2>'+noticia["Título"]+'</h2>'+
						'<p>'+noticia.Texto+'</p>'+
					'</div>'+
					
					'<a href="#" class="float-right"> > </a>'+
				'</div>';
		
	});
	
	$('#feature-list').html( '' );
	$('#feature-list').html( out );
	
}

dfe.features.start = function(){
	
	$.getJSON('Arquivos/JSON/noticias.json',function(res){
		
		dfe.features.editorias = res[0].Editorias;
		
		//imprimir primeira editoria da lista
		dfe.features.printEditoria(0);
		
		//povoar select
		
		var options = '<option value="" disabled selected>EDITORIAS</option>';
		var index = 0;
		
		dfe.features.editorias.forEach(function(editoria){
			
			var name = editoria.Editoria;
			
			options += '<option value="'+index+'">'+name+'</option>';
			
			index++;
			
		});
		
		$('#editorias').html( options );
		
		$('#editorias').change( function(){
			
			dfe.features.printEditoria( $(this).val() );
			
			
		});
		
		
		
	});
	
}


//levantar app
dfe.slide.start();
dfe.features.start();


