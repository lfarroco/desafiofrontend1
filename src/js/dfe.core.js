/*

dfe = Desafio Front End 

*/

(function(){

	'use strict';

	window.dfe = {
		
		start : function(){
			
			dfe.slide.start();
			dfe.features.start();
			
		}
		
	};

	//levantar app
	
	$(document).ready(function(){
		
		dfe.start();
		
	});	
	
})();
