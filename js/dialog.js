$(function() {
	$( "#dialog-1" ).dialog({
	   autoOpen: false, 
	   modal:true 
	});
	$( "#opener" ).click(function() {
	   $( "#dialog-1" ).dialog( "open" );
	});
 });