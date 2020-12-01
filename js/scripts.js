const url = "https://image.tmdb.org/t/p/original";
var auxiliar = 0;
var aux = 0;

//obtener imagenes
/*fetch('https://api.themoviedb.org/3/movie/400160/images?api_key=bdf8db336b65875c23864990d260ea0d&language=en-US&include_image_language=%3Den%2Cnull')
     .then(backdrops => backdrops.json())
     .then(images =>{
         peliculas = images.backdrops;
         //console.log(peliculas);
         //console.log(peliculas[0].file_path);

        document.getElementById('imagen_back').src=url+peliculas[0].file_path;
     });*/

function ObtenerImagenes(ids, name){
    var name = name;
    let ids_peliculas = ids;
    var Img_peliculas = {};
    let contador_de_rutas = 0;
    let img = document.querySelectorAll('.'+name+'__imagen');
    var rutas = [];
    
    for(var i = 0; i < ids_peliculas.length; i++){
        fetch('https://api.themoviedb.org/3/movie/'+ ids_peliculas[i] +'/images?api_key=bdf8db336b65875c23864990d260ea0d&language=en-US&include_image_language=%3Den%2Cnull') 
            .then(backdrops => backdrops.json())
            .then(images =>{
                Img_peliculas = images.backdrops;
                
                rutas.push(url+Img_peliculas[0].file_path);
                img[contador_de_rutas].src=rutas[contador_de_rutas];
                
                if(aux == 0){
                    document.getElementById('imagen_back').src=url+Img_peliculas[0].file_path;
                    aux = 2
                }
            contador_de_rutas++;  
            //console.log(contador_de_rutas);
        });
    }
}


//Más populares
var masPopulares = [];
var id_Peticion_Populares = 0;

function Peticion_Populares(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=bdf8db336b65875c23864990d260ea0d&language=en-US&page=1')
     .then(results => results.json())
     .then(populares =>{
         masPopulares = populares.results;
         
         PeliculasMasPopulares(masPopulares);
         //var id_Pelicula = masPopulares[auxiliar].id
         //ObtenerImagenes(id_Pelicula, id_Peticion_Populares);
     });

}

function PeliculasMasPopulares(masPopulares){
    let genero_peliculas = "masPopular";
    let ids = [];
    //var id_PeliculasMasPopulares = 1;
    //let populares = document.querySelector('.masPopular__figures');
    //console.log(masPopulares);
    let divs = document.querySelectorAll('.masPopular__figures');
    do{
        let nombre = document.createElement('h3');
        var id_Pelicula = masPopulares[auxiliar].id
        //console.log(masPopulares[auxiliar].title);
        
        divs[auxiliar].appendChild(nombre);
        nombre.innerHTML = masPopulares[auxiliar].title;
        nombre.className = 'masPopular__Nombre';

        ids.push(id_Pelicula);
        
        auxiliar++;
    }while(auxiliar < 4)
    auxiliar = 0;
    ObtenerImagenes(ids, genero_peliculas);

    /*masPopulares.map((popular, i) => {
        console.log(popular.title);
        
        let contenedor = document.createElement('div');
        let nombre = document.createElement('h3');
        nombre.innerHTML = popular.title;

        populares.appendChild(contenedor);
        contenedor.appendChild(nombre);
        
        if(i === 4){
            auxiliar = 0;
            break;
        }
    });*/
}

//mejor terror
function PeliculasTerror(peliculas_terror){
    let genero_peliculas = "terror";
    let ids = [];
    let count = 15;
    var divs = document.querySelectorAll('.terror__figures');
    
    do{
        let nombre = document.createElement('h3');
        let id_Pelicula = peliculas_terror[count].id
        
        divs[auxiliar].appendChild(nombre);
        nombre.innerHTML = peliculas_terror[count].title;
        nombre.className = 'terror__Nombre';

        ids.push(id_Pelicula);
        
        count++;
        auxiliar++;
    }while(count < 19)
    auxiliar = 0;
    ObtenerImagenes(ids, genero_peliculas);
}

