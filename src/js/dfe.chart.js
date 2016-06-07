(function(){

	'use strict';

	var chart = {

		data : {
		}

	};

	chart.data.politica= {views:600,name:"POLÍTICA",perc:0};
	chart.data.economia = {views:500,name:"ECONOMIA",perc:0};
	chart.data.ciencia = {views:400,name:"CIÊNCIA",perc:0};
	chart.data.brasil = {views:300,name:"BRASIL",perc:0};
	chart.data.mundo = {views:200,name:"MUNDO",perc:0};
	chart.data.cultura = {views:100,name:"CULTURA",perc:0};

	chart.largest = 0;

	for(var row in chart.data){

		if(chart.data[row].views > chart.largest)
			chart.largest = chart.data[row].views;
	
	}

	for(var row in chart.data){

		chart.data[row].perc = (chart.data[row].views / chart.largest ) * 100;

		$('#chart').append(
			'<div class="row"><div class="col two">'+chart.data[row].name+'</div><div class="col nine">'+
			'<div id="chart-'+row+'" class="bar">'+chart.data[row].views+'</div></div>'+
			'</div></div>'
		);
	
	}

	setTimeout(function(){

		for(var row in chart.data){
	
			$('#chart-'+row).css('width',chart.data[row].perc+'%');
	
		}

	},2000);

	


	dfe.chart = chart;
	
})();
