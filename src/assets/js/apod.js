const apiKey = "nTiC3UmNgbVylmcaxKegsY9cmVjAhSC3qZc8bIOI";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;



async function fetchAPOD(){
	try{
		const response = await fetch(apiUrl);
		const data = await response.json();
		
		document.getElementById("title").textContent = data.title;
		document.getElementById("description").textContent = data.explanation;

		if(data.media_type == "image"){
			document.getElementById("video-container").innerHTML = "";
			document.getElementById("image-container").innerHTML = `<img src="${data.url}" alt ="${data.title}">`;
		}else if (data.media_type == "video"){
			document.getElementById("image-container").innerHTML = "";
			document.getElementById("video-container").innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
		}
		console.log(data);
	}catch(error){
		console.error("Erreur lors du chargement de l'APOD : ",error);
	}
}


fetchAPOD();
