let offset = 0;

async function initPokedex() {
    const ul = document.querySelector(".pokemons");
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon`, {
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    });
    const response = await res.json();
    const listPokemon = response.results;

    for (let item of listPokemon) {
        const data = await fetch(item.url, {
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        });
        const dados = await data.json();

        ul.insertAdjacentHTML("beforeend", `
            <li id="${item.name}">
                <a href="./pokemon/pokedex.html?name=${item.name}" class="pokemon-link">
                    ${item.name}
                </a>
                <img src="${dados.sprites.front_default}" alt="${item.name}">
            </li>
        `);
    }
}

initPokedex();

async function nextPage() {
    const ul = document.querySelector(".pokemons");
    ul.innerHTML = "";
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`, {
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    });
    const response = await res.json();
    const listPokemon = response.results;

    for (let item of listPokemon) {
        const data = await fetch(item.url, {
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        });
        const dados = await data.json();

        ul.insertAdjacentHTML("beforeend", `
            <li>
                <a href="/pokemon.html?name=${item.name}" class="pokemon-link">
                    ${item.name}
                </a>
                <img src="${dados.sprites.front_default}" alt="${item.name}">
            </li>
        `);
    }
}

const prevBtn = document.querySelector("#prev");
const btnNext = document.querySelector("#next");

btnNext.addEventListener("click", () => {
    offset += 20;
    prevBtn.removeAttribute("disabled");
    nextPage();
});

prevBtn.addEventListener("click", () => {
    offset -= 20;
    if (offset === 0) {
        prevBtn.setAttribute("disabled", true);
    }
    nextPage();
});

prevBtn.setAttribute("disabled", true);

