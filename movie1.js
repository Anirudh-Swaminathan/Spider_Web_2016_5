var ser = document.getElementById("search");
var query = document.getElementById("serText");
ser.onclick = function(){
	
	//If the query is not null,get details
	if(query.value !== ""){
		
		//AJAX for fetching data
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				var json = xhttp.responseText;
				var jsonObj = JSON.parse(json);
				if(jsonObj.Response == "True"){
					document.getElementById("title").innerHTML = jsonObj.Title;
					document.getElementById("plot").innerHTML = jsonObj.Plot;
					document.getElementById("rating").innerHTML = jsonObj.imdbRating;
					document.getElementById("type").innerHTML = jsonObj.Type;
					document.getElementById("genre").innerHTML = jsonObj.Genre;
					document.getElementById("error").innerHTML = "";
					document.getElementById("poster").src = jsonObj.Poster;
					var act = jsonObj.Actors.split(",");
					document.getElementById("actors").innerHTML = "<h4>Actors</h4>";
					for(var i=0; i<act.length; ++i){
						document.getElementById("actors").innerHTML+="<li>"+act[i]+"</li>";
					}
				}
				else{
					document.getElementById("title").innerHTML = "";
					document.getElementById("plot").innerHTML = "";
					document.getElementById("rating").innerHTML = "";
					document.getElementById("type").innerHTML = "";
					document.getElementById("genre").innerHTML = "";
					document.getElementById("error").innerHTML = jsonObj.Error;
					document.getElementById("poster").src = "images/error.png";
					document.getElementById("actors").innerHTML = "";
				}
			}
		};
		var base_url = "http://www.omdbapi.com/?r=json&t=";
		xhttp.open("GET",base_url+query.value,true);
		xhttp.send();
	}
}