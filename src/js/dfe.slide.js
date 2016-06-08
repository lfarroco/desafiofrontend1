(function(){

	'use strict';

	var slide = {
		
		current: 0,
		imgs: [],
		walk: '',
		isSliding: false,
		timer: 3000,
		clicked: false
		
	};

	if(window.dfe)
		window.slide = slide;
	else
		window.dfe = { slide: slide };

	slide.print = function(){
		
		var output = '';
		var first;
		
		slide.imgs.forEach(function(img,index){
			
			if(index < 1)
				first = 'active';
			else
				first = '';
			
			output += '<img class="'+first+'" src="img/slide/'+img+'" />';

			$('#slider .position').append( '<div class="pos '+first+'"></div>' );
			
		});
		
		$('#slider .items').html( output );
		
		slide.items = $('#slider .items img');
		
	};

	slide.walk = function(mod){
		
		if( slide.isSliding )
			return;
		
		slide.isSliding = true;
		
		var target, coming, going;
		
		coming = mod > 0 ? 'right' : 'left';
		going = mod > 0 ? 'left' : 'right';
		
		if( coming == 'right'){
			
			if(slide.current == slide.length-1){
				target = 0;
				slide.current = 0;
			}else{
				target = slide.current+1;	
				slide.current++;
			}
			
		}
		
		if( coming == 'left'){
			
			if(slide.current === 0){
				target = slide.length-1;
				slide.current = slide.length-1;
			}else{
				target = slide.current-1;	
				slide.current--;
			}
			
			
		}
		
		slide.items.eq( target ).addClass( coming );

		$('#slider .position .pos').removeClass('active');
		$('#slider .position .pos').eq( slide.current ).addClass('active');
		
		setTimeout(function( target ){
			
			$('#slider img.active').addClass( going ).removeClass('active');
			slide.items.eq( target ).addClass('active').removeClass( coming );
			
			setTimeout(function(){
				
				$('.'+going).removeClass( going );
				
			},slide.timer+20);

			slide.isSliding = false;
			
		},20, target);	
		
	};

	slide.start = function(){
			
		$.getJSON('json/slide.json',function(res){
			
			slide.imgs = res[0].imagens;
			slide.length = slide.imgs.length;	
			
			slide.print();
			
			setInterval(function(){
				
				if(!slide.clicked)
					slide.walk(1);
				
			},slide.timer);
			
			$('#slider .prev').click(function(){
				slide.walk( -1);
				slide.clicked = true;
				setTimeout(function(){
					
					slide.clicked = false;

				},2000);
			});
			$('#slider .next').click(function(){
				slide.walk( 1 );
				
				slide.clicked = true;
				setTimeout(function(){
					
					slide.clicked = false;

				},2000);
			});

			
		});
	};
	
})();
