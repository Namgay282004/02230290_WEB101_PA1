// Load unseen Pokémon from local storage and display them
document.addEventListener('DOMContentLoaded', function() {
    const allPokemon = getAllPokemonNames(); // Function to get all Pokémon names
    const seenPokemon = JSON.parse(localStorage.getItem("seenPokemon")) || [];
    const unseenPokemon = allPokemon.filter(pokemonName => !seenPokemon.includes(pokemonName));
    const unseenPokemonContainer = document.getElementById("unseen-pokemon-container");

    unseenPokemon.forEach(pokemonName => {
        // Fetch Pokémon details
        fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(pokemonData => {
                const pokemonBox = createPokemonBox(pokemonData);
                unseenPokemonContainer.appendChild(pokemonBox);
            })
            .catch(error => console.error("Failed to fetch Pokémon details:", error));
    });
});
