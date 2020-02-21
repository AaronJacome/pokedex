import { Component, OnInit } from '@angular/core';
import { PouchService } from '../../services/pouch.service';
import { PageEvent } from '@angular/material/paginator';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  pokemons:IPokemons[] = []

  constructor(
    public pouchService:PouchService,
    public pokemonService:PokemonService,
    private router:Router
  ) { }

  ngOnInit() {
    this.pouchService.getFavorites().then(resolve =>{
      resolve.rows.forEach(element => {
        this.pokemons.push(element.doc)
      });
    })
  }

  pokemonDetail(id:string){
    this.router.navigate([`/pokemon/${id}`])    
  }

}
