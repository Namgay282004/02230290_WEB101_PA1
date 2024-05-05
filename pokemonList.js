// Function to create a Pokémon box with favorite icon
function createPokemonBox(pokemonData, favoriteCountElement) {
    const pokemonBox = document.createElement("a");
    pokemonBox.href = `pokemon-detail.html?name=${pokemonData.name}`;
    pokemonBox.classList.add("pokemon-box");

    const favoriteIcon = document.createElement("i");
    favoriteIcon.classList.add("fas", "fa-star", "favorite-icon");
    favoriteIcon.onclick = function(event) {
        event.stopPropagation(); // Prevent the event from bubbling up
        event.preventDefault(); // Prevent the default link behavior
        this.classList.toggle("active");
        updateFavoriteCount(favoriteCountElement); // Update favorite count and store favorite Pokémon
        storeFavoritePokemon(pokemonData.name);
    };

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.alt = pokemonData.name;

    const pokemonName = document.createElement("p");
    pokemonName.textContent = capitalizeFirstLetter(pokemonData.name); 

    pokemonBox.appendChild(favoriteIcon);
    pokemonBox.appendChild(pokemonImage);
    pokemonBox.appendChild(pokemonName);

    return pokemonBox;
}

// Function to update favorite count
function updateFavoriteCount(favoriteCountElement) {
    const activeFavorites = document.querySelectorAll(".favorite-icon.active");
    favoriteCountElement.textContent = activeFavorites.length;
}

// Function to store favorite Pokémon in local storage
function storeFavoritePokemon(pokemonName) {
    let favoritePokemon = JSON.parse(localStorage.getItem("favoritePokemon")) || {};
    if (!favoritePokemon[pokemonName]) {
        favoritePokemon[pokemonName] = true;
        localStorage.setItem("favoritePokemon", JSON.stringify(favoritePokemon));
    }
}

// Function to fetch Pokémon data
async function fetchPokemonData(url) {
    const response = await fetch(url);
    return response.json();
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to load all Pokémon
async function loadAllPokemon(limit = 20, offset = 0) {
    let totalPokemonCount = 0; 
    let loadedPokemonCount = 0; 

    const totalCountResponse = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const totalCountData = await totalCountResponse.json();
    totalPokemonCount = totalCountData.count;

    while (loadedPokemonCount < totalPokemonCount) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const pokemonContainer = document.getElementById("pokemon-container");
        const favoriteCountElement = document.getElementById("favourite-count");

        for (const pokemon of data.results) {
            const pokemonData = await fetchPokemonData(pokemon.url);
            const pokemonBox = createPokemonBox(pokemonData, favoriteCountElement);
            pokemonContainer.appendChild(pokemonBox);
            loadedPokemonCount++;
        }

        offset += limit;
    }
}

// Function to get Pokémon by name
async function getPokemon(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) {
        console.error("Failed to fetch Pokémon data");
        return;
    }
    const pokemonData = await response.json();
    const pokemonContainer = document.getElementById("pokemon-container");
    const favoriteCountElement = document.getElementById("favourite-count");
    pokemonContainer.innerHTML = ""; // Clear previous Pokémon

    const pokemonBox = createPokemonBox(pokemonData, favoriteCountElement);
    pokemonContainer.appendChild(pokemonBox);
}

// Define the Pokémon container element
class PokemonContainer extends HTMLElement {
    connectedCallback() {
        loadAllPokemon();
    }
}

// Add event listener for "All" button redirection
document.addEventListener('DOMContentLoaded', function() {
    const allButton = document.getElementById('all-button');
    if (allButton) {
        allButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const favoriteCountElement = document.getElementById("favourite-count");
    updateFavoriteCount(favoriteCountElement);
});

// Define custom element
customElements.define('pokemon-container', PokemonContainer);
