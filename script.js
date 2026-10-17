let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const apiKey = "4e8a73a7";

const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const movieDetails = document.getElementById("movieDetails");


searchBtn.addEventListener("click", searchMovie);


movieInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        searchMovie();
    }

});



function searchMovie() {

    const movieName = movieInput.value.trim();


    if (movieName === "") {

        alert("Please enter a movie name");
        return;

    }



    movieDetails.innerHTML = `
        <h2>Searching movie... 🍿</h2>
    `;



    fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`)


    .then(response => response.json())


    .then(data => {



        if (data.Response === "False") {


            movieDetails.innerHTML = `

                <h2>Movie not found 😢</h2>
                <p>Try another movie name</p>

            `;


            return;

        }




        movieDetails.innerHTML = "";



        data.Search.forEach(movie => {



            movieDetails.innerHTML += `


            <div class="movie-card">


                <img src="${movie.Poster}">


                <h2>${movie.Title}</h2>


                <p>Year: ${movie.Year}</p>


                <button onclick="getMovieDetails('${movie.imdbID}')">

                    View Details 🎬

                </button>


            </div>


            `;



        });



    })


    .catch(error => {


        movieDetails.innerHTML = `

            <h2>Something went wrong ❌</h2>

            <p>Please check your internet connection</p>

        `;


        console.log(error);


    });


}




function getMovieDetails(id) {


    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)


    .then(response => response.json())


    .then(data => {



        movieDetails.innerHTML = `


            <img src="${data.Poster}" width="250">


            <h2>${data.Title}</h2>


            <p><b>Year:</b> ${data.Year}</p>


            <p><b>Genre:</b> ${data.Genre}</p>


            <p><b>Director:</b> ${data.Director}</p>


            <p><b>Actors:</b> ${data.Actors}</p>


            <p><b>IMDb Rating:</b> ⭐ ${data.imdbRating}</p>


            <p><b>Plot:</b> ${data.Plot}</p>



            <button id="favBtn">

                ❤️ Add to Favorites

            </button>


        `;




        document.getElementById("favBtn")
        .addEventListener("click", () => {



            const alreadyExists = favorites.some(

                movie => movie.imdbID === data.imdbID

            );



            if (!alreadyExists) {


                favorites.push(data);


                localStorage.setItem(

                    "favorites",

                    JSON.stringify(favorites)

                );


                alert("Movie added to Favorites ❤️");



            } else {


                alert("Movie already in Favorites!");

            }



        });



    });


}






// Dark Mode

const themeBtn = document.getElementById("themeBtn");


if (themeBtn) {


    themeBtn.addEventListener("click", () => {


        document.body.classList.toggle("dark");



        if (document.body.classList.contains("dark")) {


            themeBtn.innerHTML = "☀️ Light Mode";


        } else {


            themeBtn.innerHTML = "🌙 Dark Mode";


        }


    });


}