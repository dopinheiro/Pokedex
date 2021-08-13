const getPokemons = async () =>{
    const pokemons = {}
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'
    for(let pokemon = 1; pokemon<=151; pokemon++) {
       await fetch(`${apiUrl}${pokemon}`).then( response => {
            response.json().then(pokemon => {
                pokemons[pokemon.id] = {
                    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                    image: pokemon.sprites.other['official-artwork'].front_default,
                    type: pokemon.types[0].type.name
                }
            })
        })
    }
    return pokemons
}

const renderPokemons = (pokemonsObj) => {
    let html = ''
    const container = document.querySelector('#container')

    Object.keys(pokemonsObj).forEach( id => {
        const name = pokemonsObj[id].name
        const image = pokemonsObj[id].image
        const type = pokemonsObj[id].type

        console.log(type)
        const newCard = `
            <div class="card ${type}">
            <div class="sprite">
                <img src="${image}" alt="${name}">
            </div>
            <div class="poke-name">
                <span class="pokemon">${name}</span>
            </div>
        </div>
        `
        html += newCard
    })
    container.innerHTML = html
}


getPokemons().then( pokemons => renderPokemons(pokemons))
