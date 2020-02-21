import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons:IPokemons
  pageSize = 20;

  constructor(
    public pokemonService:PokemonService,
    private router:Router
  ) { }

  ngOnInit() {
    this.pokemonService.getPokemons().then(pokemons =>{
      this.pokemons = pokemons
    })
  }

  pokemonDetail(url:string){
    let arrayUrl = url.split("/")
    this.router.navigate([`/pokemon/${arrayUrl[6]}`])    
  }

  changePage(page:PageEvent){
    let index = (page.pageSize * page.pageIndex)
    this.pokemonService.getPokemonsPaginator(index).then(pokemons =>{
      this.pokemons= pokemons
    })
  }

}
