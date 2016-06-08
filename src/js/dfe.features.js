(function(){

	'use strict';

	var features = {};

	if(window.dfe)
		window.dfe.features = features;
	else
		window.dfe = { features: features };
	

	features.printEditoria = function(index){
		
		var news = [];
		var out = '';

		if(!index)
			index = 0;

		console.log('....',index);

		//se as datas das noticias ainda não foram geradas
		//if(typeof features.editorias[ index ]["Notícias"][0]["Data de publicação"] === 'undefined')
		features.editorias[ index ]["Notícias"].forEach(function(noticia){
			
			var brDate = noticia["Data de publicação"];
			
			var parsedDate = brDate.split('-');
			
			noticia.date = new Date( parsedDate[2], (parsedDate[1]*1)-1, parsedDate[0] ).getTime();
			
		});
		
		if($('#data').val() == 'data'){
			//sort by date ( slice(0) to clone array! )
			news = features.editorias[ index ]["Notícias"].slice(0).sort(function(a,b){
			
				console.log(a.date-b.date);
				return a.date-b.date;
			
			});
		}
		
		if($('#data').val() == 'titulo'){
			//sort by title -->http://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
			news = features.editorias[ index ]["Notícias"].slice(0).sort(function(a, b){
			 var nameA=a["Título"].toLowerCase(), nameB=b["Título"].toLowerCase();
			 if (nameA < nameB) //sort string ascending
			  return -1;
			 if (nameA > nameB)
			  return 1;
			 return 0; //default return value (no sorting)
			});

		}
			
		news.forEach(function(noticia){
			
			console.log(noticia["Título"]);
			
			out += '<div class="feature row"> '+
						
						'<img class="pic" src="img/news/'+noticia.Foto+'" />'+
						
						'<div class="desc">'+
							'<h3>'+noticia["Título"]+'</h3>'+
							'<p>'+noticia.Texto+'</p>'+
						'</div>'+						
						'<a href="#" class="float-right"> </a>'+
					'</div>';
			
		});
		
		$('#feature-list').html( '' );
		$('#feature-list').html( out );
		
	};
	
	features.start = function(){
		
		$.getJSON('json/noticias.json',function(res){
			
			features.editorias = res[0].Editorias;
			
			//imprimir primeira editoria da lista
			features.printEditoria(0);
			
			//povoar select 
			
			var options = '<option value="" disabled selected>EDITORIAS</option>';
			var index = 0;
			
			features.editorias.forEach(function(editoria){
				
				var name = editoria.Editoria; 
				
				options += '<option value="'+index+'">'+name+'</option>';
				
				index++;
				
			});
			
			$('#editorias').html( options );
			
			$('#editorias,#data').change( function(){
				
				features.printEditoria( $('#editorias').val() );				
				
			});
			
		});
		
	};
	
	
	
})();
