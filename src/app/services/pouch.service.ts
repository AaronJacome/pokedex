import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class PouchService {
  private db: any;
  private isInstantiated: boolean;

  constructor() {
    if (!this.isInstantiated) {
      this.db = new PouchDB('pokemonIndexDB');
      this.isInstantiated = true;
    }
  }

  addFavorite(pokemon: IPokemon): Promise<any> {
    let pokemonPouch = {
      _id: new Date().toISOString(),
      ...pokemon
    };

    return this.db.put(pokemonPouch);
  }

  getFavorites():Promise<any>{
    return this.db.allDocs({include_docs: true})
  }
}
