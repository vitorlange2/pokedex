document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (!name) {
        document.body.innerHTML = '<h2>Pokémon não especificado!</h2>';
        return;
    }

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error('Pokémon não encontrado');
        const data = await res.json();

      
        const h1 = document.getElementById("pokemon-name");
        if (h1) h1.textContent = data.name.toUpperCase();

      
        const img = document.getElementById("pokemon-img");
        if (img) img.src = data.sprites.front_default;

        
        const typesList = document.getElementById("pokemon-types");
        if (typesList) {
            typesList.innerHTML = "";
            data.types.forEach(typeInfo => {
                const li = document.createElement("li");
                li.textContent = `Tipo: ${typeInfo.type.name}`;
                typesList.appendChild(li);
            });
        }

        
        const statsList = document.getElementById("pokemon-stats");
        if (statsList) {
            statsList.innerHTML = "";
            
            const liPeso = document.createElement("li");
            liPeso.textContent = `Peso: ${data.weight / 10} kg`;
            statsList.appendChild(liPeso);
           
            data.stats.forEach(stat => {
                const li = document.createElement("li");
                li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                statsList.appendChild(li);
            });
        }
    } catch (err) {
        document.body.innerHTML = `<h2>Erro ao carregar Pokémon: ${err.message}</h2>`;
    }
});

