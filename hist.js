var data;

// bin structure object
function BinInfo(){
	this.names  = new Array();
	this.counts = [];
}

function addTableRows(){
	var table = document.getElementById("table_data");

	// remove old rows
	while(table.hasChildNodes()){
		table.removeChild(table.firstChild);
	}

	//add new rows
	for(var i=0; i<data.length; i++){
		var row  = table.insertRow(-1);
		var cell = row.insertCell(-1);
		cell.innerHTML = data[i];
	}
}

function setBins(){

	var low   = document.getElementById("low").value;
	var width = document.getElementById("width").value;
	var max   = document.getElementById("max").value;
	bins = new BinInfo();
	for(var i=0; i<max; i++){
		var current = +(low)+((i)*+(width));
		var upper   = +(low)+((i+1)*+(width));
		bins.names[i] = current.toString() +"-"+ upper.toString();

		// increment bin values based on data (not optimal but the quick answer)
		for(var j=0; j<data.length; j++){
			if(data[j]<= upper && data[j] >=current){
				bins.counts[i]+=1;
				alert(bins.counts[i])
			}
		}
	}

	return bins;
}

function drawHisto(){

	// setup all the correct bin increments
	var bins = setBins();
	alert("blah")
	alert(bins.counts);
	plots = {
		labels : bins.names,
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				scaleOverlay : true,
	
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : true,
				data : bins.counts
			},
		]
	}

	var ctx   = document.getElementById("cvs").getContext("2d");
	var histo = new Chart(ctx).Bar(plots);

}


$('#paste').bind('input propertychange', function() {
	if(this.value!= ""){
		data = this.value.match(/\S+/g);
		addTableRows();
		drawHisto();
	}
});

$('input').click(function() {
	this.select();
});

$('.settings').bind('input propertychange', function() {
	if(this.value!= ""){
		drawHisto();
	}
});










