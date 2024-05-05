// Load seen Pokémon from local storage and display them
document.addEventListener('DOMContentLoaded', function() {
    const seenPokemon = JSON.parse(localStorage.getItem("seenPokemon")) || [];
    const seenPokemonContainer = document.getElementById("seen-pokemon-container");

    seenPokemon.forEach(pokemonName => {
        // Fetch Pokémon details
        fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(pokemonData => {
                const pokemonBox = createPokemonBox(pokemonData);
                seenPokemonContainer.appendChild(pokemonBox);
            })
            .catch(error => console.error("Failed to fetch Pokémon details:", error));
    });
});
