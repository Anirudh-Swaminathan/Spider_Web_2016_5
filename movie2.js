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
		results.innerHTML += "<button id='compareMov'>Sort Movies</button>";
		inputted = true;
		document.getElementById("nom").style.visibility = "hidden";
		startInput.style.visibility = "hidden";
		var arr = [];
		document.getElementById('compareMov').onclick = function(){
			arr = [];
			var bo = compareMovies(arr);
			if(bo){
				alert("Going to compare");
			}
			else{
				alert("Not Comparing");
			}
		}
	}
}
function compareMovies(arr){
	//alert('Comparing');
	for(var i=0; i<n; ++i){
		var name = document.getElementById("titl"+i).value;
		//alert("Name now is "+name);
		if(name === ""){
			arr = [];
			alert("Enter all movies names");
			return false;
		}
		var imd = getImdb(name,arr);
	}
	alert('arr is now '+arr);
	return true;
}
function getImdb(name,arr){
	alert("Inside getImdb");
	alert("Name is "+name+"<br/>Arr is "+arr);
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				var json = xhttp.responseText;
				var jsonObj = JSON.parse(json);
				if(jsonObj.Response == "True"){
					arr.push({name:name,rati:jsonObj.imdbRating});
					document.getElementById("error").innerHTML = "";
					alert("Arr is now "+arr+"\nFor name "+name);
					alert("arr["+name+"] is "+arr[0].rati);
					return true;
				}
				else{
					document.getElementById("error").innerHTML = jsonObj.Error;
					return false;
				}
			}
		};
		var base_url = "http://www.omdbapi.com/?r=json&t=";
		xhttp.open("GET",base_url+name,true);
		xhttp.send();
		alert('Arr is '+arr);
}
