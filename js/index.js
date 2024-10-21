class Game {
    constructor(title, category, platform, status, description, image) {
        this.title = title;
        this.category = category;
        this.platform = platform;
        this.status = status;
        this.description = description;
        this.image = image;
    }

    showDetails() {
        const details = document.getElementById('game-details');
        const title = document.getElementById('game-title');
        const img = document.getElementById('game-img');
        const category = document.getElementById('game-category');
        const platform = document.getElementById('game-platform');
        const status = document.getElementById('game-status');
        const description = document.getElementById('game-description');

        title.textContent = this.title;
        img.src = this.image;
        category.textContent = this.category;
        platform.textContent = this.platform;
        status.textContent = this.status;
        description.textContent = this.description;

        details.style.display = 'flex';
    }
}

function closeDetails() {
    let details = document.getElementById('game-details');
    details.style.display = 'none';
}

const apiKey = '761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712';
const apiHost = 'free-to-play-games-database.p.rapidapi.com';

async function fetchGames() {
    const response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    });
    
    let gamesData = await response.json();
    return gamesData;
}

async function loadGames() {
    const gamesData = await fetchGames();

    gamesData.forEach(gameData => {
        const game = new Game(
            gameData.title, 
            gameData.genre, 
            gameData.platform, 
            'Free',
            gameData.short_description, 
            gameData.thumbnail
        );

        
        displayGameCard(game);
    });
}

function displayGameCard(game) {
    let gameCardsContainer = document.querySelector('.game-cards');
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    

        <img src="${game.image}" alt="${game.title}">
    <div>
  <h2 class="text-white">${game.title}</h2>
   <button class="btn btn-info">Free</button>
</div>

        <p class="text-white">${game.description.substring(0, 50)}...</p>
        <span class="tag text-white">${game.status}</span>
        <span class="platform text-white">${game.platform}</span>
    `;

    card.addEventListener('click', () => {
        game.showDetails();
    });

    gameCardsContainer.appendChild(card);
}

loadGames();

