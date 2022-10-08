const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

const pokemonHp = document.querySelector('.pokemon_hp');
const pokemonAtaque = document.querySelector('.pokemon_ataque');
const pokemonDefesa = document.querySelector('.pokemon_defesa');
const pokemonAtaqueEspecial = document.querySelector('.pokemon_ataqueEspecial');
const pokemonDefesaEspecial = document.querySelector('.pokemon_defesaEspecial');
const pokemonVelociadade = document.querySelector('.pokemon_velocidade');

const pokemonImage2 = document.querySelector('.pokemon_image2');

const btn = document.getElementById('verMais');
const container = document.querySelector('.fundoStats');

let searchPokemon = 1;

// buscar pokemon
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {

        pokemonImage.style.display = 'block';
        pokemonImage2.style.display = 'block';
        pokemonName.innerHTML = data['name'];
        pokemonNumber.innerHTML = data['id'];
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data['id'];

        pokemonHp.innerHTML = data['stats']['0']['base_stat'];
        pokemonAtaque.innerHTML = data['stats']['1']['base_stat'];
        pokemonDefesa.innerHTML = data['stats']['2']['base_stat'];
        pokemonAtaqueEspecial.innerHTML = data['stats']['3']['base_stat'];
        pokemonDefesaEspecial.innerHTML = data['stats']['4']['base_stat'];
        pokemonVelociadade.innerHTML = data['stats']['5']['base_stat'];
        pokemonImage2.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];


    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'NOT FOUND :(';
        pokemonNumber.innerHTML = '?';
        pokemonHp.innerHTML = '?';
        pokemonAtaque.innerHTML = '?';
        pokemonDefesa.innerHTML = '?';
        pokemonAtaqueEspecial.innerHTML = '?';
        pokemonDefesaEspecial.innerHTML = '?';
        pokemonVelociadade.innerHTML = '?';
        pokemonImage2.style.display = 'none';
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

});

prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } else {
        searchPokemon = 649;
        renderPokemon(searchPokemon);
    }

});

next.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    } else {
        searchPokemon = 1;
        renderPokemon(searchPokemon);
    }

});

btn.addEventListener('click', function () {

    if (container.style.display === 'block') {
        container.style.display = 'none';
        btn.textContent = 'VER STATS DO POKÉMON';
    } else {
        btn.textContent = 'VER MENOS SOBRE O POKÉMON';
        container.style.display = 'block';
    }
});

renderPokemon(searchPokemon);