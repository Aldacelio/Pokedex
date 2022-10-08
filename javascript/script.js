const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;

// buscar pokemon
const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data['name'];
        pokemonNumber.innerHTML = data['id'];
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data['id'];

    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'NOT FOUND :(';
        pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) =>{
    
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

prev.addEventListener('click', () =>{
    if(searchPokemon > 1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }else{
        searchPokemon = 649;
        renderPokemon(searchPokemon);
    }
    
});

next.addEventListener('click', () =>{
    if(searchPokemon < 649){
        searchPokemon +=1;
        renderPokemon(searchPokemon);
    }else{
        searchPokemon = 1;
        renderPokemon(searchPokemon);
    }
    
});

renderPokemon(searchPokemon);