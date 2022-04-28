//Selectores
const filter = document.querySelector("#filter");
const moviesContainer = document.querySelector(".peliculas-container");
const loading = document.querySelector(".loading");
const movieAlone = document.querySelector(".pelicula-individual");
const noExist = document.querySelector(".no-exist");
//globales

let page = 1;

//handlers logica
// const getMovie = async (id) => {
//   const idResponse = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`
//   );
//   const dataId = await idResponse.json();

//   return dataId; //es un objeto
// };

const getPost = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`
  );

  const data = await response.json();

  return data; //array
};

// const movieDesc = async ({ target }) => {
//   if (target.nodeName !== "IMG") {
//     return;
//   }
//   let movies = await getPost();

//   const posArray = parseInt(target.dataset.id); //pelicula elegida

//   let pagAnt = 0;
//   if (movies.page !== pagAnt) {
//     console.log(movies.page);
//     console.log(pagAnt);
//     pagAnt++;
//     const id = movies.results[posArray].id; //selecciono la pelicula
//     let movie = await getMovie(id);
//     console.log(movie);
//     renderUniqueMovie(movie);
//   }

//   // let movie = await getPost(dato.results.id);
//   // renderUniqueMovie(movie);
// };

const filterPost = ({ target }) => {
  const value = target.value.toUpperCase();
  const movies = document.querySelectorAll(".peliculas");

  let acumFlex = 0;
  for (let movie of movies) {
    const title = movie.querySelector(".titulo").innerText.toUpperCase();

    if (title.includes(value)) {
      acumFlex++;
      movie.style.display = "flex";
    } else {
      movie.style.display = "none";
    }
  }
  if (acumFlex === 0) {
    noExist.style.display = "block";
  } else {
    noExist.style.display = "none";
  }
};

//handlers UI
const renderMovie = (movies) => {
  const moviesHTML = movies.results
    .map((movie, index) => {
      return `
      <div class="peliculas" >
        <img class="portada" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" data-id=${index}/>
        <h3 class="titulo">${movie.title}</h3>
      </div>
    `;
    })
    .join("");

  moviesContainer.innerHTML += moviesHTML;
};

// const renderUniqueMovie = (movies) => {
//   moviesContainer.style.display = "none";
//   const movieHTML = document.createElement("div");
//   movieHTML.classList.add(".pelicula")
//   movieHTML.innerHTML = `
//      <h3 class="titulito">${movies.title}</h3>
//       <img class="portadita" src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" />
//       <p class="articulito">${movies.overview}</p>
//   `;

//   movieAlone.appendChild(movieHTML);

//   if (filter.addEventListener("input", filterPost)) {
//     console.log(filter);
//     movieHTML.removeChild(movieHTML);
//     moviesContainer.style.display = "block";
//   }
// };

const renderLoading = (movies) => {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      renderMovie(movies);
    });
  }, 1000);
};

//init
function init() {
  window.addEventListener("DOMContentLoaded", async () => {
    let movies = await getPost();
    renderMovie(movies);
  });

  // moviesContainer.addEventListener("click", movieDesc);

  window.addEventListener("scroll", async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      page++;
      let movies = await getPost();
      renderLoading(movies);
    }
  });
  filter.addEventListener("input", filterPost);
}

init();
