// Load and display favorite Pokémon
document.addEventListener("DOMContentLoaded", async function() {
    const favoritePokemonContainer = document.getElementById("favorite-pokemon-container");
    const favoritePokemonNames = JSON.parse(localStorage.getItem("favoritePokemon")) || [];

    if (favoritePokemonNames.length === 0) {
        favoritePokemonContainer.innerHTML = "<p>No favorite Pokémon found.</p>";
        return;
    }

    for (const pokemonName of favoritePokemonNames) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const pokemonData = await response.json();
            const pokemonBox = createPokemonBox(pokemonData);
            favoritePokemonContainer.appendChild(pokemonBox);
        } catch (error) {
            console.error("Failed to fetch Pokémon data", error);
        }
    }
});

// Helper function to create Pokémon boxes (similar to the one in your main JS file)
function createPokemonBox(pokemonData) {
    const pokemonBox = document.createElement("div");
    pokemonBox.classList.add("pokemon-box");

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.alt = pokemonData.name;

    const pokemonName = document.createElement("p");
    pokemonName.textContent = pokemonData.name;

    pokemonBox.appendChild(pokemonImage);
    pokemonBox.appendChild(pokemonName);

    return pokemonBox;
}
