let favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];

let container = document.getElementById("favoriteMovies");

let count = document.getElementById("favoriteCount");



function displayFavorites() {

    container.innerHTML = "";


    // Update count
    count.innerHTML = `Total Favorites: ${favoriteMovies.length} 🎬`;



    // Empty favorites check
    if (favoriteMovies.length === 0) {

        container.innerHTML = `

            <h2>No favorite movies yet 😢</h2>
            <p>Add movies to see them here ❤️</p>

        `;

        return;

    }



    favoriteMovies.forEach((movie,index)=>{


        container.innerHTML += `

        <div class="movie-card">

            <img src="${movie.Poster}">

            <h2>${movie.Title}</h2>

            <p>⭐ ${movie.imdbRating}</p>


            <button onclick="removeFavorite(${index})">
                ❌ Remove
            </button>


        </div>

        `;


    });


}




function removeFavorite(index){


    favoriteMovies.splice(index,1);


    localStorage.setItem(
        "favorites",
        JSON.stringify(favoriteMovies)
    );


    displayFavorites();

}




function clearFavorites(){


    if(favoriteMovies.length === 0){

        alert("No favorites to clear!");

        return;

    }



    let confirmDelete = confirm(
        "Remove all favorite movies?"
    );



    if(confirmDelete){


        favoriteMovies = [];


        localStorage.setItem(
            "favorites",
            JSON.stringify(favoriteMovies)
        );


        displayFavorites();

    }


}



// Back to Home/Search page

function goHome(){

    window.location.href = "index.html";

}



displayFavorites();