const td = function(text) {
  return '<td>' + text + '</td>';
};

//Variables globales
const queryParams = new URLSearchParams(window.location.search);
const gameId = queryParams.get('id');
let arrayPlatformId = [];
let elementoArrayPlatformId = {}
let tableProductWithContent = false;
//Array de objetos de imagenes
let imagesPlatform = [
  {
    idPlatf: 1,
    imagePlatf: 'xboxone.jpg', 
  },
  {
    idPlatf: 3,
    imagePlatf: 'ios.jpg', 
  },
  {
    idPlatf: 4,
    imagePlatf: 'pc.jpg', 
  },
  {
    idPlatf: 5,
    imagePlatf: 'mac.jpg', 
  },
  {
    idPlatf: 7,
    imagePlatf: 'switch.jpg', 
  },
  {
    idPlatf: 10,
    imagePlatf: 'wiiu.jpg', 
  },
  {
    idPlatf: 11,
    imagePlatf: 'wii.jpg', 
  },
  {
    idPlatf: 14,
    imagePlatf: 'xbox360.jpg', 
  },
  {
    idPlatf: 16,
    imagePlatf: 'playstation3.jpg', 
  },
  {
    idPlatf: 18,
    imagePlatf: 'playstation4.jpg', 
  },
  {
    idPlatf: 21,
    imagePlatf: 'android.jpg', 
  },
  {
    idPlatf: 27,
    imagePlatf: 'playstation.jpg', 
  },
  {
    idPlatf: 49,
    imagePlatf: 'nes.jpg', 
  },
  {
    idPlatf: 79,
    imagePlatf: 'snes.jpg', 
  }, 
  {
    idPlatf: 83,
    imagePlatf: 'n64.jpg', 
  },
  {
    idPlatf: 106,
    imagePlatf: 'dreamcast.jpg', 
  }, 
  {
    idPlatf: 166,
    imagePlatf: 'commodore.jpg', 
  },         
  {
    idPlatf: 186,
    imagePlatf: 'xboxseriesx.jpg', 
  },
  {
    idPlatf: 187,
    imagePlatf: 'playstation5.jpg', 
  },  
];


document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  
  getGame();
  
});

getGame = () => { 
    let URL_DETAIL_GAME ="https://api.rawg.io/api/games/" + gameId + "?key=0e41ee02d03a43a1a26a1587ac2e2d74";

    fetch(URL_DETAIL_GAME)
      .then(response => response.json())
      .then(data => {
        console.log('Lista de juegos:', data); 
        let viewGame = data; 
        gameDetails(viewGame)
      });

}

gameDetails = (viewGame) => {
    console.log('Llamada a la función pintar lista de juegos', viewGame);
  // Array de plataformas   
    const platforms = viewGame.platforms;
    // Destructurar el objeto Game
    const {
        name,
        description,
        released,
        metacritic,
        playtime,
        website,
        background_image,
        achievements_count,
        reddit_url
      
    } = viewGame
  

    //Contruimos primero la linea de imagen
    const nameImage = document.getElementById('srcImage');
    nameImage.innerHTML += `<img class="game-image" src="${background_image || './img/halo3.jpg'}" alt="${name}">`;

    // construccion de la tabla
    const productTable = document.getElementById('tableBodyView');
    const row = document.createElement('tr');
    row.innerHTML = '<td>Name: </td>' +
                    td(name);
    productTable.appendChild(row);
    const row1 = document.createElement('tr');
    row1.innerHTML = '<td>Descripcion: </td>' +
                    td(description || "Description field empty in API");
    productTable.appendChild(row1);
    const row2 = document.createElement('tr');
    row2.innerHTML = '<td>Released: </td>' +
                    td(released || "Date released field empty in API");
    productTable.appendChild(row2);
    const row3 = document.createElement('tr');
    row3.innerHTML = '<td>Metacritic: </td>' +
                    td(metacritic || "Rated field empty in API");
    productTable.appendChild(row3);
    const row4 = document.createElement('tr');
    row4.innerHTML = '<td>Playtime: </td>' +
                    td(playtime || "Playtime field empty in API");
    productTable.appendChild(row4);
    const row5 = document.createElement('tr');   
    row5.innerHTML = '<td>Achievements: </td>' +
                    td(achievements_count || "Achivements field empty in API");
    productTable.appendChild(row5);
    const row6 = document.createElement('tr');   
    row6.innerHTML = '<td>Website: </td>' +
                    td(website || "Website field empty in API");
    productTable.appendChild(row6);
    const row7 = document.createElement('tr');   
    row7.innerHTML = '<td>Reddit url: </td>' +
                    td(reddit_url || "Reddit url field empty in API");
    productTable.appendChild(row7);
    const row8 = document.createElement('tr');  
    //Hago un array de objetos para relacionar id y nombre
    //array de plataformas, dentro de la estructura de datos quiero saber el nombre de las plataformas donde esta el juego
      platforms.forEach((platform, index) => {
        elementoArrayPlatformId = {
        id: platform.platform.id,
        namePlatform : platform.platform.name
      };
      arrayPlatformId[index]= elementoArrayPlatformId;
    });

    row8.innerHTML = '<td>Platforms</td>'; 
      
    arrayPlatformId.forEach((item, ind) => {
      if (ind === 0) {
        row8.innerHTML += '<a class="element-array" href="javascript:readPlatform(\'' + arrayPlatformId[ind].namePlatform + '\')">' + arrayPlatformId[ind].namePlatform + '</a>';
      } else {
        row8.innerHTML += '<a class="element-array" href="javascript:readPlatform(\'' + arrayPlatformId[ind].namePlatform + '\')">' + "  " + arrayPlatformId[ind].namePlatform  + '</a>'
      }
    })
    productTable.appendChild(row8);

    const noDisplayPlatform = document.getElementById('display-table-platform');
    noDisplayPlatform.classList.add('tablePlatform-no-display');
    
}
  

