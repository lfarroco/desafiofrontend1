(function(){

	'use strict';

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
			
			output += '<img class="'+first+'" src="img/slide/'+img+'" />';
			
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
			
		$.getJSON('json/slide.json',function(res){
			
			dfe.slide.imgs = res[0].imagens;
			dfe.slide.length = dfe.slide.imgs.length;	
			
			dfe.slide.print();
			
			setInterval(function(){
				
				dfe.slide.walk(1);
				
			},dfe.slide.timer);
			
		});
	}
	
})();