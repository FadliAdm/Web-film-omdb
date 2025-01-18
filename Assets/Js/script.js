const searchButton = document.querySelector(".input-button")
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const pages = document.querySelector('.page')

let page = 1;
const searchQuery = "movie";
const apiKey = "b3ddf57c";

//Tampilkan Page Awal
async function showPage (page) {
  const mov = await fetchPage(page);
   updatePageUi(mov) 
}
showPage(page)
//Tampilkan Page Awal end

  //Ketika Tombol Next di klik
next.addEventListener("click", async function(){
  page+=1;
  if (page > 1) {
    pages.innerHTML = page;
    const mov = await fetchPage(page);
   updatePageUi(mov) 
  }
})
//Ketika tombol next End

//ketika tombol prev di klik
prev.addEventListener('click', async function(){
  page -= 1;
  if (page >= 1) {
    pages.innerHTML = page;
    const mov = await fetchPage(page);
   updatePageUi(mov) 
    
  }
})

//ketika user mengisi input keyword
searchButton.addEventListener("click", async function(){
  const inputKeyword = document.querySelector('.input-keyword')
  //melakukan requst api
  const movies = await fetchMovie(inputKeyword.value);
  //Tampilkan film ke document
  updateUi(movies);
})


//ketika tombol selengkapnya di klik
document.addEventListener('click', async function(ev){
    if (ev.target.classList.contains('modal-detail-button')) {
      const imdbId= ev.target.dataset.imdbid;
      const detail = await fetchDetail(imdbId)
       uiDetail(detail);
    }
})








function fetchPage (page) {
  return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&page=${page}`)
  .then(response => response.json())
  .then(response => response.Search )
}

function updatePageUi(mov) {
  let card = '';
  mov.forEach(m => card += showCards(m))
  const mContainer = document.querySelector('.movie-container')
  mContainer.innerHTML = card;
}

function uiDetail (m){
  const modalBody = document.querySelector('.modal-body')
  modalBody.innerHTML = showMovieDetails(m);
}

function fetchDetail(imdbid) {
  return fetch('https://www.omdbapi.com/?apikey=b3ddf57c&i=' + imdbid)
     .then(m => m.json())
     .then(m => m)
}

function updateUi(movies){
  let card = '';
  movies.forEach(m => card += showCards(m))
  const movieContainer = document.querySelector('.movie-container')
  movieContainer.innerHTML = card;
}

function fetchMovie(value){
  return fetch('https://www.omdbapi.com/?apikey=b3ddf57c&s=' + value)
    .then(response => response.json())
    .then( response => response.Search)
}

function showCards({Poster, Title, Year, imdbID}) {
  return `<div class="col-md-4 my-3">
          <div class="card">
            <img src="${Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                ${Year}
              </h6>
              <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                data-bs-target="#movieDetailModal" data-imdbid="${imdbID}">Selengkapnya</a>
            </div>
          </div>
        </div>`;
}

function showMovieDetails({Poster, Title, Director, Writer, Plot, Actors}) {
  return ` <div class="container            -fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${Title}</h4></li>
                    <li class="list-group-item">
                      <strong>Director : </strong> ${Director}
                    </li>
                    <li class="list-group-item">
                      <strong>Actors : </strong> ${Actors} 
                    </li>
                    <li class="list-group-item">
                      <strong>Writer : </strong> ${Writer}
                    </li>
                    <li class="list-group-item">
                      <strong>Plot : </strong><br />${Plot}
                    </li>
                  </ul>
                </div>
              </div>
            </div>`;
}