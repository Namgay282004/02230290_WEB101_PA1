// document.addEventListener('DOMContentLoaded', function() {
//     loadFavorites();

//     // Add event listener for "All" button redirection
//     const allButton = document.getElementById('all-button');
//     if (allButton) {
//         allButton.addEventListener('click', function() {
//             window.location.href = 'index.html';
//         });
//     }
// });

// function loadFavorites() {
//     const favorites = JSON.parse(localStorage.getItem("favoritePokemon")) || {};
//     const container = document.getElementById("favorite-pokemon-container");
//     const favoriteCountElement = document.getElementById("favourite-count"); // Ensure you have this element on favourite.html

//     Object.values(favorites).forEach(pokemonData => {
//         const pokemonBox = createFavoritePokemonBox(pokemonData, favoriteCountElement);
//         container.appendChild(pokemonBox);
//     });
// }

// function createFavoritePokemonBox(pokemonData, favoriteCountElement) {
//     const pokemonBox = document.createElement("div");
//     pokemonBox.classList.add("pokemon-box");

//     const favoriteIcon = document.createElement("i");
//     favoriteIcon.classList.add("fas", "fa-star", "favorite-icon");
//     favoriteIcon.classList.add("active"); // This icon starts as active because it's a favorite
//     favoriteIcon.onclick = function(event) {
//         event.stopPropagation();
//         event.preventDefault();
//         this.classList.toggle("active");
//         removeFavoritePokemon(pokemonData.name, favoriteCountElement);
//     };

//     const pokemonImage = document.createElement("img");
//     pokemonImage.src = pokemonData.sprites.front_default;
//     pokemonImage.alt = pokemonData.name;

//     const pokemonName = document.createElement("p");
//     pokemonName.textContent = capitalizeFirstLetter(pokemonData.name);

//     pokemonBox.appendChild(favoriteIcon);
//     pokemonBox.appendChild(pokemonImage);
//     pokemonBox.appendChild(pokemonName);

//     return pokemonBox;
// }

// function removeFavoritePokemon(pokemonName, favoriteCountElement) {
//     let favoritePokemon = JSON.parse(localStorage.getItem("favoritePokemon"));
//     if (favoritePokemon && favoritePokemon[pokemonName]) {
//         delete favoritePokemon[pokemonName];
//         localStorage.setItem("favoritePokemon", JSON.stringify(favoritePokemon));
//         updateFavoriteCount(favoriteCountElement);
//         loadFavorites(); // Reload favorites to update the UI
//     }
// }

// // Function to update favorite count
// function updateFavoriteCount(favoriteCountElement) {
//     const activeFavorites = document.querySelectorAll(".favorite-icon.active");
//     favoriteCountElement.textContent = activeFavorites.length;
// }

// // Function to capitalize first letter
// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }


// Load favorite Pokémon from local storage and display them
document.addEventListener('DOMContentLoaded', function() {
    const favoritePokemon = JSON.parse(localStorage.getItem("favoritePokemon")) || {};
    const favoritePokemonContainer = document.getElementById("favorite-pokemon-container");

    Object.keys(favoritePokemon).forEach(pokemonName => {
        // Fetch Pokémon details
        fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(pokemonData => {
                const pokemonBox = createPokemonBox(pokemonData);
                favoritePokemonContainer.appendChild(pokemonBox);
            })
            .catch(error => console.error("Failed to fetch Pokémon details:", error));
    });
});
