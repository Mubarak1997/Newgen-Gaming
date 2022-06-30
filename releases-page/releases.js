// Set Constants and Variable for async function and gamedata array
const games = getLatestGames();
let gameData = [];

// Declare async function for fetching latest games
async function getLatestGames()
{
  const apiUrl = "https://api.rawg.io/api/games?key=e2b9a8fc8f4f4371870caca300850cd7&dates=2022-03-01,2022-07-31&platforms=18,1,7";

  try {
    const response = await fetch(
      apiUrl,
      {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

function createCard(gameList)
{
  const container = document.getElementById("container");

  gameList.slice(0, 18).forEach((game, index) => {

    const contentTemp = `<div class="card">
      <div class="card-header">
        <img id="card-image" src=${game.background_image} class="card-image" width="600" />
      </div>
      <div class="card-body">
        <div id="genres${index}">loading...</div>
        <h4 class="title" id="game-title">${game.name}</h4>
        <div class="platforms" id="platforms${index}">Loading...</div>
      </div>
      <div class="card-footer">
        <div class="user">
          <div class="user-info">
            <h5>${game.rating} /5</h5>
            <p id="game_description">
          ${game.released}
        </p>
          </div>
        </div>
      </div>
    </div>`;
    
    container.innerHTML += contentTemp;

    addGenres(game, index);
    addPlatforms(game, index);
  });

  
}

function addGenres(game, i)
{
  const container = document.getElementById(`genres${i}`);
  container.innerHTML = null;

  game.genres.slice(0, 3).forEach((genre) => {
    const content = `<span class="tag tag-red">${genre.name}</span>`;
    container.innerHTML += content;
  });
}

function addPlatforms(game, i)
{
  const container = document.getElementById(`platforms${i}`);
  container.innerHTML = null;

  const array = [];
  let arrayWords = [];

  game.platforms.forEach((platform) => {
    array.push(platform.platform.name);
  });

  arrayWords = array.join(", ");

  const content = `<small>${arrayWords}</small>`;
  container.innerHTML += content;
}


function formatData()
{
  games.then((data) => {
    console.log(data)
    gameData = data.results;
    console.log(gameData);
    createCard(gameData);
  });
}

formatData();
