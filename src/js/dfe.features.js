(function(){

	'use strict';

	dfe.features = {};

	dfe.features.printEditoria = function(index){
		
		var out = '';
		
		console.log(index);
			
		dfe.features.editorias[ index ]["Notícias"].forEach(function(noticia){
			
			console.log(noticia["Título"]);
			
			out += '<div class="feature row"> '+
						
						'<img class="pic" src="img/news/'+noticia.Foto+'" />'+
						
						'<div class="desc">'+
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
		
		$.getJSON('json/noticias.json',function(res){
			
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
	
})();