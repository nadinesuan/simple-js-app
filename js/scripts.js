let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

   function add(pokemon) {
    pokemonList.push(pokemon);
   }

   function loadList() {
        return fetch(apiUrl).then(function (response) {
        return response.json();
        }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
            name: item.name,
            detailsUrl: item.url
            };
            add(pokemon);
        });
        }).catch(function (e) {
        console.error(e);
        })
    }

   function getAll() {
    return pokemonList;
   }
    
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let createListItem = document.createElement("li");
        createListItem.classList.add("list-group-item");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn-primary");
        button.classList.add("pokemon-button");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        
        createListItem.classList.add('col-xl-3');
        createListItem.classList.add('col-lg-4');
        createListItem.classList.add('col-md-6');

        createListItem.appendChild(button);
        pokemonList.appendChild(createListItem);

        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    };
    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
        showModal(pokemon);
        });
    }
    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        modalTitle.empty();
        modalBody.empty();

        let pokemonName = $("<h1>" + pokemon.name + "</h1>");
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr("src", pokemon.imageUrl);
        let pokemonHeight = $("<p>" + "Height : " + pokemon.height + "</p>");

        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
    }
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        item.imageUrl = details.sprites.font_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
