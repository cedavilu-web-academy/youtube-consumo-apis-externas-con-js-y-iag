const container = document.querySelector('.container');
const charactersList = document.getElementById('characters-list');
const pagination = document.querySelector('.pagination');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const currentPageElement = document.getElementById('current-page');

let currentPage = 1;
const resultsPerPage = 10;

document.addEventListener('DOMContentLoaded', loadCharacters);

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadCharacters();
    }
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    loadCharacters();
});

async function loadCharacters() {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
        const data = await response.json();
        displayCharacters(data.results);
        updatePagination(data.info);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayCharacters(characters) {
    charactersList.innerHTML = characters.map(character => `
        <div class="character-card">
            <img src="${character.image}" alt="Foto de ${character.name}">
            <h2>${character.name}</h2>
            <p>Especie: ${character.species}</p>
            <p>Origen: ${character.origin.name}</p>
        </div>
    `).join('');
}

function updatePagination(info) {
    currentPageElement.textContent = info.page;
    prevPageButton.disabled = info.page === 1;
    nextPageButton.disabled = info.page === info.pages;
}
