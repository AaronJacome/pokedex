import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PouchService } from '../../services/pouch.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon: IPokemon

  constructor(
    private activatedRouter: ActivatedRoute,
    public pokemonService: PokemonService,
    private snackBar: MatSnackBar,
    public pouchService: PouchService
  ) { }

  ngOnInit() {
    let id = this.activatedRouter.snapshot.paramMap.get('id')

    this.pokemonService.getPokemon(id).then(pokemon => {
      this.pokemon = pokemon
    })
  }

  addFavorite() {

    this.pouchService.getFavorites().then(docs => {
      let register = docs.rows.find((d:any) => d.doc.name === this.pokemon.name)
      if(register){
        this.snackBar.open("This pokemon already register in favorites",null,{
          duration: 2000,
        });
      }else{
        this.pouchService.addFavorite(this.pokemon).then(success =>{
            this.snackBar.open("add favorites",null,{
              duration: 2000,
            });
          },reject =>{
            this.snackBar.open("error in add favorites",null,{
              duration: 2000,
            });
          })
      }
    })
  }

}
