const fetchPokemon = () => {
    const pokemonPromises = []
    for (let i = 1; i <= 151; i++) {
        pokemonPromises.push(fetch(getPokemonUrlById(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                accumulator += createPokemon(pokemon)
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisPokemons
            console.log(ul)
        })
}

const getPokemonUrlById = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const getPokemonUrlByName = name => `https://pokeapi.co/api/v2/pokemon/${name}`

const getPokemonIdFormatted = id => {
    if (id < 10) {
        return `#00${id}`
    }
    else if (id < 100) {
        return `#0${id}`
    }
    else {
        return `#${id}`
    }
}

const createPokemon = (pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)
    return `
        <li class="card ${types[0]}">
            <p class="card-id">${getPokemonIdFormatted(pokemon.id)}</p>
            <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
            <h2 class="card-title">${pokemon.name}</h2>
        </li>
        `
}

function removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
}

async function onSearch() {
    const pokedex = document.querySelector(".pokedex");
    removeAllChild(pokedex);
  
    var pokeName = document.getElementById("pokeSearch");
    if (pokeName.value === "") {
      onInit();
    } else {
      const pokemon = await fetch(getPokemonUrlByName(pokeName.value.toLowerCase())).then(response => response.json())
      let li= createPokemon(pokemon);
      console.log(li)
      const ul = document.querySelector('[data-js="pokedex"]')
      ul.innerHTML = li
    }
}

fetchPokemon()