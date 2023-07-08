

const apikey ="2ad991e4b2eb44468c754a5a87ad8694"
const apiEndpoint ="https://api.themoviedb.org/3"

const imgpath = `https://image.tmdb.org/t/p/original`;





const apiPaths={
  fetchAllcategaries: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
  fetchMoviesList :  (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
  fetchTrending :`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
}



//Boost up the app
function init(){
      FetchTrendingMovies();
      fetchAndBuildAllSection();
}


function FetchTrendingMovies() {
  FetchbuildmovieSection(apiPaths.fetchTrending ,"fetch trending")
  .then(list => {
    buildBanerSection(list[0]);
  }).catch(err =>{
    console.error(err);
  });
}


function buildBanerSection(movie) {
  const bannercont =document.getElementById('banner-section');
  bannercont.style.backgroundImage = `url('${imgpath}${movie.backdrop_path}')`;

  const div =document.createElement('div');
  div.innerHTML =` <h2 class="banner_title">${movie.title} </h2>
  <p class="banner_info">relased-${movie.released}</p>
  <p class="banner_overview">${movie.overview}</p>
  <div class="action-button-cont">
      <button class="action-button">Play</button>
      <button class="action-button">More Info</button>
  </div> `;

  div.className ="banner-content Container";

  bannercont.append(div);
}




function fetchAndBuildAllSection(){
  fetch(apiPaths.fetchAllcategaries)
      .then(res => res.json())
      .then(res =>{
     const Categories =  res.genres;
      if(Array.isArray(Categories) && Categories.length){
        Categories.forEach(Category =>{
          FetchbuildmovieSection(
            apiPaths.fetchMoviesList(Category.id), Category.name);
        });
         
      }
      console.log(category.name);

      })

       
       
      .catch(error => console.log(error));
}


function FetchbuildmovieSection( fetchUrl , categoryName){
  console.table( fetchUrl ,categoryName);
  return fetch(fetchUrl)
  .then(res => res.json())
  .then(res => {
    //console.table(res.results);
    const movies= res.results
    if (Array.isArray(movies) && movies.length) {
        buildmoviesSection(movies.slice(0,6), categoryName);      
    }
    return movies;
  })
  .catch(err => console.error(err))
}



function buildmoviesSection(list,categoryName)
{
  console.log(list,categoryName);

  const moviescont=document.getElementById('movies-cont');

   const movielistHTML = list.map(item =>{
   return `
    <img class="movie-item" src="${imgpath}${item.backdrop_path}" alt="${item.title}">
    `;
  }) .join(``);
    
const moviesSectionList = `


 <h2 class="movies-section-heading">${categoryName} <span class="explore-nuge">Explore All</span></h2>

 <div class="movies-row">
  ${movielistHTML}

 </div>

`;

   console.table(movielistHTML);
  console.log(moviesSectionList);


  const div = document.createElement('div');
  div.className = "movies-section"
  div.innerHTML = moviesSectionList;


  //append html into movies container//

moviescont.append(div);



}


//  <div class="movies-section">
// <h2 class="movies-section-heading">Trending Now <span class="explore-nuge">Explore All</span></h2>
// <div class="movies-row">
//     <img class="movie-item" src="https://occ-0-2186-2164.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABT9iP5J7c_ggE291IdoKeHVz0YMX1WfvR-cVgD8r9xJVlPJXqVrIB7JAU2w7HuSYmSD9jRRBXZfSvpdwy58qfrMpT3PVH99tuJ0.jpg?r=793" alt="">
//     <img class="movie-item" src="https://occ-0-2186-2164.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABd7yGfxi5Z3Hlv3TMOq4MzZFmtsdviv1FUDWEi-1AJ1bcsnTM56uG8u3OhN62WjEqYXlnaUuIEMkLytDXSnreO-G2PCqzC8pQv54SMLtp26y-zqJjSPxW1jFBXVTGas0lcX7.jpg?r=db4" alt="">
//      <img class="movie-item" src="https://occ-0-2186-2164.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABSLPVz352-RTwdUHmERXPE9jYP6sk_wTg7m92c2h_s-sV33VMT67yLQXJek9O2xdk7HJObneJoZYhgDakDfo6nv8CtZ_0RHbkls.jpg?r=969" alt="">
//      <img class="movie-item" src="https://occ-0-2186-2164.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABT9iP5J7c_ggE291IdoKeHVz0YMX1WfvR-cVgD8r9xJVlPJXqVrIB7JAU2w7HuSYmSD9jRRBXZfSvpdwy58qfrMpT3PVH99tuJ0.jpg?r=793" alt="">
//      <img class="movie-item" src="https://occ-0-2186-2164.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABd7yGfxi5Z3Hlv3TMOq4MzZFmtsdviv1FUDWEi-1AJ1bcsnTM56uG8u3OhN62WjEqYXlnaUuIEMkLytDXSnreO-G2PCqzC8pQv54SMLtp26y-zqJjSPxW1jFBXVTGas0lcX7.jpg?r=db4" alt="">
      
// </div>
// </div> 







window.addEventListener('load',function () {
    init();
});
