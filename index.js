import { createAPI } from "./services/apiRestClient.js"
import { 
  SWAPI_URL,
  SWAPI_ACCETED_RESOURCES,
  POKEAPI_URL,
  POKEAPI_ACCETED_RESOURCES 
} from "./services/settings.js"

// Star Wars
const swapi = createAPI(SWAPI_URL, SWAPI_ACCETED_RESOURCES)

const luke = await swapi.get.people({id: 1})
const c3po = await swapi.get.people({id: 2})
const planet = await swapi.get.planets({id: 1})
const starship = await swapi.get.starships({id: 5})
const film = await swapi.get.films({id: 1})

console.log({luke: luke.name})
console.log({c3po: c3po.name})
console.log({planet: planet.name})
console.log({starship: starship.name})
console.log({film: film.title})

// Pokemon
const pokeapi = createAPI(POKEAPI_URL, POKEAPI_ACCETED_RESOURCES)

const pikachu = await pokeapi.get.pokemon({id: "pikachu"})
const pokemons = await pokeapi.get.pokemon({queryParams: {limit: 3, offset: 0}})

console.log({pikachu: pikachu.name})
console.log({pokemons: pokemons.results})

// Test post option
const khappazPokemon = await pokeapi.post.pokemon({data: "Khappaz"})

console.log({khappazPokemon})