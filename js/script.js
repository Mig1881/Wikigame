const URL_LIST_GAMES ='https://api.rawg.io/api/games?key=0e41ee02d03a43a1a26a1587ac2e2d74&page_size=40&ordering=-metacritic';

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    getGames();
    
});

getGames = () => {
    console.log('Llamada a la función Getgames()');

    fetch(URL_LIST_GAMES)
      .then(response => response.json())
      .then(data => {
        console.log('Lista de juegos:', data); // Importante para saber cómo vienen los datos organizados en el json
        let arrayGames = data.results; 
        gameList(arrayGames)
      });

}

gameList = (arrayGames) => {
    console.log('Llamada a la función pintar lista de juegos', arrayGames);
           
    main.innerHTML = ''
    arrayGames.forEach(games => {
        const gameEl = document.createElement('div')
        gameEl.classList.add('game')
        gameEl.innerHTML = `
            <img src="${games.background_image || './img/halo3.jpg'}" alt="${games.name}">
            <div class="game-info">
                <h4><a href="viewgame.html?id=${games.id}">${games.name || "Name field empty in API"}</a><h4>
                <span class="${getClassByRate(games.metacritic)}">${games.metacritic || "No Rate"}</span>
            </div>
            <div class="overview">
                <p>Released: ${games.released + ' Playtime: ' + games.playtime}</p>
            </div>`
        
        main.appendChild(gameEl)
                
    })
}
  

function getClassByRate(vote) {
    if(vote >= 90) {
        return 'green'
    } else if(vote >= 80) {
        return 'orange'
    } else if(vote >= 60) {  
        return 'yellow'  
    } else {
        return 'red'
    }
}

 
 
searchGame = () => {
    console.log("llamada a la funcion searhGame");
    let stringSearch = document.getElementById('search').value;
    if (stringSearch !== undefined){
        let URL_DETAIL_GAME ='https://api.rawg.io/api/games?key=0e41ee02d03a43a1a26a1587ac2e2d74&search=' + stringSearch +'&page_size=40&ordering=-metacritic';
        fetch(URL_DETAIL_GAME)
        .then(response => response.json())
        .then(data => {
            let arraySearch = data.results; 
            gameList(arraySearch)
        })  
            .catch(error => {
                alert('Error en la solicitud:' + error);
                getGames();  
        });

    }
}


  

  

  