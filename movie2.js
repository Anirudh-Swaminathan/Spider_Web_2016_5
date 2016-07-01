var n;
var inputted = false;
var startInput = document.getElementById("startInput");
var results = document.getElementById("results");
startInput.onclick = function(){
	
	n = document.getElementById("nom").value;
	
	alert("n is "+n);
	alert("typeof n is "+typeof(n));
	if(n<=1){
		alert('Please enter a number greater than 1');
	}
	else if(n>20){
		alert('Max limit is 20');
	}
	else{
		for(var i=0; i<n; ++i){
			results.innerHTML += "<input type='text' class='titles' id='titl"+i+"' placeholder='Enter movie name'/><br/><br/>";
		}
		results.innerHTML += "<p id='error'></p>";	
		results.innerHTML += "<button id='compare'>Sort Movies</button>";
		inputted = true;
		document.getElementById("nom").style.visibility = "hidden";
		startInput.style.visibility = "hidden";
	}
}
if(inputted){
	var c = document.getElementById('compare');
	c.onclick = function(){
		alert('Comparing');
		inputted = false;
		results.innerHTML = "<p id='error'></p>";
		document.getElementById("nom").style.visibility = "visible";
		startInput.style.visibility = "visible";
	}
}