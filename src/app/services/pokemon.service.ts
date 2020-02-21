import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemons: IPokemons
  private pokemon:IPokemon

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(): Promise<IPokemons> {

    if (this.pokemons) {
      return Promise.resolve(this.pokemons);
    } else {
      return new Promise((resolve) => {
        this.http.get<IPokemons>(environment.GET_ALL_POKEMON).subscribe((pokemons: IPokemons) => {
          this.pokemons = pokemons
          return resolve(pokemons);
        })
      })
    }
  }

  getPokemonsPaginator(index:number): Promise<IPokemons> {
    return new Promise((resolve) => {
      this.http.get<IPokemons>(environment.GET_POKEMONS_PAGINATOR.replace("#INDEX#",index.toString())).subscribe((pokemons: IPokemons) => {
        this.pokemons = pokemons
        return resolve(pokemons);
      })
    })
  }

  getPokemon(id):Promise<IPokemon>{
    return new Promise((resolve) => {
      this.http.get<IPokemon>(environment.GET_POKEMON.replace("#INDEX#",id.toString())).subscribe((pokemon: IPokemon) => {
        return resolve(pokemon);
      })
    })
  }
}
