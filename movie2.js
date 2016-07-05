var n;
var inputted = false;
var startInput = document.getElementById("startInput");
var results = document.getElementById("results");
startInput.onclick = function(){
	
	n = document.getElementById("nom").value;
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
		var num = 0;
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
	//alert('arr is now '+arr);
	return true;
}
function getImdb(name,arr){
	//alert("Inside getImdb");
	//alert("Name is "+name+"<br/>Arr is "+arr);
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				var json = xhttp.responseText;
				var jsonObj = JSON.parse(json);
				if(jsonObj.Response == "True"){
					arr.push({name:name,rati:jsonObj.imdbRating});
					//alert('Arr is '+arr);
					//alert('arr.length is '+arr.length+' n is '+n);
					document.getElementById("error").innerHTML = "";
					if(arr.length == n){
						compareIms(arr);
						return true;
					}
					return true;
				}
				else{
					document.getElementById("error").innerHTML = name+" "+jsonObj.Error;
					arr.push({name:name,rati:-1});
					//alert('Arr is '+arr);
					//alert('arr.length is '+arr.length+' n is '+n);
					if(arr.length == n){
						compareIms(arr);
						return false;
					}
					return false;
				}
			}
		};
		var base_url = "http://www.omdbapi.com/?r=json&t=";
		xhttp.open("GET",base_url+name,true);
		xhttp.send();
		//
}
function compareIms(arr){
	//alert('In compare Ims function');
	
	arr.sort(function(a,b){
		return b.rati-a.rati;
	});
	var coun = 0;
	
	results.innerHTML = "";
	results.innerHTML += "<h3>Results in Descending order of IMDB Rating</h3>"
	
	for(var i=0; i<arr.length; ++i){
		if(arr[i].rati == -1){
			coun++;
			results.innerHTML+="<li>No movie named "+arr[i].name+"</li>";
		}
		else{
			results.innerHTML+="<li>Movie: "+arr[i].name+"  Rating: "+arr[i].rati+"</li>";
		}
	}
	results.innerHTML+="<button id='tryAgain'>Try Again?</button>";
	document.getElementById('tryAgain').onclick = function(){
		location.reload();
	}
	
	alert("Compared "+ (arr.length - coun) +" movies out of "+arr.length);
	return;
}