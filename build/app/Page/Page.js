import Component from "../Component/Component.js";
import Service from "../Service/Service.js";
import PokeCard from "../PokeCard/PokeCard.js";
import Button from "../Button/Button.js";

class Page extends Component {
  pokemonArray;
  urlPokemon;
  nrPokemon = 50;

  constructor(parentElement, urlPokemon) {
    super(parentElement, "container");
    this.urlPokemon = urlPokemon;

    this.generateHTML();

    let pagePokemons = document.querySelector(".control-container");

    let lessPokemonsButton = new Button(
      pagePokemons,
      "control-container__left",
      this.getLessPokemons
    );

    let morePokemonsButton = new Button(
      pagePokemons,
      "control-container__right",
      this.getMorePokemons
    );
  }

  generateHTML() {
    const html = `
    <header class="header">
        <div>
          <h1>
            <a href="index.html">
              <img
                class="header__image"
                src="img/logo-pokemon.png"
                alt="Logo Pokemon"
                width="100;"
            /></a>
          </h1>
          <nav class="menu">
            <ul class="menu__list">
              <li class="menu__icon"></li>
              <li class="menu__icon"></li>
            </ul>
            <div class="control-container">

            </div>
          </nav>
        </div>
      </header>
      <main>
        <div>
          <button></button>
          <button></button>
        </div>
        <ul class="gallery">
        </ul>
      </main>
       `;

    this.element.innerHTML = html;
    const pokemonContainer = document.querySelector(".gallery");

    (async () => {
      const getPokemon = new Service(this.urlPokemon);
      const showPokemon = await getPokemon.getData(this.urlPokemon);
      this.pokemonArray = showPokemon.results;

      this.pokemonArray.map(
        (onePokemon) =>
          new PokeCard(
            pokemonContainer,
            "pokemon-card",
            onePokemon.name,
            onePokemon.url
          )
      );
    })();
  }

  getMorePokemons() {
    let initialPokemons = this.nrPokemons;
    this.nrPokemons = this.nrPokemons + 50;
    this.urlPokemon = `https://pokeapi.co/api/v2/pokemon?offset=${this.nrPokemons}&limit=${initialPokemons}`;
    this.generateHTML();
  }
}

export default Page;