function readPlatform(platformName) {

   // Recorro el array para ver si esta lleno
   console.log("llamada a la funcion de detalle de la plataforma: " + platformName);
   arrayPlatformId.forEach((item, ind) => {
    if (platformName === arrayPlatformId[ind].namePlatform) {
      console.log("id de la plataforma: " + arrayPlatformId[ind].id);
        let URL_DETAIL_PLATFORM ="https://api.rawg.io/api/platforms/" + arrayPlatformId[ind].id + "?key=0e41ee02d03a43a1a26a1587ac2e2d74";
        console.log("fetch para la plataforma: " + URL_DETAIL_PLATFORM);
        fetch(URL_DETAIL_PLATFORM)
        .then(response => response.json())
        .then(data => {
            let platformData = data; 
            platformImage(arrayPlatformId[ind].id)
            platformDetails(platformData);
        })  
            .catch(error => {
                alert('Error en la solicitud:' + error); 
        });

   
    } 
  })
          
 
};

platformImage = (idP) => {
  // Borro la imagen anterior si esta construida
  if (tableProductWithContent) {
    const eraseTitleImage = document.getElementById('titlePlatform');
    eraseTitleImage.innerHTML = '';
    const eraseImage = document.getElementById('srcImagePlatform');
    eraseImage.innerHTML = '';
  };

  const noDisplayImagePlatform = document.getElementById('display-image-platform');
  noDisplayImagePlatform.classList.remove('tablePlatform-no-display')
  noDisplayImagePlatform.classList.add('tablePlatform-display')
  //Display de la imagen de la plataforma
  const titleImagePlatform = document.getElementById('titlePlatform');
  titleImagePlatform.innerHTML += `<h4>Platform Picture</h4>`;
  const nameImagePlatform = document.getElementById('srcImagePlatform');

  //Busco la imagen en mi array de imagenes
  let image_platform = 'no_image.jpg';
  imagesPlatform.forEach((item, ind) => {
    if (idP === imagesPlatform[ind].idPlatf) {
       image_platform = imagesPlatform[ind].imagePlatf
    }    
  })
  nameImagePlatform.innerHTML += `<img class="game-image" src="./img/${image_platform}" alt="${image_platform}">`;
}  

platformDetails = (platformData) => {
  console.log('Llamada a la función pintar plataformas de juegos', platformData);
      
  // Destructurar el objeto Game
  const {
    name,
    description,
    games_count,
    image_background,
    year_start,
    year_end

  } = platformData;
  
  
  // Borro la tabla anterior si esta construida
  if (tableProductWithContent) {
    const eraseTitle = document.getElementById('titleDetails');
    eraseTitle.innerHTML = '';
    const eraseTable = document.getElementById('tableBodyViewPlatform');
    eraseTable.innerHTML = '';
  };

  const noDisplayPlatform = document.getElementById('display-table-platform');
  noDisplayPlatform.classList.remove('tablePlatform-no-display')
  noDisplayPlatform.classList.add('tablePlatform-display')
  

  const titleDetailsPlatform = document.getElementById('titleDetails');
  titleDetailsPlatform.innerHTML += `<h4>Platform Details</h4>`;
  
  

  // construccion de la tabla
  const productTable = document.getElementById('tableBodyViewPlatform');
  const rowP = document.createElement('tr');
  rowP.innerHTML = '<td>Name: </td>' +
                  td(name);
  productTable.appendChild(rowP);
  const rowP1 = document.createElement('tr');
  rowP1.innerHTML = '<td>Descripcion: </td>' +
                  td(description || "Description field is empty");
  productTable.appendChild(rowP1);
  //No salen bien los datos en la API de las Fechas, los elimino
  // const rowP2 = document.createElement('tr');
  // rowP2.innerHTML = '<td>Year Start: </td>' +
  //                 td(year_start);
  // productTable.appendChild(rowP2);
  // const rowP3 = document.createElement('tr');
  // rowP3.innerHTML = '<td>Year   End: </td>' +
  //                 td(year_end);
  // productTable.appendChild(rowP3);
  const rowP4 = document.createElement('tr');
  rowP4.innerHTML = '<td>Games Count: </td>' +
                  td(games_count);
  productTable.appendChild(rowP4);
  tableProductWithContent = true;
          
}
          


  

  