document.addEventListener('DOMContentLoaded', function() {
    loadPokemon();
    setupHeaderItemClick();
    setupFavoritesFilterClick();
    showSection('description-container');
    setupAllButtonRedirection();
});

async function loadPokemon() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');
    if (!pokemonName) {
        document.getElementById('description-container').innerHTML = '<p>No Pokémon selected!</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const pokemon = await response.json();

        updateDescription(pokemon);
        updateBasicStats(pokemon);
        updateMoves(pokemon);
        
        const imageContainer = document.getElementById('image-container');
        imageContainer.querySelector('img').src = pokemon.sprites.front_default;
    } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
        document.getElementById('description-container').innerHTML = '<p>Error loading details. Please try again.</p>';
    }
}

function setupHeaderItemClick() {
    const headerItems = document.querySelectorAll('.header-item');
    headerItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.id.split('-')[0] + '-container';
            showSection(sectionId);
        });
    });
}

function setupFavoritesFilterClick() {
    const favoritesFilter = document.getElementById('favorites-filter');
    favoritesFilter.addEventListener('click', showFavoritePokemon);
}

function setupAllButtonRedirection() {
    const allButton = document.getElementById('all-button');
    if (allButton) {
        allButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

function updateDescription(pokemon) {
    const descriptionContainer = document.getElementById('description-container');
    descriptionContainer.innerHTML = `
                                       <p>Species: ${capitalizeFirstLetter(pokemon.species.name)}</p>
                                       <p>Weight: ${pokemon.weight / 10} kg</p>
                                       <p>Height: ${pokemon.height / 10} m</p>
                                       <p>Abilities: ${pokemon.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ')}</p>
                                       <p>Types: ${pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}</p>`;
}

function updateBasicStats(pokemon) {
    const basicStatsContainer = document.getElementById('basic-stats-container');
    const maxStat = Math.max(...pokemon.stats.map(stat => stat.base_stat));

    let basicStatsHTML = `
                          <div class="basic-stats-container">`;

    for (const stat of pokemon.stats) {
        const statPercentage = (stat.base_stat / maxStat) * 100;
        basicStatsHTML += `
            <div class="basic-stat-item">
                <div class="stat-name">${capitalizeFirstLetter(stat.stat.name)}</div>
                <div class="stat-value">${stat.base_stat}</div>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${statPercentage}%; height: 10px;"></div>
                </div>
            </div>
        `;
    }

    basicStatsHTML += `</div>`;
    basicStatsContainer.innerHTML = basicStatsHTML;
}

function updateMoves(pokemon) {
    const movesContainer = document.getElementById('moves-container');
    movesContainer.innerHTML = `
                                 <div class="move-buttons-container">
                                     ${pokemon.moves.map(move => `
                                         <button class="move-button">${capitalizeFirstLetter(move.move.name)}</button>
                                     `).join('')}
                                 </div>`;

    // Add some CSS to style the move buttons
    const moveButtons = document.querySelectorAll('.move-button');
    moveButtons.forEach(button => {
        button.style.backgroundColor = '#C4DFE6';
        button.style.border = '1px solid #66A5AD';
        button.style.borderRadius = '5px';
        button.style.padding = '5px 10px';
        button.style.margin = '5px';
        button.style.cursor = 'pointer';
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId || section.contains(document.getElementById(sectionId))) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchPokemon() {
    const pokemonName = document.getElementById('pokemon').value;
    if (pokemonName) {
        window.location.href = `pokemon-detail.html?name=${pokemonName}`;
    }
}

function showFavoritePokemon() {
    const favorites = getFavorites();
    const favoritePokemonContainer = document.getElementById("favorite-pokemon-container");
    favoritePokemonContainer.innerHTML = "";
    
    for (const pokemonName of favorites) {
        const pokemonBox = createPokemonBox(pokemonName);
        favoritePokemonContainer.appendChild(pokemonBox);
    }
}

function createPokemonBox(pokemonName) {
    const pokemonBox = document.createElement("div");
    pokemonBox.classList.add("pokemon-box");

    const favoriteIcon = document.createElement("i");
    favoriteIcon.classList.add("fas", "fa-star", "favorite-icon", "active"); // Always active for favorite Pokémon

    const pokemonImage = document.createElement("img");
    // Fetch Pokémon image and other details if needed

    const pokemonNameElement = document.createElement("p");
    pokemonNameElement.textContent = pokemonName;

    pokemonBox.appendChild(favoriteIcon);
    pokemonBox.appendChild(pokemonImage);
    pokemonBox.appendChild(pokemonNameElement);

    return pokemonBox;
}

function getFavorites() {
    // Retrieve favorites from localStorage or any other source
    return ["Pikachu", "Charmander"]; // Dummy favorites for demonstration
}
