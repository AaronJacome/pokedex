const API = "https://pokeapi.co/api/v2/"

export const environment = {
  production: true,
  GET_ALL_POKEMON: API + "pokemon",
  GET_POKEMONS_PAGINATOR:API + "pokemon?offset=#INDEX#&limit=20",
  GET_POKEMON:API+"pokemon/#INDEX#/"
};