//solicitar peliculas de terror
function Peticion_Terror(){
    let peliculas_terror = [];
    fetch('https://api.themoviedb.org/3/movie/948/similar?api_key=bdf8db336b65875c23864990d260ea0d&language=en-US&page=1')
     .then(results => results.json())
     .then(pelicula => {
        peliculas_terror = pelicula.results;

        PeliculasTerror(peliculas_terror);
    });
}

//mejor comedia
function PeliculasComedia(peliculas_comedia){
    let genero_peliculas = "comedia";
    let ids = [];
    let count = 16;
    let divs = document.querySelectorAll('.comedia__figures');
    
    do{
        let nombre = document.createElement('h3');
        let id_Pelicula = peliculas_comedia[count].id
        
        divs[auxiliar].appendChild(nombre);
        nombre.innerHTML = peliculas_comedia[count].title;
        nombre.className = 'comedia__Nombre';

        ids.push(id_Pelicula);
        
        count++;
        auxiliar++;
    }while(count <= 19)
    ObtenerImagenes(ids, genero_peliculas);
    auxiliar = 0 ;
}

//solicitar peliculas de comedia
function Peticion_Comedia(){
    let peliculas_comedia = [];
    fetch('https://api.themoviedb.org/3/movie/13499/similar?api_key=bdf8db336b65875c23864990d260ea0d&language=en-US&page=1')
     .then(results => results.json())
     .then(pelicula => {
        peliculas_comedia = pelicula.results;
        PeliculasComedia(peliculas_comedia);
    });
} 


//mejor accion
function PeliculasAccion(peliculas_accion){
    let genero_peliculas = "accion";
    let ids = [];
    let divs = document.querySelectorAll('.accion__figures');
    
    do{
        let nombre = document.createElement('h3');
        let id_Pelicula = peliculas_accion[auxiliar].id
        
        divs[auxiliar].appendChild(nombre);
        nombre.innerHTML = peliculas_accion[auxiliar].title;
        nombre.className = 'accion__Nombre';

        ids.push(id_Pelicula);
        
        auxiliar++;
    }while(auxiliar < 4)
    ObtenerImagenes(ids, genero_peliculas);
    auxiliar = 0 ;
}

//solicitar peliculas de accion
function Peticion_Accion(){
    let peliculas_accion = [];
    fetch('https://api.themoviedb.org/3/movie/956/similar?api_key=bdf8db336b65875c23864990d260ea0d&language=en-US&page=1')
     .then(results => results.json())
     .then(pelicula => {
        peliculas_accion = pelicula.results;
        PeliculasAccion(peliculas_accion);
    });
}


//mejor romance
function PeliculasRomance(peliculas_romance){
    let genero_peliculas = "romance";
    let ids = [];
    let divs = document.querySelectorAll('.romance__figures');
    let contador = 8;
    
    do{
        if(contador == 8 || contador == 11 || contador == 14 || contador == 16){
            let nombre = document.createElement('h3');
            let id_Pelicula = peliculas_romance[contador].id
        
            divs[auxiliar].appendChild(nombre);
            nombre.innerHTML = peliculas_romance[contador].title;
            nombre.className = 'romance__Nombre';
            
            ids.push(id_Pelicula);
            auxiliar++;
        }
        
        contador++;
    }while(contador <= 16)
    
    auxiliar = 0;
    ObtenerImagenes(ids, genero_peliculas);
}

//solicitar peliculas de romance
function Peticion_Romance(){
    let peliculas_romance = [];
    fetch('https://api.themoviedb.org/3/movie/8874/similar?api_key=bdf8db336b65875c23864990d260ea0d&language=en-US&page=1')
     .then(results => results.json())
     .then(pelicula => {
        peliculas_romance = pelicula.results;
        PeliculasRomance(peliculas_romance);
    });
}

//inicio
window.addEventListener('load', () => {
    Peticion_Populares();
    Peticion_Terror();
    Peticion_Comedia();
    Peticion_Accion();
    Peticion_Romance();

});//end load