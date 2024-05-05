// Add a Pokémon to favorites
function addToFavorites(pokemonName) {
    let favorites = getFavorites();
    favorites.push(pokemonName);
    saveFavorites(favorites);
}

// Remove a Pokémon from favorites
function removeFromFavorites(pokemonName) {
    let favorites = getFavorites();
    favorites = favorites.filter(name => name !== pokemonName);
    saveFavorites(favorites);
}

// Retrieve favorites from storage
function getFavorites() {
    return JSON.parse(localStorage.getItem('favoritePokemon')) || [];
}

// Save favorites to storage
function saveFavorites(favorites) {
    localStorage.setItem('favoritePokemon', JSON.stringify(favorites));
}
